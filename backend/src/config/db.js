import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    if (!uri) {
      console.log('⚡ MONGODB_URI not set. Starting in-memory MongoDB Server...');
      mongoMemoryServer = await MongoMemoryServer.create();
      uri = mongoMemoryServer.getUri();
      console.log(`✅ In-memory MongoDB Server running at: ${uri}`);
    }

    const conn = await mongoose.connect(uri);
    console.log(`🌱 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ Primary MongoDB connection failed (${error.message}). Falling back to in-memory MongoDB...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const uri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`✅ Fallback In-memory MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (fallbackError) {
      console.error(`❌ MongoDB connection error: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};
