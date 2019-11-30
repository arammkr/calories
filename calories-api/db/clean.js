const { sequelize } = require('.');
const logger = require('@utils/logger');

/**
 * @returns {Promise}
 */
async function clean() {
  await sequelize.authenticate();
  logger.info('Connection with the DB was successful');

  return sequelize.transaction(async t => {
    const options = {
      raw: true,
      transaction: t,
    };

    logger.info('Start transaction');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
    logger.info('`SET FOREIGN_KEY_CHECKS` done');
    const r = await sequelize.query('SHOW TABLES', {
      type: sequelize.QueryTypes.SHOWTABLES,
      ...options,
    });

    logger.info('Get list of tables -  done');
    r.map(async schemaName => {
      await sequelize.dropSchema(schemaName, options);
      logger.info(`Drop "${schemaName}" -  done`);
    });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
    logger.info(`SET FOREIGN_KEY_CHECKS -  done`);
    logger.info('DB clean - finished');
  });
}

clean()
  .then(() => sequelize.close())
  .catch(err => {
    logger.error({ err }, 'cleanDB error');
    sequelize.close();
  })
  .then(() => {
    process.exit();
  });
