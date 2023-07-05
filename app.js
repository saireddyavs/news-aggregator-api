const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const newAggregator = require('./src/routes/newAggregator');
const auth = require('./src/routes/auth');
const morgan = require('morgan');
const { authenticateToken } = require('./src/middleware/auth');

const routes = express.Router();

const app = express();
const PORT = 3000;

app.use(cors({ origin: '*', methods: ['POST', 'GET', 'PUT', 'DELETE'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(routes);

routes.use('/', auth);
routes.use('/news', authenticateToken, newAggregator);

app.use(function (req, res) {
  res.status(404).send({ message: 'URL not found' });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      'Server is Successfully Running, and App is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
