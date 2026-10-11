import Booking from '../models/Booking.js';
import Package from '../models/Package.js';

// @desc    Create new booking (SERVER calculates total price)
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { packageId, travelDate, numberOfTravelers, adults, children, specialRequests, contactDetails } = req.body;

    if (!packageId || !travelDate || !numberOfTravelers) {
      return res.status(400).json({
        success: false,
        message: 'Please provide packageId, travelDate, and numberOfTravelers',
      });
    }

    const pkg = await Package.findById(packageId).populate('destination');
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Travel package not found' });
    }

    const travelersCount = Number(numberOfTravelers);
    if (isNaN(travelersCount) || travelersCount < 1) {
      return res.status(400).json({ success: false, message: 'Invalid number of travelers' });
    }

    // SERVER PRICE CALCULATION — NEVER TRUST FRONTEND PRICE
    const serverCalculatedTotal = pkg.price * travelersCount;

    const userContact = {
      name: (contactDetails && contactDetails.name) || req.user.name,
      email: (contactDetails && contactDetails.email) || req.user.email,
      phone: (contactDetails && contactDetails.phone) || req.user.phone || '',
    };

    const booking = await Booking.create({
      user: req.user._id,
      package: pkg._id,
      destination: pkg.destination ? pkg.destination._id : null,
      travelDate: new Date(travelDate),
      numberOfTravelers: travelersCount,
      adults: Number(adults) || travelersCount,
      children: Number(children) || 0,
      totalAmount: serverCalculatedTotal,
      currency: 'INR',
      status: 'pending',
      specialRequests: specialRequests || '',
      contactDetails: userContact,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('package', 'title slug price duration images')
      .populate('destination', 'name country');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('package', 'title slug price duration images category')
      .populate('destination', 'name country')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('package')
      .populate('destination')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
