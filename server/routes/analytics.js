const express = require('express');
const router = express.Router();
const Kudo = require('../models/Kudo');


router.get('/', async (req, res) => {
  try {
    
    const kudos = await Kudo.find();


    const kudosGiven = kudos.reduce((acc, kudo) => {
      acc[kudo.badge] = (acc[kudo.badge] || 0) + 1;
      return acc;
    }, {});

    
    const recipientCounts = kudos.reduce((acc, kudo) => {
      acc[kudo.recipient] = (acc[kudo.recipient] || 0) + 1;
      return acc;
    }, {});

    const leaderboard = Object.entries(recipientCounts)
      .map(([name, kudosReceived]) => ({ name, kudosReceived }))
      .sort((a, b) => b.kudosReceived - a.kudosReceived);

    
    const mostLikedPost = await Kudo.findOne()
      .sort({ likes: -1 });

    const mostLikedPostText = mostLikedPost 
      ? `${mostLikedPost.sender} gave "${mostLikedPost.badge}" Badge to ${mostLikedPost.recipient} – "${mostLikedPost.message}"`
      : null;

    
    res.json({
      kudosGiven,
      leaderboard,
      mostLikedPost: mostLikedPostText
    });

  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
});

module.exports = router; 