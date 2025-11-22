const Task = require('../models/Task');
const Incident = require('../models/Incident');
const TimeLog = require('../models/TimeLog');
const aiEngine = require('../ai/engine');
const { getCache, setCache } = require('../config/redis');

class OpsController {
  // GET /ops/status
  async getStatus(req, res) {
    try {
      const cacheKey = 'ops:status';
      const cached = await getCache(cacheKey);
      
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const [tasks, incidents, overloaded] = await Promise.all([
        Task.findAll(),
        Incident.findRecent(24),
        TimeLog.findOverloaded()
      ]);

      const atRisk = await Task.findAtRisk();
      const overdue = tasks.filter(t => new Date(t.due_date) < new Date() && t.status !== 'done');

      const status = {
        summary: {
          total_tasks: tasks.length,
          at_risk: atRisk.length,
          overdue: overdue.length,
          incidents_today: incidents.length,
          overloaded_members: overloaded.length
        },
        health_score: calculateHealthScore(tasks, incidents, overloaded),
        timestamp: new Date().toISOString()
      };

      await setCache(cacheKey, status, 180);
      res.json(status);
    } catch (error) {
      console.error('Error in getStatus:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // GET /ops/risks
  async getRisks(req, res) {
    try {
      const atRisk = await Task.findAtRisk();
      const analysis = await aiEngine.analyzeRisks(atRisk);

      res.json({
        count: atRisk.length,
        tasks: atRisk,
        ai_analysis: analysis,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in getRisks:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // GET /ops/overload
  async getOverload(req, res) {
    try {
      const overloaded = await TimeLog.findOverloaded();
      // Temporarily disable AI analysis for faster response in Cliq
      // const analysis = await aiEngine.analyzeOverload(overloaded);

      res.json({
        count: overloaded.length,
        users: overloaded,
        // ai_analysis: analysis,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in getOverload:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // GET /ops/incidents
  async getIncidents(req, res) {
    try {
      const hours = req.query.hours || 24;
      const incidents = await Incident.findRecent(hours);
      const patterns = await Incident.findPatterns();
      const analysis = await aiEngine.analyzeIncidents(incidents, patterns);

      res.json({
        count: incidents.length,
        incidents: incidents,
        patterns: patterns,
        ai_analysis: analysis,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in getIncidents:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // GET /ops/expenses
  async getExpenses(req, res) {
    try {
      // TODO: Implement expense analysis
      res.json({
        message: 'Expense analysis coming soon',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /ops/sprint-delay (KILLER FEATURE)
  async getSprintDelay(req, res) {
    try {
      const [tasks, incidents, timelogs] = await Promise.all([
        Task.findAll(),
        Incident.findRecent(168), // 7 days
        TimeLog.findOverloaded()
      ]);

      const overdue = tasks.filter(t => new Date(t.due_date) < new Date() && t.status !== 'done');
      const blocked = tasks.filter(t => t.status === 'blocked');

      // AI root cause analysis
      const rootCause = await aiEngine.analyzeSprintDelay({
        overdue,
        blocked,
        incidents,
        overloaded: timelogs
      });

      res.json({
        sprint_status: 'delayed',
        overdue_count: overdue.length,
        blocked_count: blocked.length,
        incident_impact: incidents.length,
        overloaded_members: timelogs.length,
        root_cause_analysis: rootCause,
        recommendations: rootCause.recommendations,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in getSprintDelay:', error);
      res.status(500).json({ error: error.message });
    }
  }

}

function calculateHealthScore(tasks, incidents, overloaded) {
  let score = 100;
  
  const overdue = tasks.filter(t => new Date(t.due_date) < new Date());
  score -= overdue.length * 5;
  
  score -= incidents.length * 3;
  score -= overloaded.length * 10;
  
  return Math.max(0, Math.min(100, score));
}

module.exports = new OpsController();
