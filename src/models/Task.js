const db = require('../config/database');

class Task {
  static async create(taskData) {
    const query = `
      INSERT INTO tasks (task_id, source_app, title, owner, status, priority, due_date, links, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (task_id) 
      DO UPDATE SET 
        title = EXCLUDED.title,
        owner = EXCLUDED.owner,
        status = EXCLUDED.status,
        priority = EXCLUDED.priority,
        due_date = EXCLUDED.due_date,
        updated_at = CURRENT_TIMESTAMP,
        links = EXCLUDED.links,
        metadata = EXCLUDED.metadata
      RETURNING *
    `;
    
    const values = [
      taskData.task_id,
      taskData.source_app,
      taskData.title,
      taskData.owner,
      taskData.status,
      taskData.priority || 0,
      taskData.due_date,
      JSON.stringify(taskData.links || {}),
      JSON.stringify(taskData.metadata || {})
    ];
    
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (filters.status) {
      query += ` AND status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    if (filters.owner) {
      query += ` AND owner = $${paramCount}`;
      params.push(filters.owner);
      paramCount++;
    }

    query += ' ORDER BY updated_at DESC';

    const result = await db.query(query, params);
    return result.rows;
  }

  static async findOverdue() {
    const query = `
      SELECT * FROM tasks 
      WHERE due_date < NOW() 
      AND status NOT IN ('done', 'completed', 'closed')
      ORDER BY due_date ASC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async findAtRisk() {
    const query = `
      SELECT * FROM tasks 
      WHERE (due_date < NOW() + INTERVAL '2 days' AND status != 'done')
      OR (status = 'blocked')
      ORDER BY priority DESC, due_date ASC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async delete(taskId) {
    const query = 'DELETE FROM tasks WHERE task_id = $1';
    await db.query(query, [taskId]);
  }
}

module.exports = Task;
