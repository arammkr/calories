const NotFoundController = require('@http/controllers/not-found');
const config = require('@config');
const express = require('express');
const api = require('./api');

const baseApiUrl = config.get('BASE_API_URL');
const router = express.Router();

router.use(baseApiUrl, api);

router.use('*', NotFoundController);

module.exports = router;
