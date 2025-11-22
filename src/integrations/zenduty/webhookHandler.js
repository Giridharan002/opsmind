const Incident = require('../../models/Incident');
const normalizer = require('./normalizer');

class ZendutyWebhookHandler {
  async process(payload) {
    try {
      console.log('Processing Zenduty webhook:', payload.event_type);

      // Zenduty webhook structure
      const eventType = payload.event_type;
      
      switch (eventType) {
        case 'incident.triggered':
        case 'incident.acknowledged':
        case 'incident.resolved':
          await this.handleIncidentUpdate(payload);
          break;
        
        case 'incident.closed':
          await this.handleIncidentClosed(payload);
          break;
        
        default:
          console.log('Unhandled Zenduty event:', eventType);
      }

      return { success: true };
    } catch (error) {
      console.error('Zenduty webhook processing error:', error);
      throw error;
    }
  }

  async handleIncidentUpdate(payload) {
    const normalizedIncident = normalizer.normalizeIncident(payload);
    
    if (!normalizedIncident) {
      console.log('Could not normalize Zenduty incident');
      return;
    }

    await Incident.create(normalizedIncident);
    console.log(`✅ Incident ${normalizedIncident.incident_id} synced from Zenduty`);
  }

  async handleIncidentClosed(payload) {
    const normalizedIncident = normalizer.normalizeIncident(payload);
    normalizedIncident.status = 'closed';
    
    await Incident.create(normalizedIncident);
    console.log(`✅ Incident ${normalizedIncident.incident_id} closed`);
  }
}

module.exports = new ZendutyWebhookHandler();
