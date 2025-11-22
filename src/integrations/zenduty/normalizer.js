/**
 * Normalizes Zenduty data into OpsMind format
 */

class ZendutyNormalizer {
  normalizeIncident(payload) {
    try {
      const incident = payload.incident || payload.data || payload;
      
      if (!incident.unique_id && !incident.incident_key) {
        return null;
      }

      const incidentId = incident.unique_id || incident.incident_key;

      return {
        incident_id: `zenduty_${incidentId}`,
        source_app: 'zenduty',
        severity: this.normalizeSeverity(incident.urgency || incident.priority),
        summary: incident.summary || incident.title || 'Untitled Incident',
        logs: {
          description: incident.message || incident.description,
          timeline: incident.timeline || [],
          impacted_services: incident.services || [],
          escalation_policy: incident.escalation_policy,
          assigned_to: incident.assigned_to
        },
        root_cause: incident.root_cause_analysis || null,
        timestamp: incident.creation_date || incident.triggered_at || new Date().toISOString(),
        status: this.normalizeStatus(incident.status),
        metadata: {
          incident_url: incident.incident_url || `https://www.zenduty.com/incidents/${incidentId}`,
          incident_number: incident.incident_number,
          service: incident.service,
          raw_payload: incident
        }
      };
    } catch (error) {
      console.error('Zenduty normalization error:', error);
      return null;
    }
  }

  normalizeSeverity(urgency) {
    if (!urgency) return 'medium';

    const severityMap = {
      '0': 'critical',
      '1': 'high', 
      '2': 'medium',
      '3': 'low',
      'high': 'high',
      'medium': 'medium',
      'low': 'low',
      'critical': 'critical',
      'urgent': 'critical'
    };

    return severityMap[urgency.toString().toLowerCase()] || 'medium';
  }

  normalizeStatus(status) {
    if (!status) return 'open';

    const statusMap = {
      'triggered': 'open',
      'acknowledged': 'open',
      'resolved': 'closed',
      'suppressed': 'closed',
      '1': 'open',
      '2': 'open',
      '3': 'closed'
    };

    return statusMap[status.toString().toLowerCase()] || 'open';
  }
}

module.exports = new ZendutyNormalizer();
