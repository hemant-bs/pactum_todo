const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const UserPage = require('../pages/userPage');
const TodoPage = require('../pages/todoPage');
const log4js = require('../log4js.config');
const logger = log4js.getLogger('Steps');

let users;
let fancodeUsers;

Given('User has the todo tasks', async function () {
  try {
    users = await UserPage.fetchUsers();
  } catch (error) {
    logger.error('Failed to fetch users', error);
    throw error;
  }
});

When('User belongs to the city FanCode', function () {
  try {
    fancodeUsers = UserPage.filterFanCodeUsers(users);
  } catch (error) {
    logger.error('Failed to filter FanCode users', error);
    throw error;
  }
});

Then('User Completed task percentage should be greater than 50%', async function () {
  for (const user of fancodeUsers) {
    try {
      const todos = await TodoPage.fetchUserTodos(user.id);
      const completedPercentage = TodoPage.calculateCompletedPercentage(todos);
      // Assert that the completed task percentage is greater than 50%
      assert(completedPercentage > 50, `User ${user.id} has less than 50% tasks completed`);
      logger.info(`User ${user.id} has a completed task percentage of ${completedPercentage}%`);
    } catch (error) {
      logger.error(`Error checking task completion for user ${user.id}`, error);
      throw error;
    }
  }
});
