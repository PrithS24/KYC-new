const mongoose = require('mongoose');
const logger = require('./logger');

async function connectDB(uri) {
  if (!uri) throw new Error('Missing MONGODB_URI');
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(uri, { dbName: 'kyc' });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection failed', { error: err.message });
    logger.warn('MongoDB is required for persistence. Please install and start MongoDB.');
    logger.warn('Windows: Download from https://www.mongodb.com/try/download/community');
    logger.warn(String.raw`Then run: mongod --dbpath "C:\data\db"`);
    throw err; // Still throw the error so the server doesn't start
  }
}
module.exports = { connectDB };
