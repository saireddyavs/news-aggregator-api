const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const newAggregator = require('./src/routes/newAggregator');
const auth = require('./src/routes/auth');
const morgan = require('morgan');

const routes = express.Router();

const app = express();
const PORT = 3000;

app.use(cors({ origin: '*', methods: ['POST', 'GET', 'PUT', 'DELETE'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(routes);

// routes.use('/news', newAggregator);
routes.use('/', auth);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      'Server is Successfully Running, and App is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
