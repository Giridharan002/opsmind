const axios = require('axios');

class CliqService {
  constructor() {
    this.webhookUrl = process.env.CLIQ_WEBHOOK_URL;
    this.accessToken = process.env.CLIQ_ACCESS_TOKEN;
  }

  async sendDailyReport(report) {
    try {
      const card = this.buildDailyReportCard(report);
      
      await this.sendMessage({
        text: '🧠 OpsMind Daily Operational Briefing',
        card: card
      });

      console.log('✅ Daily report sent to Cliq');
    } catch (error) {
      console.error('Error sending daily report to Cliq:', error.message);
    }
  }

  async sendMessage(payload) {
    if (!this.webhookUrl) {
      console.log('⚠️ CLIQ_WEBHOOK_URL not configured, skipping message');
      return;
    }

    try {
      const response = await axios.post(this.webhookUrl, payload, {
        headers: {
          'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Cliq API error:', error.response?.data || error.message);
      throw error;
    }
  }

  buildDailyReportCard(report) {
    const { summary, ai_insights, recommendations, health_score } = report;

    return {
      theme: 'modern',
      title: '🧠 OpsMind Daily Briefing',
      thumbnail: 'https://via.placeholder.com/150?text=OpsMind',
      sections: [
        {
          id: 1,
          type: 'table',
          title: '📊 Operations Summary',
          data: {
            headers: ['Metric', 'Count'],
            rows: [
              ['⚠️ Tasks At Risk', summary.tasks_at_risk.toString()],
              ['⛔ Overdue Tasks', summary.overdue_tasks.toString()],
              ['🚧 Blocked Tasks', summary.blocked_tasks.toString()],
              ['🔥 Incidents Today', summary.incidents_today.toString()],
              ['📉 Overloaded Members', summary.overloaded_members.toString()]
            ]
          }
        },
        {
          id: 2,
          type: 'text',
          title: '🤖 AI Analysis',
          text: ai_insights.analysis || 'No analysis available'
        },
        {
          id: 3,
          type: 'text',
          title: '👉 Recommended Actions',
          text: recommendations.length > 0 
            ? recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')
            : 'No specific recommendations at this time'
        },
        {
          id: 4,
          type: 'text',
          title: '💚 Health Score',
          text: `${health_score}/100`
        }
      ],
      buttons: [
        {
          label: 'View Details',
          type: 'open.url',
          url: `${process.env.BACKEND_URL}/ops/status`
        }
      ]
    };
  }

  async sendAlert(type, data) {
    const message = this.formatAlert(type, data);
    await this.sendMessage({ text: message });
  }

  formatAlert(type, data) {
    switch (type) {
      case 'overload':
        return `⚠️ **Overload Alert**: ${data.user} has ${data.hours} hours logged this week with ${data.meetings} meetings!`;
      
      case 'incident_pattern':
        return `🔥 **Incident Pattern Detected**: "${data.pattern}" occurred ${data.count} times in the last 7 days`;
      
      case 'blocked_task':
        return `🚧 **Task Blocked**: "${data.task}" is blocked and needs attention`;
      
      default:
        return `📢 Alert: ${JSON.stringify(data)}`;
    }
  }
}

module.exports = new CliqService();
