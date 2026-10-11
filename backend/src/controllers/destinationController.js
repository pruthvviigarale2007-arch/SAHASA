import Destination from '../models/Destination.js';

// @desc    Get all destinations with filtering, search & pagination
// @route   GET /api/destinations
export const getDestinations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { name: searchRegex },
        { country: searchRegex },
        { state: searchRegex },
        { description: searchRegex },
      ];
    }

    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }

    if (req.query.featured !== undefined) {
      query.featured = req.query.featured === 'true';
    }

    if (req.query.trending !== undefined) {
      query.trending = req.query.trending === 'true';
    }

    const total = await Destination.countDocuments(query);
    const destinations = await Destination.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      count: destinations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: destinations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get destination by slug
// @route   GET /api/destinations/:slug
export const getDestinationBySlug = async (req, res) => {
  try {
    const destination = await Destination.findOne({
      $or: [{ slug: req.params.slug.toLowerCase() }, { _id: req.params.slug.match(/^[0-9a-fA-F]{24}$/) ? req.params.slug : null }],
    });

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create destination (Admin only)
// @route   POST /api/destinations
export const createDestination = async (req, res) => {
  try {
    const { name, country, description } = req.body;
    if (!name || !country || !description) {
      return res.status(400).json({ success: false, message: 'Please provide name, country and description' });
    }

    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = await Destination.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Destination slug already exists' });
    }

    const destination = await Destination.create({
      ...req.body,
      slug,
    });

    res.status(201).json({ success: true, message: 'Destination created', data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update destination (Admin only)
// @route   PUT /api/destinations/:id
export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.json({ success: true, message: 'Destination updated', data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete destination (Admin only)
// @route   DELETE /api/destinations/:id
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.json({ success: true, message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
