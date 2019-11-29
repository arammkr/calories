const { internalServerError } = require('@http/middlewares');
const expressLogger = require('@utils/express-logger');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const apiRouter = require('@http/routes');
const logger = require('@utils/logger');
const express = require('express');
const config = require('@config');
const cors = require('cors');

const app = express();
const port = config.get('APP_PORT');

logger.info('ENV variables', config.get());

//
// Register Express middlewares
// -----------------------------------------------------------------------------
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressLogger);

//
// API Routes
// -----------------------------------------------------------------------------
app.use(apiRouter);

// Error handler
app.use(internalServerError());

//
// Run server
// -----------------------------------------------------------------------------
if (require.main === module) {
  app.listen(port, () => {
    logger.info(`The server is running at http://localhost:${port}/`);
  });
}

module.exports = app;
