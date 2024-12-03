const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('name _id');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/check', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ 
        exists: false, 
        message: 'Name is required' 
      });
    }

    const user = await User.findOne({ name });
    
    if (!user) {
      return res.status(404).json({ 
        exists: false, 
        message: 'User not found.' 
      });
    }

    res.json({ 
      exists: true, 
      user: { 
        _id: user._id, 
        name: user.name 
      } 
    });

  } catch (err) {
    console.error('User check error:', err);
    res.status(500).json({ 
      exists: false, 
      message: 'Error checking user' 
    });
  }
});

module.exports = router;