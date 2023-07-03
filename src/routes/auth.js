const auth = require('express').Router();
const bodyParser = require('body-parser');
const { register } = require('../controller/auth');
const { registerValidations } = require('../validator/auth');

auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: false }));

auth.post('/register', registerValidations, register);

module.exports = auth;
