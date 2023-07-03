const newAggregatorRoutes = require('express').Router();
const bodyParser = require('body-parser');

newAggregatorRoutes.use(bodyParser.json());
newAggregatorRoutes.use(bodyParser.urlencoded({ extended: false }));
