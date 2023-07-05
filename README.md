# New Aggregator API

### About

A simple new-aggregator-api which uses external API and gets the news.

### Built using

- [![Node][Node.js]][Node-url]
- [![Express][express.js]][express-url]
- [![EsLint][eslint.js]][eslint-url]
- [![Postman][postman.js]][postman-url]

### Getting started

1. Clone the repo

```
git clone https://github.com/saireddyavs/news-aggregator-api.git && cd news-aggregator-api
```

2. Install devepencies

```
npm install
```

3. Run the API locally

```
npm run start
```

You can access the api Endpoints at `localhost:3000`

Please refer to attached postaman collection for getting clear view of handled flows and error cases.

### List of available endpoints

1. **POST /register**

   - Taks fullName,email,password and registers the user
   - Checks if the fullName exists,not empty and fullName is string with only alphabets
   - Checks if the email is exits,not empty and email is a valid email.
   - Checks if the password is exists,not empty
   - If there are more than one request validation errors, all errors are passed in one response as array
   - If all validations passes
     - Check if user is already exits
     - Create new user if no user with same email

2. **POST /signin**

   - Takes email and password
   - Check if the emails exists,not empty and email is a valid email
   - Check is password exists and not empty
   - If there are more than one request validation errors, all errors are passed in one response as array
   - If all validations passes
     - Check if email is already registered or not
     - If user already exists verify if given password matches with registered password
     - Generate accessToken and pass in reponse
     - Token expiry time is 300s

3. **PUT /news/preferences**

   - Take Action and preferences object which can have sources array and catogories array
   - Check if authrization header is passed in request
     - Check if the header is in valid format having `jwt` keyword and token is present
     - Verify the token
     - Check if the token is expired
   - if action is ADD, append to existing preferences
   - if action other than ADD, ovverwrite existing preferences
   - set of valid categories and sources can be seen from attached SourceToCategorymapping file
   - return success message

4. **GET /news/preferences**

   - Check if authrization header is passed in request
     - Check if the header is in valid format having `jwt` keyword and token is present
     - Verify the token
     - Check if the token is expired
   - Check if there are prefernces set before, else set no preferences set message
   - Else return user preferences

5. **GET /news**

   - Check if authrization header is passed in request
     - Check if the header is in valid format having `jwt` keyword and token is present
     - Verify the token
     - Check if the token is expired
   - Based on the given user preferences filter valid sources and categories and get news for the same
   - If there are no preferences set or there is no valid source and category combination send all the news

## References:

project structue : https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/

Cors : https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express

bodyParser: https://stackoverflow.com/a/39872729/11652193

morgan: https://www.npmjs.com/package/morgan

[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express-url]: https://expressjs.com/
[eslint.js]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[eslint-url]: https://eslint.org/
[postman.js]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[postman-url]: https://www.postman.com/
