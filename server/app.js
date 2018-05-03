const createError = require('http-errors');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./db/config');
const route = require('./routes/index');

const sessionStore = new MySQLStore(Object.assign(config,{}));

const app = express();

// view engine setup
// 修改默认引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.renderFile);
app.set('view engine', 'html');

// app.use(multer({dest: 'uploads/'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('sirpale'));
app.use(session({
  key: 'blog',
  cookie: {
    maxAge: 6 * 60 * 60 * 1000
  },
  resave: false,
  secret: 'sirpale',
  saveUninitialized: false,
  store: sessionStore
}));


route(app);

// app.use(multer());
app.use(express.static(path.join(__dirname, '/')));

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




// 添加服务器端口
app.set('port', process.env_PORT || 3000);


// 监听端口
app.listen(app.get('port'), () => {
  console.log('服务器已开启，端口号：' + app.get('port'));
});

module.exports = app;
