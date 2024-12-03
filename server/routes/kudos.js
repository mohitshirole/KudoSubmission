const express = require('express');
const router = express.Router();
const Kudo = require('../models/Kudo');


router.get('/', async (req, res) => {
  try {
    const kudos = await Kudo.find().sort({ createdAt: -1 });
    res.json(kudos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/user/:username', async (req, res) => {
  console.log('Received request for username:', req.params.username);
  try {
    const kudos = await Kudo.find({ 
      recipient: req.params.username 
    })
    .sort({ createdAt: -1 });

    console.log('Found kudos:', kudos);
    res.json(kudos);
  } catch (err) {
    console.error('Error fetching user kudos:', err);
    res.status(500).json({ message: 'Error fetching user kudos' });
  }
});


router.post('/', async (req, res) => {
  const kudo = new Kudo({
    sender: req.body.sender,
    recipient: req.body.recipient,
    message: req.body.message,
    badge: req.body.badge
  });

  try {
    const newKudo = await kudo.save();
    res.status(201).json(newKudo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/:id/like', async (req, res) => {
  try {
    const { userName } = req.body;
    
    if (!userName) {
      return res.status(400).json({ message: 'userName is required' });
    }

    const kudo = await Kudo.findById(req.params.id);
    
    if (!kudo) {
      return res.status(404).json({ message: 'Kudo not found' });
    }

    
    if (!kudo.likedBy) {
      kudo.likedBy = [];
    }

    
    if (kudo.likedBy.includes(userName)) {
      return res.status(400).json({ message: 'Already liked by this user' });
    }

    
    kudo.likedBy.push(userName);
    kudo.likes = kudo.likedBy.length;

    const updatedKudo = await kudo.save();
    res.json(updatedKudo);

  } catch (err) {
    console.error('Like error:', err);
    res.status(500).json({ message: 'Error processing like' });
  }
});

module.exports = router;