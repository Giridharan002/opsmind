const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIEngine {
  async analyzeRisks(atRiskTasks) {
    if (!atRiskTasks || atRiskTasks.length === 0) {
      return { analysis: 'No tasks at risk currently.', recommendations: [] };
    }

    // Limit to top 3 tasks and only essential fields
    const simplified = atRiskTasks.slice(0, 3).map(t => ({
      title: t.title,
      status: t.status,
      priority: t.priority,
      owner: t.owner
    }));

    const prompt = `Analyze these ${simplified.length} at-risk tasks in 100 words max:
${JSON.stringify(simplified)}

Provide: 1) Why at risk 2) Pattern 3) Top action`;

    try {
      const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();
      return this.parseAnalysis(analysis);
    } catch (error) {
      console.error('AI analysis error:', error);
      return { analysis: 'AI analysis unavailable', recommendations: [] };
    }
  }

  async analyzeOverload(overloadedUsers) {
    if (!overloadedUsers || overloadedUsers.length === 0) {
      return { analysis: 'No overloaded team members detected.', recommendations: [] };
    }

    const simplified = overloadedUsers.slice(0, 2).map(u => ({
      user: u.user_id,
      hours: u.total_hours,
      meetings: u.total_meetings
    }));

    const prompt = `Analyze workload in 80 words:
${JSON.stringify(simplified)}
Severity? Impact? Action?`;

    try {
      const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return this.parseAnalysis(response.text());
    } catch (error) {
      console.error('AI analysis error:', error);
      return { analysis: 'AI analysis unavailable', recommendations: [] };
    }
  }

  async analyzeIncidents(incidents, patterns) {
    const simplified = incidents.slice(0, 5).map(i => ({
      title: i.title,
      severity: i.severity
    }));
    
    const prompt = `Analyze in 80 words:\nIncidents: ${JSON.stringify(simplified)}\nPatterns: ${patterns.length} detected\nRoot cause? Prevention?`;

    try {
      const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return this.parseAnalysis(response.text());
    } catch (error) {
      console.error('AI analysis error:', error);
      return { analysis: 'AI analysis unavailable', recommendations: [] };
    }
  }

  async analyzeSprintDelay(data) {
    // Simplify data to reduce AI processing time
    const summary = {
      overdue: data.overdue.length,
      blocked: data.blocked.length,
      incidents: data.incidents.length,
      overloaded: data.overloaded.length,
      sample_tasks: data.overdue.slice(0, 3).map(t => t.title)
    };
    
    const prompt = `Sprint delayed. Data: ${JSON.stringify(summary)}\nIn 150 words: Root cause? Top 3 actions? JSON format: {root_cause:"", recommendations:[]}`;

    try {
      const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let content = response.text();
      
      // Remove markdown code blocks if present
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Try to parse as JSON, fallback to text
      try {
        return JSON.parse(content);
      } catch {
        return this.parseAnalysis(content);
      }
    } catch (error) {
      console.error('AI analysis error:', error);
      return {
        root_cause: 'Unable to analyze sprint delay',
        contributing_factors: [],
        recommendations: []
      };
    }
  }

  async generateDailySummary(data) {
    const prompt = `Generate a concise daily operations summary:

- Tasks at risk: ${data.atRisk.length}
- Overdue tasks: ${data.overdue.length}
- Blocked tasks: ${data.blocked.length}
- Incidents today: ${data.incidents.length}
- Repeating incidents: ${data.patterns.length}
- Overloaded members: ${data.overloaded.length}

Context:
${JSON.stringify({ 
  sample_at_risk: data.atRisk.slice(0, 3),
  sample_blocked: data.blocked.slice(0, 3),
  patterns: data.patterns.slice(0, 2)
}, null, 2)}

Provide:
1. Executive summary (2-3 sentences)
2. Top 3 concerns
3. Top 3 recommended actions

Keep it brief and actionable.`;

    try {
      const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();
      return this.parseAnalysis(analysis);
    } catch (error) {
      console.error('AI summary error:', error);
      return {
        analysis: 'Daily summary unavailable',
        recommendations: []
      };
    }
  }

  parseAnalysis(text) {
    // Extract recommendations from text
    const recommendations = [];
    const lines = text.split('\n');
    
    lines.forEach(line => {
      if (line.match(/^\d+\./)) {
        recommendations.push(line.replace(/^\d+\.\s*/, '').trim());
      }
    });

    return {
      analysis: text,
      recommendations: recommendations.slice(0, 5)
    };
  }
}

module.exports = new AIEngine();
