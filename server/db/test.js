const DB = require('./db');
const Polling = require('./pooling');

// 增加
// let s = DB.row('insert into b_user(name,password,question,answer) values("xiaobai3",1,1,1)');

// 删
// DB.row('delete from b_user where name="xiaobai3" ');

// 改
// DB.row('update b_user set name="xiaobai3" where name="xiaobai4"');

// 查
// (async () => {
//   let s = await DB.row("select * from b_user limit 10 ");
//   console.log(s[0])
// })();


// 搜索
// DB.row('SELECT * FROM fulltext_sample WHERE copy like \'%银行%\' or \'%上海%\' order by copy desc; ');




