const pactum = require('pactum');
const { BASE_URL, ENDPOINTS } = require('../constants/endpoints');
const log4js = require('../log4js.config');
const logger = log4js.getLogger('TodoPage');

class TodoPage {
  async fetchUserTodos(userId) {
    try {
      logger.info(`Fetching todos for user ${userId}`);
      const response = await pactum.spec()
        .get(`${BASE_URL}${ENDPOINTS.TODOS}?userId=${userId}`)
        .expectStatus(200)
        .returns('res.body');
      logger.info(`Fetched todos for user ${userId} successfully`);
      return response;
    } catch (error) {
      logger.error(`Error fetching todos for user ${userId}`, error);
      throw error;
    }
  }

  calculateCompletedPercentage(todos) {
    const completedTasks = todos.filter(todo => todo.completed).length;
    const totalTasks = todos.length;
    const percentage = (completedTasks / totalTasks) * 100;
    logger.info(`User's completed task percentage is ${percentage}%`);
    return percentage;
  }
}

module.exports = new TodoPage();
