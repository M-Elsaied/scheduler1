const mongoose = require('mongoose');
const roleSeeder = require('../utils/roleSeeder');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Call the role seeder function
    await roleSeeder();
    console.log("Database connected successfully");


  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;

