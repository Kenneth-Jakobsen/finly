const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
};

mongoose.connect(MONGODB_URI, {
  dbName: 'finly-db',
  bufferCommands: false,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
 