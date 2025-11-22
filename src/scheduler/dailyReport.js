const cron = require('node-cron');
const axios = require('axios');

class DailyReportScheduler {
  start() {
    // Run daily at 9:00 AM (configurable via env)
    const cronTime = this.getCronTime();
    
    console.log(`📅 Daily report scheduler started (${cronTime})`);

    cron.schedule(cronTime, async () => {
      console.log('⏰ Triggering daily report generation...');
      
      try {
        await this.triggerDailyReport();
        console.log('✅ Daily report completed');
      } catch (error) {
        console.error('❌ Daily report failed:', error.message);
      }
    });
  }

  async triggerDailyReport() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
    
    const response = await axios.post(`${backendUrl}/analyze/daily-report`);
    return response.data;
  }

  getCronTime() {
    // Default: 9:00 AM daily
    // Format: minute hour * * *
    const time = process.env.DAILY_REPORT_TIME || '09:00';
    const [hour, minute] = time.split(':');
    return `${minute} ${hour} * * *`;
  }

  // For testing - trigger immediately
  async triggerNow() {
    console.log('🧪 Manually triggering daily report...');
    return await this.triggerDailyReport();
  }
}

module.exports = new DailyReportScheduler();
