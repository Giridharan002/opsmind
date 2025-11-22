/**
 * Normalizes Monday.com data into OpsMind format
 */

class MondayNormalizer {
  normalizeTask(payload) {
    try {
      // Monday webhook payload structure varies
      const pulseId = payload.pulseId || payload.payload?.pulseId;
      const pulseName = payload.pulseName || payload.payload?.pulseName;
      
      if (!pulseId) {
        return null;
      }

      // Extract column values
      const columnValues = payload.payload?.columnValues || {};
      
      return {
        task_id: `monday_${pulseId}`,
        source_app: 'monday',
        title: pulseName || 'Untitled Task',
        owner: columnValues.person?.name || 'Unassigned',
        status: this.normalizeStatus(columnValues.status?.label),
        priority: this.normalizePriority(columnValues.priority?.label),
        due_date: columnValues.date?.date || null,
        links: {
          monday_url: `https://monday.com/boards/item/${pulseId}`
        },
        metadata: {
          board_id: payload.boardId,
          raw_payload: payload
        }
      };
    } catch (error) {
      console.error('Monday normalization error:', error);
      return null;
    }
  }

  normalizeStatus(status) {
    if (!status) return 'unknown';
    
    const statusMap = {
      'done': 'done',
      'working on it': 'in_progress',
      'stuck': 'blocked',
      'waiting': 'waiting',
      '': 'todo'
    };

    return statusMap[status.toLowerCase()] || status.toLowerCase();
  }

  normalizePriority(priority) {
    if (!priority) return 0;

    const priorityMap = {
      'critical': 4,
      'high': 3,
      'medium': 2,
      'low': 1
    };

    return priorityMap[priority.toLowerCase()] || 0;
  }
}

module.exports = new MondayNormalizer();
