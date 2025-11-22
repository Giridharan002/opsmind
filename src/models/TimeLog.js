const db = require('../config/database');

class TimeLog {
  static async create(logData) {
    const query = `
      INSERT INTO timelogs (user_id, date, hours_worked, meetings_count, focus_score, metadata)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id, date) 
      DO UPDATE SET 
        hours_worked = EXCLUDED.hours_worked,
        meetings_count = EXCLUDED.meetings_count,
        focus_score = EXCLUDED.focus_score,
        metadata = EXCLUDED.metadata
      RETURNING *
    `;
    
    const values = [
      logData.user_id,
      logData.date,
      logData.hours_worked,
      logData.meetings_count || 0,
      logData.focus_score || 0,
      JSON.stringify(logData.metadata || {})
    ];
    
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByUser(userId, days = 7) {
    const query = `
      SELECT * FROM timelogs 
      WHERE user_id = $1 
      AND date > CURRENT_DATE - INTERVAL '${days} days'
      ORDER BY date DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async findOverloaded(threshold = 50) {
    const query = `
      SELECT 
        user_id,
        SUM(hours_worked) as total_hours,
        SUM(meetings_count) as total_meetings,
        AVG(focus_score) as avg_focus
      FROM timelogs
      WHERE date > CURRENT_DATE - INTERVAL '7 days'
      GROUP BY user_id
      HAVING SUM(hours_worked) > $1 OR SUM(meetings_count) > 15
      ORDER BY total_hours DESC
    `;
    const result = await db.query(query, [threshold]);
    return result.rows;
  }
}

module.exports = TimeLog;
