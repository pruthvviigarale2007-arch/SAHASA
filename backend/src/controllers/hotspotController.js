import Hotspot from '../models/Hotspot.js';

// @desc    Get all hotspots
// @route   GET /api/hotspots
export const getHotspots = async (req, res) => {
  try {
    const query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.featured !== undefined) {
      query.featured = req.query.featured === 'true';
    }

    const hotspots = await Hotspot.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: hotspots.length,
      data: hotspots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get hotspot by ID
// @route   GET /api/hotspots/:id
export const getHotspotById = async (req, res) => {
  try {
    const hotspot = await Hotspot.findById(req.params.id);
    if (!hotspot) {
      return res.status(404).json({ success: false, message: 'Hotspot not found' });
    }

    res.json({ success: true, data: hotspot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create hotspot (Admin)
// @route   POST /api/hotspots
export const createHotspot = async (req, res) => {
  try {
    const hotspot = await Hotspot.create(req.body);
    res.status(201).json({ success: true, message: 'Hotspot created', data: hotspot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update hotspot (Admin)
// @route   PUT /api/hotspots/:id
export const updateHotspot = async (req, res) => {
  try {
    const hotspot = await Hotspot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hotspot) {
      return res.status(404).json({ success: false, message: 'Hotspot not found' });
    }
    res.json({ success: true, message: 'Hotspot updated', data: hotspot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete hotspot (Admin)
// @route   DELETE /api/hotspots/:id
export const deleteHotspot = async (req, res) => {
  try {
    const hotspot = await Hotspot.findByIdAndDelete(req.params.id);
    if (!hotspot) {
      return res.status(404).json({ success: false, message: 'Hotspot not found' });
    }
    res.json({ success: true, message: 'Hotspot deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
