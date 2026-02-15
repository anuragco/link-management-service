const express = require('express');
const router = express.Router();
const { RedirectUser } = require('../Controller/RedirectUser')

router.get('/:shortid', RedirectUser)

module.exports= router