import Review from '../models/Review.js';
import Package from '../models/Package.js';

// Helper to recalculate package average rating & review count
const updatePackageRatingStats = async (packageId) => {
  const stats = await Review.aggregate([
    { $match: { package: packageId, approved: true } },
    {
      $group: {
        _id: '$package',
        avgRating: { $avg: '$rating' },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Package.findByIdAndUpdate(packageId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].numReviews,
    });
  } else {
    await Package.findByIdAndUpdate(packageId, {
      rating: 5.0,
      reviewCount: 0,
    });
  }
};

// @desc    Get reviews for a package
// @route   GET /api/reviews/package/:packageId
export const getPackageReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      package: req.params.packageId,
      approved: true,
    })
      .populate('user', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit review
// @route   POST /api/reviews
export const submitReview = async (req, res) => {
  try {
    const { packageId, rating, comment } = req.body;

    if (!packageId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide packageId, rating (1-5), and comment',
      });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    const existingReview = await Review.findOne({
      user: req.user._id,
      package: packageId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this travel package',
      });
    }

    const reviewCountTotal = await Review.countDocuments();

    const review = await Review.create({
      user: req.user._id,
      userName: req.user.name,
      package: packageId,
      destination: pkg.destination,
      rating: Number(rating),
      comment: comment.trim(),
      dispatchNumber: `Dispatch #${140 + reviewCountTotal}`,
      travelDateText: 'Verified Traveler',
      approved: true,
    });

    await updatePackageRatingStats(packageId);

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this review' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    await updatePackageRatingStats(review.package);

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    const packageId = review.package;
    await review.deleteOne();
    await updatePackageRatingStats(packageId);

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
