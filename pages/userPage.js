const pactum = require('pactum');
const { BASE_URL, ENDPOINTS } = require('../constants/endpoints');
const log4js = require('../log4js.config');
const logger = log4js.getLogger('UserPage');

class UserPage {
  async fetchUsers() {
    try {
      logger.info('Fetching all users');
      const response = await pactum.spec()
        .get(`${BASE_URL}${ENDPOINTS.USERS}`)
        .expectStatus(200)
        .returns('res.body');
      logger.info('Fetched all users successfully');
      return response;
    } catch (error) {
      logger.error('Error fetching users', error);
      throw error;
    }
  }

  filterFanCodeUsers(users) {
    logger.info('Filtering users from city FanCode');
    const fancodeUsers = users.filter(user => {
      const address = user.address;
      if (!address || !address.geo) {
        logger.warn(`User ${user.id} does not have address information or geo location`);
        return false;
      }
      const lat = parseFloat(address.geo.lat);
      const lng = parseFloat(address.geo.lng);
      return lat >= -40 && lat <= 5 && lng >= 5 && lng <= 100;
    });
    logger.info(`Filtered ${fancodeUsers.length} users from city FanCode`);
    return fancodeUsers;
  }
}

module.exports = new UserPage();
