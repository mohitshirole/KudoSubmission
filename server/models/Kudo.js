const mongoose = require('mongoose');

const kudoSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Kudo', kudoSchema); 