import mongoose from 'mongoose';

const hotspotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotspot name is required'],
      trim: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
    destinationName: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Sensory Moment',
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    featured: {
      type: Boolean,
      default: true,
    },
    bestTime: {
      type: String,
      default: 'Year-round',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Hotspot', hotspotSchema);
