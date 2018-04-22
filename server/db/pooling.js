const Mysql = require('mysql');
const Config = require('./config');


const pool = Mysql.createPool(Config);

// const selectSQL = 'select * from b_user limit 10';
// const selectSQL = "show variables like 'wait_timeout'";
//
// // let query = (conn,selectSQL) => {
// //
// //   conn.query(selectSQL,(err, res) => {
// //     console.log(new Date());
// //     console.log(res);
// //     conn.release();
// //   });
// // };
//
// pool.getConnection((err, conn) => {
//   if(err) console.log('POOL ==> ' + err);
//
//   function query(){
//     conn.query(selectSQL, function (err, res) {
//       console.log(new Date());
//       console.log(res);
//       conn.release();
//     });
//   }
//   setInterval(query, 5000);
//
//   // conn.query(selectSQL, (err, rows) => {
//   //   if(err) console.log(err);
//   //   console.log('SELECT ==> ' );
//   //   for ( let i in rows) {
//   //     console.log(rows[i]);
//   //   }
//   //   conn.release();
//   // });
// });


module.exports = pool;


