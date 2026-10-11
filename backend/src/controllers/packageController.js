import Package from '../models/Package.js';
import Destination from '../models/Destination.js';

// @desc    Get all travel packages with query filters
// @route   GET /api/packages
export const getPackages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { destinationSlug: searchRegex },
        { category: searchRegex },
      ];
    }

    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }

    if (req.query.destination) {
      const destRegex = new RegExp(req.query.destination, 'i');
      query.$or = [
        { destinationSlug: destRegex },
        { title: destRegex },
      ];
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    if (req.query.featured !== undefined) {
      query.featured = req.query.featured === 'true';
    }

    let sortOption = { createdAt: -1 };
    if (req.query.sort === 'price-asc') sortOption = { price: 1 };
    if (req.query.sort === 'price-desc') sortOption = { price: -1 };
    if (req.query.sort === 'rating') sortOption = { rating: -1 };

    const total = await Package.countDocuments(query);
    const packages = await Package.find(query)
      .populate('destination', 'name slug country state images')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      count: packages.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: packages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single package by slug or ID
// @route   GET /api/packages/:slug
export const getPackageBySlug = async (req, res) => {
  try {
    const isObjectId = req.params.slug.match(/^[0-9a-fA-F]{24}$/);
    const pkg = await Package.findOne({
      $or: [
        { slug: req.params.slug.toLowerCase() },
        { destinationSlug: req.params.slug.toLowerCase() },
        ...(isObjectId ? [{ _id: req.params.slug }] : []),
      ],
    }).populate('destination', 'name slug country state description images');

    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    res.json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create package (Admin only)
// @route   POST /api/packages
export const createPackage = async (req, res) => {
  try {
    const { title, price, destination } = req.body;
    if (!title || !price || !destination) {
      return res.status(400).json({ success: false, message: 'Please provide title, price and destination ID' });
    }

    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const pkg = await Package.create({
      ...req.body,
      slug,
    });

    res.status(201).json({ success: true, message: 'Package created', data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update package (Admin only)
// @route   PUT /api/packages/:id
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    res.json({ success: true, message: 'Package updated', data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete package (Admin only)
// @route   DELETE /api/packages/:id
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    res.json({ success: true, message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
