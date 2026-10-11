import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  day: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    destinationSlug: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    nights: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    priceUSD: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: [{
      type: String,
    }],
    itinerary: [itinerarySchema],
    inclusions: [{
      type: String,
    }],
    exclusions: [{
      type: String,
    }],
    category: {
      type: String,
      default: 'Slow Living',
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Package', packageSchema);
