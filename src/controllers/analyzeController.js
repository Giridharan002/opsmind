const Task = require('../models/Task');
const Incident = require('../models/Incident');
const TimeLog = require('../models/TimeLog');
const aiEngine = require('../ai/engine');
const cliqService = require('../services/cliqService');

class AnalyzeController {
  // POST /analyze/daily-report
  async generateDailyReport(req, res) {
    try {
      console.log('🔄 Generating daily operations report...');

      const [tasks, incidents, timelogs] = await Promise.all([
        Task.findAll(),
        Incident.findRecent(24),
        TimeLog.findOverloaded()
      ]);

      const atRisk = await Task.findAtRisk();
      const overdue = tasks.filter(t => new Date(t.due_date) < new Date() && t.status !== 'done');
      const blocked = tasks.filter(t => t.status === 'blocked');
      const patterns = await Incident.findPatterns();

      // Generate AI summary
      const aiSummary = await aiEngine.generateDailySummary({
        atRisk,
        overdue,
        blocked,
        incidents,
        patterns,
        overloaded: timelogs
      });

      const report = {
        date: new Date().toISOString().split('T')[0],
        summary: {
          tasks_at_risk: atRisk.length,
          overdue_tasks: overdue.length,
          blocked_tasks: blocked.length,
          incidents_today: incidents.length,
          repeating_incidents: patterns.length,
          overloaded_members: timelogs.length
        },
        ai_insights: aiSummary,
        recommendations: aiSummary.recommendations || [],
        health_score: this.calculateHealthScore(tasks, incidents, timelogs)
      };

      // Send to Cliq
      await cliqService.sendDailyReport(report);

      res.json({
        success: true,
        report,
        message: 'Daily report generated and sent to Cliq'
      });
    } catch (error) {
      console.error('Error generating daily report:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // GET /analyze/task-health
  async analyzeTaskHealth(req, res) {
    try {
      const tasks = await Task.findAll();
      const atRisk = await Task.findAtRisk();
      const overdue = await Task.findOverdue();

      const analysis = {
        total: tasks.length,
        at_risk: atRisk.length,
        overdue: overdue.length,
        on_track: tasks.length - atRisk.length - overdue.length,
        health_percentage: ((tasks.length - overdue.length) / tasks.length * 100).toFixed(1)
      };

      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /analyze/incident-patterns
  async analyzeIncidentPatterns(req, res) {
    try {
      const patterns = await Incident.findPatterns();
      const analysis = await aiEngine.analyzeIncidentPatterns(patterns);

      res.json({
        patterns_found: patterns.length,
        patterns,
        ai_analysis: analysis
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /analyze/workload
  async analyzeWorkload(req, res) {
    try {
      const overloaded = await TimeLog.findOverloaded();
      const analysis = await aiEngine.analyzeWorkload(overloaded);

      res.json({
        overloaded_count: overloaded.length,
        users: overloaded,
        ai_analysis: analysis
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  calculateHealthScore(tasks, incidents, overloaded) {
    let score = 100;
    const overdue = tasks.filter(t => new Date(t.due_date) < new Date());
    score -= overdue.length * 5;
    score -= incidents.length * 3;
    score -= overloaded.length * 10;
    return Math.max(0, Math.min(100, score));
  }
}

module.exports = new AnalyzeController();
