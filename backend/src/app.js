const express = require('express');
const cors = require('cors');
const authRoutes = require('./api/routes/auth');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);

module.exports = app;
