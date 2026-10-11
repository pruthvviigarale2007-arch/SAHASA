import Destination from '../models/Destination.js';
import Package from '../models/Package.js';
import Hotspot from '../models/Hotspot.js';

// @desc    Unified search across Destinations, Packages, and Hotspots
// @route   GET /api/search?q=
export const searchUnified = async (req, res) => {
  try {
    const q = req.query.q ? req.query.q.trim() : '';

    if (!q) {
      return res.json({
        success: true,
        destinations: [],
        packages: [],
        hotspots: [],
      });
    }

    const regex = new RegExp(q, 'i');

    const [destinations, packages, hotspots] = await Promise.all([
      Destination.find({
        $or: [
          { name: regex },
          { country: regex },
          { state: regex },
          { category: regex },
          { description: regex },
        ],
      }).limit(5),

      Package.find({
        $or: [
          { title: regex },
          { description: regex },
          { category: regex },
          { destinationSlug: regex },
        ],
      }).populate('destination', 'name slug images').limit(5),

      Hotspot.find({
        $or: [
          { name: regex },
          { location: regex },
          { description: regex },
          { category: regex },
        ],
      }).limit(5),
    ]);

    res.json({
      success: true,
      query: q,
      destinations,
      packages,
      hotspots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
