const { Before, After } = require('@cucumber/cucumber');
const log4js = require('../log4js.config');
const logger = log4js.getLogger('Hooks');

Before(function () {
  logger.info('Starting test execution');
});

After(function () {
  logger.info('Test execution completed');
});
