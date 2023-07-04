const auth = require('express').Router();
const bodyParser = require('body-parser');
const { register, signIn } = require('../controller/auth');
const { registerValidations } = require('../validator/auth');

auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: false }));

auth.post('/register', registerValidations, register);
auth.post('/signin', signIn);

module.exports = auth;
