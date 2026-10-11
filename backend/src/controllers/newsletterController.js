import Newsletter from '../models/Newsletter.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Invalid email address format' });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existing = await Newsletter.findOne({ email: cleanEmail });
    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed = true;
        await existing.save();
        return res.json({
          success: true,
          message: 'Welcome back! Your newsletter subscription has been reactivated.',
        });
      }
      return res.json({
        success: true,
        message: 'You are already subscribed to Dispatches from the Road.',
      });
    }

    await Newsletter.create({
      email: cleanEmail,
      subscribed: true,
    });

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully! You will receive Dispatches from the Road.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
