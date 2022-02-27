require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {engine} = require('express-handlebars');
var passport = require('passport');
var cors = require('cors');
var swaggerUI = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

var app = express();


// routes initialization
var authRoutes = require('./app/auth/router');
var logisticRouter = require('./app/logistic/router');

require('./config/passport')(passport);
// database connection
var mongoose_connection = require('./config/database');
mongoose_connection;

// swagger options
var options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Popaket-Test API"
};

// view engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(passport.initialize());

// routes
app.get('/', (req, res) => {
    res.render('home')
});

app.use('/auth', authRoutes);
app.use('/api', logisticRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
