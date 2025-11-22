const db = require('../config/database');

class Incident {
  static async create(incidentData) {
    const query = `
      INSERT INTO incidents (incident_id, source_app, severity, summary, logs, root_cause, timestamp, status, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (incident_id) 
      DO UPDATE SET 
        severity = EXCLUDED.severity,
        summary = EXCLUDED.summary,
        logs = EXCLUDED.logs,
        root_cause = EXCLUDED.root_cause,
        status = EXCLUDED.status,
        metadata = EXCLUDED.metadata
      RETURNING *
    `;
    
    const values = [
      incidentData.incident_id,
      incidentData.source_app,
      incidentData.severity,
      incidentData.summary,
      JSON.stringify(incidentData.logs || {}),
      incidentData.root_cause,
      incidentData.timestamp || new Date(),
      incidentData.status || 'open',
      JSON.stringify(incidentData.metadata || {})
    ];
    
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM incidents WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (filters.status) {
      query += ` AND status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    if (filters.severity) {
      query += ` AND severity = $${paramCount}`;
      params.push(filters.severity);
      paramCount++;
    }

    query += ' ORDER BY timestamp DESC';

    const result = await db.query(query, params);
    return result.rows;
  }

  static async findRecent(hours = 24) {
    const query = `
      SELECT * FROM incidents 
      WHERE timestamp > NOW() - INTERVAL '${hours} hours'
      ORDER BY timestamp DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async findPatterns() {
    const query = `
      SELECT 
        summary,
        COUNT(*) as occurrence_count,
        MAX(timestamp) as last_occurrence,
        array_agg(incident_id) as incident_ids
      FROM incidents
      WHERE timestamp > NOW() - INTERVAL '7 days'
      GROUP BY summary
      HAVING COUNT(*) > 1
      ORDER BY occurrence_count DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Incident;
