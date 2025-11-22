# Zenduty Integration Guide

OpsMind integrates with **Zenduty** for incident management and on-call alerting.

## What is Zenduty?

Zenduty is an incident alerting and on-call management platform that helps teams:
- Detect and respond to incidents faster
- Manage on-call schedules and escalations
- Track incident metrics and patterns
- Integrate with monitoring tools

## Why Zenduty for OpsMind?

- ✅ **Comprehensive API**: Full webhook support
- ✅ **Free Tier**: Generous free plan for small teams
- ✅ **Incident Management**: Better than basic monitoring tools
- ✅ **Integration Hub**: Connects with 100+ monitoring tools

## Setup Instructions

### Step 1: Create Zenduty Account
1. Visit: https://www.zenduty.com/
2. Sign up for free account
3. Create your organization/team

### Step 2: Get API Key
1. Go to Settings → API Keys
2. Click "Create API Key"
3. Give it a name: "OpsMind Integration"
4. Copy the API key

### Step 3: Configure Webhook
1. In Zenduty: Services → Your Service → Integrations
2. Add "Custom Webhook" integration
3. Set webhook URL: `https://your-opsmind-backend.com/webhook/zenduty`
4. Copy the webhook secret

### Step 4: Add to OpsMind
Edit your `.env` file:

```bash
ZENDUTY_API_KEY=your_api_key_here
ZENDUTY_WEBHOOK_SECRET=your_webhook_secret
```

### Step 5: Test Integration
Create a test incident in Zenduty and verify it appears in OpsMind:

```bash
curl http://localhost:3000/ops/incidents
```

## Webhook Events

OpsMind listens for these Zenduty events:

| Event | Description | OpsMind Action |
|-------|-------------|----------------|
| `incident.triggered` | New incident created | Store incident, analyze pattern |
| `incident.acknowledged` | Incident acknowledged by team | Update status |
| `incident.resolved` | Incident resolved | Mark closed, extract learnings |
| `incident.closed` | Incident closed | Archive incident |

## Data Mapping

### Zenduty → OpsMind

| Zenduty Field | OpsMind Field | Notes |
|---------------|---------------|-------|
| `unique_id` | `incident_id` | Prefixed with "zenduty_" |
| `summary` | `summary` | Incident title |
| `urgency` (0-3) | `severity` | Mapped: 0=critical, 1=high, 2=medium, 3=low |
| `status` | `status` | Mapped: triggered/ack=open, resolved=closed |
| `creation_date` | `timestamp` | ISO timestamp |
| `service` | `metadata.service` | Affected service |

## Example Webhook Payload

```json
{
  "event_type": "incident.triggered",
  "incident": {
    "unique_id": "INC-12345",
    "incident_number": 42,
    "summary": "API Gateway timeout - 503 errors",
    "message": "Users experiencing 503 errors on payment endpoint",
    "urgency": 0,
    "status": "triggered",
    "creation_date": "2025-11-22T10:30:00Z",
    "service": {
      "name": "Payment API",
      "id": "srv_123"
    },
    "assigned_to": {
      "username": "john@company.com"
    },
    "escalation_policy": "Engineering Team"
  }
}
```

## OpsMind Features with Zenduty

### 1. Incident Pattern Detection
OpsMind automatically detects:
- Repeating incidents (same error multiple times)
- Service degradation patterns
- Time-based patterns (incidents during specific hours)

Example: "API Gateway timeout occurred 3 times in last 24 hours"

### 2. Root Cause Analysis
AI analyzes:
- Incident descriptions
- Service dependencies
- Recent changes
- Historical patterns

### 3. Proactive Alerts
OpsMind alerts when:
- Same incident repeats > 2 times
- High severity incidents spike
- Specific services have multiple issues

### 4. Recommendations
AI suggests:
- Prevention strategies
- Service improvements
- On-call optimization

## Testing the Integration

### Manual Test
1. Create test incident in Zenduty
2. Check OpsMind logs:
```bash
npm run dev
# Look for: "📥 Received Zenduty webhook"
```

3. Verify in database:
```sql
SELECT * FROM incidents WHERE source_app = 'zenduty' ORDER BY timestamp DESC LIMIT 5;
```

### API Test
```bash
# Check recent incidents
curl http://localhost:3000/ops/incidents

# Check incident patterns
curl http://localhost:3000/analyze/incident-patterns
```

## Zenduty Free Tier Limits

| Feature | Free Tier | Notes |
|---------|-----------|-------|
| Team Members | Up to 5 | Perfect for startups |
| Incidents/Month | Unlimited | ✅ |
| Integrations | Unlimited | ✅ |
| API Access | ✅ Yes | Full access |
| Webhooks | ✅ Yes | Real-time |
| Escalation Policies | 1 | Upgrade for more |

## Advanced Configuration

### Custom Severity Mapping
Edit `src/integrations/zenduty/normalizer.js`:

```javascript
normalizeSeverity(urgency) {
  const severityMap = {
    '0': 'critical',  // P0
    '1': 'high',      // P1
    '2': 'medium',    // P2
    '3': 'low'        // P3
  };
  return severityMap[urgency.toString()] || 'medium';
}
```

### Filter Incidents
Only process specific services:

```javascript
async handleIncidentUpdate(payload) {
  const incident = payload.incident;
  
  // Only process production incidents
  if (incident.service.name.includes('prod-')) {
    await normalizer.normalizeIncident(payload);
  }
}
```

## Troubleshooting

### Webhooks not received
1. Check webhook URL is publicly accessible
2. Verify webhook secret matches
3. Check Zenduty webhook logs
4. Test with ngrok for local development:
   ```bash
   ngrok http 3000
   # Use ngrok URL in Zenduty webhook config
   ```

### Incidents not appearing
1. Check OpsMind logs for errors
2. Verify database connection
3. Test normalizer with sample payload
4. Check incident status filter

### Severity mapping issues
1. Review Zenduty urgency values (0-3)
2. Check normalizer logic
3. Add logging to normalizer

## Production Checklist

- [ ] API key stored securely
- [ ] Webhook secret validated
- [ ] SSL/TLS enabled for webhook endpoint
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] Webhook retries configured in Zenduty
- [ ] Alert notifications tested

## Alternative Integrations

If you prefer other incident management tools:
- **PagerDuty**: Similar setup, change normalizer
- **Opsgenie**: Adjust webhook structure
- **VictorOps/Splunk On-Call**: Different event format
- **Custom**: OpsMind structure is flexible

## Support

- Zenduty Docs: https://docs.zenduty.com/
- API Reference: https://apidocs.zenduty.com/
- Webhook Guide: https://docs.zenduty.com/docs/webhooks
- Support: support@zenduty.com

🎉 Your incident management is now supercharged with AI!
