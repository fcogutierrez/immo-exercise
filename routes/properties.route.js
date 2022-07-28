const express = require('express');
const router = express.Router({ mergeParams: true});

const propertiesController = require('../controllers/properties.controller');

router
    .route('/getInvestableProperties/:region')
    .get(propertiesController.getInvestableProperties);

module.exports = router;