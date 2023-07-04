const newAggregatorRoutes = require('express').Router();
const bodyParser = require('body-parser');
const {
  getNews,
  updatePreferences,
  getPreferences,
} = require('../controller/newsAggregator');

newAggregatorRoutes.use(bodyParser.json());
newAggregatorRoutes.use(bodyParser.urlencoded({ extended: false }));

newAggregatorRoutes.get('/', getNews);
newAggregatorRoutes.put('/preferences', updatePreferences);
newAggregatorRoutes.get('/preferences', getPreferences);

module.exports = newAggregatorRoutes;
