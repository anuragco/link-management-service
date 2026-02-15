const express = require('express');
const router = express.Router();
const { renderHomePage } = require('../Controller/Static.controller');

router.get('/', renderHomePage)

module.exports = router