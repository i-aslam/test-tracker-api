const mongoose = require('mongoose');

// simple async function to connect to mongodb
const connectDB = async () => {

  try {
    // connect to mongodb using uri from environment variable
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

  } catch (err) {
    console.error(err);

    // exit process with failure code
    process.exit(1);
  }

};

module.exports = connectDB;
