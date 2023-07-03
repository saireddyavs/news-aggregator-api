const { check, param, query } = require('express-validator');

const nameValidation = check('fullName', 'fullName should be string')
  .exists()
  .withMessage('fullName not present in the request')
  .notEmpty()
  .withMessage('fullName should not be empty')
  .isAlpha('en-US', { ignore: ' ' })
  .withMessage('fullName should only have alphabets');

const emailValidation = check('email', 'email is not valid')
  .exists()
  .withMessage('email is not present in the request')
  .notEmpty()
  .withMessage('email should not be empty')
  .isEmail();

//TODO: Add some more password validation like number of character and allowrd characters
const passwordValidation = check('password', 'Enter a valid password')
  .exists()
  .withMessage('password is not present in the request')
  .notEmpty()
  .withMessage('Password should not be empty');

const registerValidations = [
  nameValidation,
  emailValidation,
  passwordValidation,
];

module.exports = { registerValidations };
