// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const passport = require('./config/passport');
const connectDB = require('./config/db');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const projectsRouter = require('./routes/projects');

const app = express();
//const expressLayouts = require('express-ejs-layouts');
//app.use(expressLayouts);
//app.set('layout', 'layout');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.set('layout', 'layout');


// connect DB
connectDB(process.env.MONGO_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 hours
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// make current user available in views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;
  delete req.session.success;
  delete req.session.error;
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/projects', projectsRouter);

// catch 404
app.use(function(req, res, next) {
  res.status(404).render('index', { title: 'Not Found', message: 'Page Not Found' });
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).render('index', { title: 'Error', message: err.message || 'Server error' });
});

module.exports = app;