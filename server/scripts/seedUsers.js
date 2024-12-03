const mongoose = require('mongoose');
const User = require('../models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


const users = [
    { name: 'Mohit' },
    { name: 'Akash' },
    { name: 'Mitesh' },
    { name: 'Ritesh' },
    { name: 'Kalpesh' },
    { name: 'Sujit' },
    { name: 'Saurabh' },
    { name: 'Amol' },
    { name: 'Kunal' },
    { name: 'Shubham' },
    { name: 'Pratik' },
    { name: 'Mayur' },
];

async function seedUsers() {
    try {
 
        console.log('Connecting to:', process.env.MONGODB_URI);
        
       
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        
        await User.deleteMany({});
        console.log('Cleared existing users');

        
        const createdUsers = await User.insertMany(users);
        console.log('Users created:', createdUsers);

        console.log('Users seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
}


seedUsers(); 