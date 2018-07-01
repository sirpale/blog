const compress = require('compression');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const multer = require('multer');
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

const sessionStore = new MySQLStore(Object.assign(config, {}));

const app = express();
const server = require('http').Server(app);
const socketServer = require('ws').Server;
const wss = new socketServer({
  server: server,
  port: 3001
});

// view engine setup
// 修改默认引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// app.use(multer({dest: 'uploads/'}));
app.use(compress());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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
    } catch (e) {
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


// 创建文件夹
let createFolder = folder => {
  try {
    // 测试path指定的文件或目录的用户权限，我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出no such file or directory
    fs.accessSync(folder);
  } catch (e) {
    // 文件夹不存在，以同步的方式创建文件目录
    fs.mkdirSync(folder);
  }
};

const uploadFolder = './uploads/';
createFolder(uploadFolder);

route(app);


app.use(express.static(path.join(__dirname, '/')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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

// let spider = url => {
//   return new Promise((resolve, reject) => {
//     request(url, (error, res, body) => {
//       resolve(body);
//     });
//   });
// };
//
// (async () => {
//   let dom = await spider('http://www.lanrentuku.com/');
//   let $ = cheerio.load(dom);
//
//   $('img', '.in-ne').each((i, e) => {
//     let src = $(e).attr('src');
//     let name = src.substr(src.lastIndexOf('/') + i);
//     request(src).pipe(fs.createWriteStream(name));
//   });
//
// })()


module.exports = app;
