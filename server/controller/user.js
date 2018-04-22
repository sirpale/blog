const Pool = require('../db/pooling');

class User {
  constructor(props) {

    // 注册用户需要的信息
    this.name = props.name;
    this.password = props.password;

    // 在用户后面保存和更新一些信息
    this.question = props.question;
    this.answer = props.answer;
  }

  // 保存用户信息
  save(callback) {
    // callback是执行完成后的回调函数
    let user = {
      name: this.name,
      password: this.password,
      question: this.question,
      answer: this.question
    };

    return new Promise((resolve, reject) => {
      Pool.getConnection((err, conn) => {
        if(err) {
          callback(err);
          conn.release();
          reject(err);
        }

        conn.query(`insert into b_user(name,password,question,answer) values('${user.name}','${user.password}','${user.question}','${user.answer}')`,(error, res) => {
          // 不管是否成功都结束数据库
          conn.release();

          if(error) reject(error);

          callback(error, user);
          resolve(user);
        })
      });
    });
  }

  get(name, callback) {

    return new Promise((resolve, reject) => {
      // 链接数据库
      Pool.getConnection((err, conn) => {
        if(err) {
          callback(err);
          conn.release();
          reject(err);
        }

        conn.query(`select * from b_user where name='${name}' limit 1`, (error, res) => {
          conn.release();
          if(res.length > 0) {
            let user = new User(res[0]);
            callback(error, user);
            resolve(user);
          } else {
            callback(error, null);
            reject(error);
          }
        });
      });
    }).catch(e => {
      console.log(e);
    });
  }


  // 保存文章

  saveArticle(article, callback) {

    return new Promise((resolve, reject) => {

      Pool.getConnection((err, conn) => {
        if(err) {
          conn.release();
          callback(err, null);
          reject(err);
        }

        conn.query(`insert into b_article(title,author,content,is_show,tags) values('${article.title}','${article.author}','${article.content}','${article.isShow}','${article.tags}')`,(err, res) => {
          conn.release();

          console.log('文章保存结果：');
          console.log(res);

          if(!res) {
            callback(err, null);
            reject(err);
          } else {
            callback(err, res);
            resolve(res);
          }

        })
      })

    });


  }

}

module.exports = User;



