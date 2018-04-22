const Mysql = require('mysql');
const Config = require('./config').config;
let conn;

let handleError = () => {
  conn = Mysql.createConnection(Config);

  // 链接错误，2秒重试
  conn.connect(err => {
    if(err) {
      console.log('error when connect to db: ', err);
      setTimeout(handleError, 2000);
    }
  });

  conn.on('error', err => {
    console.log('db error', err);
    // 如果是链接断开，自动重新链接
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleError();
    } else {
      throw err;
    }
  })
};

handleError();

let query = () => {
  console.log(new Date());
  let sql = "show variables like 'wait_timeout'";
  conn.query(sql, function(err, res){
    console.log(res);
  });
};

query();
setInterval(query, 15*1000);
