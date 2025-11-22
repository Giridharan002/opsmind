const express = require('express');
const router = express.Router();
const mondayHandler = require('../integrations/monday/webhookHandler');
const zendutyHandler = require('../integrations/zenduty/webhookHandler');

// Monday.com webhook
router.post('/monday', async (req, res) => {
  try {
    console.log('📥 Received Monday.com webhook');
    await mondayHandler.process(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Monday webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Zenduty webhook
router.post('/zenduty', async (req, res) => {
  try {
    console.log('📥 Received Zenduty webhook');
    await zendutyHandler.process(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Zenduty webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generic webhook handler (for testing)
router.post('/test', (req, res) => {
  console.log('📥 Test webhook received:', JSON.stringify(req.body, null, 2));
  res.json({ message: 'Webhook received', data: req.body });
});

module.exports = router;
