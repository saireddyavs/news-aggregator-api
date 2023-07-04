const { validationResult } = require('express-validator');
const { handleValidationError, newApiError } = require('../errors/apiError');
const NewsAPI = require('newsapi');
require('dotenv').config();
const _ = require('lodash');

const newsPreferences = [{ userID: 0, preferences: [] }];

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const getNews = (req, res) => {
  newsapi.v2
    .topHeadlines({ category: 'sports,business', country: 'in' })
    .then((response) => res.status(200).json({ data: response }))
    .catch(() =>
      res
        .status(500)
        .json(
          newApiError('ERR_NEW_AGG_TECHNICAL_ERROR', 'Error while getting news')
        )
    );
};

const getPreferences = (req, res) => {
  const { userID } = req;
  const user = newsPreferences.find((u) => u.id === userID);
  if (user.preferences.length === 0) {
    res.status(200).json({
      message: 'There are no preference set. Please update your preferences',
    });
    return;
  }
  res.status(200).send({
    data: {
      preferences: user.preferences,
    },
  });
};

const updatePreferences = (req, res) => {
  const { action, preferences } = req.body;
  const user = newsPreferences?.find((u) => u.id === req.id);

  if (action === 'ADD') {
    const oldSource = user?.preferences?.sources;
    const newSources = preferences?.sources;
    const oldCategories = user?.preferences?.categories;
    const newCategories = preferences?.categories;
    user.preferences = {
      sources: Array.from(new Set((oldSource || []).concat(newSources || []))),
      categories: Array.from(
        new Set((oldCategories || []).concat(newCategories || []))
      ),
    };
  } else {
    user.preferences = {
      sources: preferences?.sources,
      categories: preferences?.categories,
    };
  }

  res.status(200).json({ message: 'Preferences updated successfully' });
};

module.exports = { getNews, getPreferences, updatePreferences };
