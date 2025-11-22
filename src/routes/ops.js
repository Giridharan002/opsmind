const express = require('express');
const router = express.Router();
const opsController = require('../controllers/opsController');

// Slash command endpoints
router.get('/status', opsController.getStatus);
router.get('/risks', opsController.getRisks);
router.get('/overload', opsController.getOverload);
router.get('/incidents', opsController.getIncidents);
router.get('/expenses', opsController.getExpenses);
router.get('/sprint-delay', opsController.getSprintDelay);

module.exports = router;
