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
const server = require('http').Server(app);
const socketServer = require('ws').Server;
const wss = new socketServer({
  server:server,
  port: 3001
});

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



// socket服务器
wss.on('connection', (client) => {
  client.on('message', _message => {
    let _messageObj = JSON.parse(_message);

    // status = 1表示正常
    _messageObj.status = 1;
    this.message = _messageObj;

    // 把客户端的消息广播给所有在线的用户
    wss.broadcast(_messageObj);
  });

  // 退出聊天
  client.on('close', () => {
    try {
      this.message = this.message || {};
      // status = 0 表示退出聊天
      this.message.status = 0;
      // 把客户端的消息广播给所有在线的用户
      wss.broadcast(this.message);
    } catch(e) {
      console.log('刷新页面了');

    }

  })

});

// 定义广播方法
wss.broadcast = function broadcast(_messageObj) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(_messageObj));
  })
};

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
