const express = require('express');
const cors = require('cors');
const authRoutes = require('./api/routes/auth');
const questionnaireRoutes = require('./api/routes/questionnaires');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/questionnaires', questionnaireRoutes); // <- ESTA LÍNEA ES CLAVE

module.exports = app;
