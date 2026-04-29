// backend/src/api/routes/questionnaires.js
const { Router } = require('express');
const { saveGad7Response } = require('../controllers/questionnairesController');

const router = Router();

router.post('/gad7/responses', saveGad7Response);

module.exports = router;
