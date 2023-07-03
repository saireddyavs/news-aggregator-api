const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { handleValidationError } = require('../validator/auth');

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

module.exports = { register };
