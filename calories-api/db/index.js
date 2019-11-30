const Sequelize = require('sequelize');
const config = require('@config');
const logger = require('@utils/logger');

const dbConfig = config.get('db');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: str => {
      if (dbConfig.logging) {
        logger.info(`sql queries: ${str}`);
      }
    },
    operatorsAliases: Sequelize.Op,
    define: {
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
);

module.exports = {
  sequelize,
  DataTypes: Sequelize,
};
