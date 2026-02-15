const express = require('express');
const router = express.Router();
const { CreateLink } = require('../Controller/CreateLink')

router.post('/create/link', CreateLink)

module.exports = router