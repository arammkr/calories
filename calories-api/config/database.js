const { env } = process;

const shouldLog = env.DATABASE_LOGGING && env.DATABASE_LOGGING !== 'false';

const config = {
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  username: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  logging: shouldLog,
  dialect: 'mysql',
};

module.exports = config;
