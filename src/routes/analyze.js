const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController');

// Analysis endpoints
router.post('/daily-report', analyzeController.generateDailyReport);
router.get('/task-health', analyzeController.analyzeTaskHealth);
router.get('/incident-patterns', analyzeController.analyzeIncidentPatterns);
router.get('/workload', analyzeController.analyzeWorkload);

module.exports = router;
