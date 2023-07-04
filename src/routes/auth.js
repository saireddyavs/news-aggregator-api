const auth = require('express').Router();
const bodyParser = require('body-parser');
const { register, signIn } = require('../controller/auth');
const { registerValidations, signInValidations } = require('../validator/auth');

auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: false }));

auth.post('/register', registerValidations, register);
auth.post('/signin', signInValidations, signIn);

module.exports = auth;
