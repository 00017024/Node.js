const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


const homeRouter = require('./routes/home');
app.use('/', homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
