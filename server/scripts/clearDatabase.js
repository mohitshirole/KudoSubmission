const mongoose = require('mongoose');
const User = require('../models/User');
const Kudo = require('../models/Kudo');
require('dotenv').config({ path: '../.env' });;

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    
    await User.deleteMany({});
    await Kudo.deleteMany({});

    console.log('Database cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to clear database:', error);
    process.exit(1);
  }
}

clearDatabase(); 