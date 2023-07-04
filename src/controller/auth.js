const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { handleValidationError, newApiError } = require('../errors/apiError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = [];

const processRequestValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(handleValidationError(errors));
    res.status(400);
    return false;
  }
  return true;
};

const register = (req, res) => {
  const isValidationSuccess = processRequestValidation(req, res);
  if (!isValidationSuccess) return;
  const { fullName, email, password } = req.body;

  const isEmailPresent = users.some((user) => user.email === email);
  if (isEmailPresent) {
    res.status(400).send({ message: 'Email is already registered' });
    return;
  }

  users.push({
    fullName,
    email,
    password: bcrypt.hashSync(password, 4),
  });

  res.status(200).json({ message: 'User registered successfully' });
};

const signIn = (req, res) => {
  const isValidationSuccess = processRequestValidation(req, res);
  if (!isValidationSuccess) return;

  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    res
      .json(
        newApiError(
          'ERR_NEW_AGG_EMAIL_NOT_FOUND',
          'Please enter correct email or register the user'
        )
      )
      .status(404);
    return;
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res
      .json(
        newApiError(
          'ERR_NEW_AGG_INCORRECT_PASSWORD',
          'Please enter ccorrect password'
        )
      )
      .status(401);
  }

  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.API_SECRET,
    {
      expiresIn: 86400,
    }
  );

  res
    .status(200)
    .json({ message: 'User logged in successfully', accessToken: token });
};

module.exports = { register, signIn };
