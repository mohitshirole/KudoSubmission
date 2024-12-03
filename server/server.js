const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/users');
const kudoRoutes = require('./routes/kudos');
const analyticsRoutes = require('./routes/analytics');
const kudosRoutes = require('./routes/kudos');


app.use('/api/users', userRoutes);
app.use('/api/kudos', kudoRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/kudos', kudosRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 