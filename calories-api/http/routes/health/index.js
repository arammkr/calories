const express = require('express');
const { sequelize } = require('@db');

const now = new Date();
const tags = process.env.HEALTH_TAGS;
const date = `${now.toLocaleTimeString()} ${now.toLocaleDateString()}`;

const router = express.Router();

class ConnectionStatus {
  constructor(success = true, error = null) {
    this.success = success;
    this.error = error;
  }

  getErrorMessage() {
    return this.error && this.error.message && `FAIL: ${this.error.message}`;
  }

  isSuccessfull() {
    return !!this.success;
  }
}

async function hasDbConnection() {
  try {
    await sequelize.authenticate();
    return new ConnectionStatus();
  } catch (e) {
    return new ConnectionStatus(false, e);
  }
}

router.get('/', async (req, res) => {
  const [dbConnection] = await Promise.all([
    hasDbConnection(),
  ]);

  return res.json({
    status: 'OK',
    tags,
    date,
    dbConnection: dbConnection.isSuccessfull() ? 'SUCCESS' : dbConnection.getErrorMessage(),
  });
});

module.exports = router;
