const express = require('express');
const config = require('./config');
const Sequelize = require('sequelize');
const promise = require('bluebird');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const easyxml = require('easyxml');
const session = require('express-session');  

const saltRounds = 10;
const dbcontext = require('./context/db')(Sequelize, config);
const out = require('./utils/out');
const auth = require('./utils/auth');

const bookService = require('./services/books')(dbcontext.book,dbcontext.author);
const authorService = require('./services/authors')(dbcontext.author);
const bookshelvService = require('./services/bookshelv')(dbcontext.bookshelv);
const genreService = require('./services/genre')(dbcontext.genre);
const quoteService = require('./services/quote')(dbcontext.quote);
const ratingService = require('./services/rating')(dbcontext.rating);
const reviewService = require('./services/review')(dbcontext.review);


const apiController = require('./controllers/api')(bookService, bookshelvService, genreService, quoteService, ratingService, reviewService, authorService);
const frontController = require('./controllers/front');

var app = express();
var router = express.Router();

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml({xmlParseOptions:{explicitArray: false}}));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(out.typeOf);

app.post('/sessions', function(req, res){
    auth.auth(req, res, dbcontext);
});

app.post('/users', function(req, res, next){
    auth.register(req, res, next, dbcontext);
});

//app.use(auth.saveUserLocal);
app.use(auth.saveUserLocal);
app.use('/api', auth.tokenVerify, apiController);

app.use(frontController);

 dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(80, () => console.log('Running on http://localhost:5000'));
    })
    .catch((err) => console.log(err));