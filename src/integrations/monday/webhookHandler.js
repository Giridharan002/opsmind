const Task = require('../../models/Task');
const normalizer = require('./normalizer');

class MondayWebhookHandler {
  async process(payload) {
    try {
      console.log('Processing Monday.com webhook:', payload.event?.type);

      // Monday webhook structure: { event: { type, ... }, payload: {...} }
      const eventType = payload.event?.type;
      
      switch (eventType) {
        case 'create_pulse':
        case 'update_column_value':
          await this.handleTaskUpdate(payload);
          break;
        
        case 'delete_pulse':
          await this.handleTaskDelete(payload);
          break;
        
        default:
          console.log('Unhandled Monday event type:', eventType);
      }

      return { success: true };
    } catch (error) {
      console.error('Monday webhook processing error:', error);
      throw error;
    }
  }

  async handleTaskUpdate(payload) {
    const normalizedTask = normalizer.normalizeTask(payload);
    
    if (!normalizedTask) {
      console.log('Could not normalize Monday task');
      return;
    }

    await Task.create(normalizedTask);
    console.log(`✅ Task ${normalizedTask.task_id} synced from Monday`);
  }

  async handleTaskDelete(payload) {
    const taskId = `monday_${payload.pulseId}`;
    await Task.delete(taskId);
    console.log(`🗑️ Task ${taskId} deleted from Monday`);
  }
}

module.exports = new MondayWebhookHandler();
