const Mysql = require('mysql');
const Config = require('./config');

let pool = Mysql.createPool(Config);

// 将结果对象数组返回
let row = (sql, ...params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err);
      connection.query(sql, params, (error, res) => {
        connection.release();
        if(error) reject(error);

        // console.log(res);

        resolve(res);
      });
    })
  })
};

// 返回一个对象
let first = (sql, ...params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err);

      connection.query(sql, params, (error, res) => {
        connection.release();
        if(error) reject(error);

        resolve(res[0] || null);
      });
    });
  });
};


// 返回单个查询结果
let single = (sql, ...params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err);
      connection.query(sql, params, (error, res) => {
        connection.release();
        if(error) reject(error);
        for(let i in res[0]) {
          resolve(res[0][i] || null);
        }
        resolve(null);
      })
    })
  });
};

// 执行代码，返回执行结果
let execute = (sql, ...params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err);
      connection.query(sql, params, (error, res) => {
        connection.release();
        if(error) reject(error);
        resolve(res);
      });
    })
  })
};

module.exports = {
  row: row,
  first: first,
  single: single,
  execute: execute
};
