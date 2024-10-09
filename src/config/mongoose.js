import mongoose from 'mongoose';


// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// Print mongoose logs in development environment
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to MongoDB
 *
 * @returns {object} Mongoose connection
 * @public
 */
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch((error) => console.error(`Error connecting to MongoDB: ${error}`));

  return mongoose.connection;
};
