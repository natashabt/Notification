const express = require('express');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/notificationRoutes');
const config = require('./config');

const app = express();
app.use(express.json());
app.use('/api', notificationRoutes);

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));