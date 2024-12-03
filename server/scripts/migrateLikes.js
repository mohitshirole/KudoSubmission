const mongoose = require('mongoose');
const Kudo = require('../models/Kudo');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function migrateLikes() {
  try {
   
    console.log('Attempting to connect to:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const kudos = await Kudo.find();
    console.log(`Found ${kudos.length} kudos to migrate`);
    
    for (const kudo of kudos) {
      if (!kudo.likedBy) {
        kudo.likedBy = [];
        await kudo.save();
        console.log(`Migrated kudo ${kudo._id}`);
      }
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Make sure MONGODB_URI exists
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI not found in environment variables');
  process.exit(1);
}

migrateLikes(); 