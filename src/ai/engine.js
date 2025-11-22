const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIEngine {
  async analyzeRisks(atRiskTasks) {
    if (!atRiskTasks || atRiskTasks.length === 0) {
      return { analysis: 'No tasks at risk currently.', recommendations: [] };
    }

    const prompt = `You are an AI operations analyst. Analyze these at-risk tasks and provide insights:

Tasks at risk:
${JSON.stringify(atRiskTasks, null, 2)}

Provide:
1. Why these tasks are at risk
2. Common patterns
3. Top 3 actionable recommendations

Keep it concise and actionable.`;

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

    const prompt = `Analyze workload overload for these team members:

${JSON.stringify(overloadedUsers, null, 2)}

Provide:
1. Severity assessment
2. Impact on team productivity
3. Recommended actions

Be specific and actionable.`;

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
    const prompt = `Analyze these incidents and patterns:

Recent incidents:
${JSON.stringify(incidents.slice(0, 10), null, 2)}

Detected patterns:
${JSON.stringify(patterns, null, 2)}

Provide:
1. Root cause analysis
2. Recurring patterns
3. Prevention recommendations`;

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
    const prompt = `You are analyzing why a sprint is delayed. Here's the data:

Overdue tasks: ${data.overdue.length}
${JSON.stringify(data.overdue.slice(0, 5), null, 2)}

Blocked tasks: ${data.blocked.length}
${JSON.stringify(data.blocked.slice(0, 5), null, 2)}

Recent incidents: ${data.incidents.length}
Overloaded team members: ${data.overloaded.length}

Provide a clear root cause analysis explaining:
1. PRIMARY reason for the delay
2. Contributing factors
3. Specific actionable recommendations (be very specific - include task IDs, names)

Format as JSON with keys: root_cause, contributing_factors, recommendations (array)`;

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
