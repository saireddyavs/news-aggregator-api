const { validationResult } = require('express-validator');
const { handleValidationError, newApiError } = require('../errors/apiError');
const NewsAPI = require('newsapi');
require('dotenv').config();
const _ = require('lodash');

const newsPreferences = [];

const suppourtedSources = ['google-news-in', 'the-hindu', 'the-times-of-india'];
const suppourtedCategories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

let sourceToCateforyMapping = {};

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const updateSourceToCategoryMapping = async () => {
  await newsapi.v2
    .sources({ language: 'en' })
    .then((res) => {
      const array = res.sources;
      var result = {};

      for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        var category = obj.category;
        var item = {
          id: obj.id,
          name: obj.name,
        };

        if (!result[category]) {
          result[category] = [];
        }

        result[category].push(item);
      }

      sourceToCateforyMapping = result;

      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

function findIdByKeyName(obj, key, name) {
  const array = obj[key];
  const foundObj = array?.find((item) => item.name === name);
  return foundObj ? foundObj?.id : null;
}

const getSourceIDs = (preferences) => {
  const { sources, categories } = preferences;
  const result = [];
  console.log('0000', sources, categories);
  for (const source of sources) {
    for (const category of categories) {
      const id = findIdByKeyName(sourceToCateforyMapping, category, source);
      console.log('00--is', id);
      if (id) result.push(id);
    }
  }
  console.log(result);
  return result.join(',');
};

const getNews = async (req, res) => {
  const { userID } = req;
  const user = newsPreferences?.find((u) => u?.id === userID);

  if (Object.keys(sourceToCateforyMapping).length === 0) {
    await updateSourceToCategoryMapping();
  }

  newsapi.v2
    .topHeadlines({
      sources: user?.preferences ? getSourceIDs(user?.preferences) : '',
      language: 'en',
    })
    .then((response) => res.status(200).json({ data: response }))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json(
          newApiError('ERR_NEW_AGG_TECHNICAL_ERROR', 'Error while getting news')
        );
    });
};

const getPreferences = (req, res) => {
  const { userID } = req;
  const user = newsPreferences?.find((u) => u?.id === userID);
  if (!user || user?.preferences?.length === 0) {
    res.status(200).json({
      message: 'There are no preference set. Please update your preferences',
    });
    return;
  }
  getSourceIDs(user.preferences);
  res.status(200).send({
    data: {
      preferences: user.preferences,
    },
  });
};

const updatePreferences = (req, res) => {
  const { action, preferences } = req.body;
  const { userID } = req;
  let user = newsPreferences?.find((u) => u.id === userID);

  if (!user) {
    user = { id: req.id, preferences: { sources: [], categories: [] } };
    newsPreferences.push(user);
  }

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
