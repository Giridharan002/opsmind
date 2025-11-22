const express = require('express');
const router = express.Router();

// Cliq webhook endpoint for receiving events from Cliq
router.post('/webhook', async (req, res) => {
  try {
    const event = req.body;
    console.log('📥 Received Cliq webhook:', event);

    // Handle different Cliq events
    const eventType = event.type;
    
    switch (eventType) {
      case 'bot_install':
        await handleBotInstall(event);
        break;
      
      case 'bot_uninstall':
        await handleBotUninstall(event);
        break;
      
      case 'message':
        await handleMessage(event);
        break;
      
      default:
        console.log('Unhandled Cliq event:', eventType);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Cliq webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

async function handleBotInstall(event) {
  console.log('🎉 OpsMind bot installed by:', event.user);
  // TODO: Send welcome message
  // TODO: Store team configuration
}

async function handleBotUninstall(event) {
  console.log('👋 OpsMind bot uninstalled by:', event.user);
  // TODO: Cleanup team data if needed
}

async function handleMessage(event) {
  console.log('💬 Message received:', event.message);
  // TODO: Handle direct messages to bot
}

module.exports = router;
