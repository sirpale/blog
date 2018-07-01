const Pool = require('../db/pooling');
const sqlString = require('sqlstring');

class User {

  constructor(props) {

    // 注册用户需要的信息
    this.name = props.name || '';
    this.password = props.password || '';

    // 在用户后面保存和更新一些信息
    this.question = props.question || '';
    this.answer = props.answer || '';
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

        if (!conn) {
          reject('数据库连接失败！');
        } else {

          if (err) {
            callback(err);
            conn.release();
            reject(err);
          }

          let sql = sqlString.format(`insert into b_user(name,password,question,answer) values('${user.name}','${user.password}','${user.question}','${user.answer}')`);

          conn.query(sql, (error, res) => {
            // 不管是否成功都结束数据库
            conn.release();

            if (error) reject(error);

            callback(error, user);
            resolve(user);
          })
        }
      });
    });
  }

  get(name, callback) {

    return new Promise((resolve, reject) => {
      // 链接数据库
      Pool.getConnection((err, conn) => {

        if (!conn) {
          reject('数据库连接失败！');
        } else {

          if (err) {
            callback(err);
            conn.release();
            reject(err);
          }

          let sql = sqlString.format(`select * from b_user where name='${name}' limit 1`);

          conn.query(sql, (error, res) => {
            conn.release();
            if (res.length > 0) {
              let user = new User(res[0]);
              callback(error, user);
              resolve(user);
            } else {
              callback(error, null);
              reject(error);
            }
          });
        }
      });
    }).catch(e => {
      console.log(e);
    });
  }

  // 保存文章
  saveArticle(article, callback) {

    return new Promise((resolve, reject) => {

      Pool.getConnection((err, conn) => {

        if (!conn) {
          reject('数据库连接失败！');
        } else {

          if (err) {
            conn.release();
            callback(err, null);
            reject(err);
          }


          let hits = Math.floor(Math.random() * 3000);
          let postNum = Math.floor(Math.random() * 300);

          console.log(article);

          let sql = sqlString.format(`insert into b_article1(
        title,
        content,
        is_show,
        author,
        tags,
        create_time,
        update_time,
        hits,
        post_num,
        intro,
        cover
        ) values(
        '${article.title}',
        "${article.content}",
        1,
        '${article.author}',
        '${article.tags}',
        '${article.createTime}',
        '${article.createTime}',
        '${hits}',
        '${postNum}',
        '${article.intro}',
        '${article.cover}'
        )`);

          conn.query(sql, (err, res) => {
            conn.release();

            if (!res) {
              callback(err, null);
              reject(err);
            } else {
              callback(err, res);
              resolve(res);
            }
          });
        }
      });
    });
  }

  // 修改文章
  modifyArticle(article, callback) {
    return new Promise((resolve, reject) => {
      Pool.getConnection((err, conn) => {

        if (!conn) {
          reject('数据库连接失败！');
        } else {

          if (err) {
            conn.release();
            callback(err, null);
            reject(err);
          }


          let sql = sqlString.format(`update b_article1 set 
            title=?,
            content=?,
            author=?,
            update_time=?,
            tags=?,
            is_show=?,
            intro=?,
            cover=? 
            where 
            article_id=?
            `,
            [
            article.title,
            article.content,
            article.author,
            article.createTime,
            article.tags,
            article.isShow,
            article.intro,
            article.cover,
            article.id
          ]
          );


          conn.query(sql, (err, res) => {
            conn.release();
            if (err) {
              callback(err, null);
              reject(err);
            } else {

              console.log('更新的结果：');
              console.log(res);

              callback(err, res);
              resolve(res)
            }

          });
        }
      });
    });
  }

  // 获取指定数量的文章
  getArticle(par, callback) {

    return new Promise((resove, reject) => {

      Pool.getConnection((err, conn) => {

        if (!conn) {
          reject('数据库连接失败！');
        } else {
          if (err) {
            callback(err, null);
            conn.release();
            reject(err);
          }

          let sql = sqlString.format(`select * from b_article1 order by update_time desc limit ${(par.page-1)*par.size},${par.size}`);
          conn.query(sql, (err, res) => {

            // console.log(res);
            conn.release();
            if (err) {
              callback(err, null);
              reject(err);
            } else {
              callback(err, res);
            }

          });
        }

      });

    });
  }

  // 获取文章总长度
  getArticleTotal(callback) {

    return new Promise((resolve, reject) => {

      Pool.getConnection((err, conn) => {

        if(!conn) {
          reject('数据库连接失败！');
        } else {

          if (err) {
            callback(err, null);
            conn.release();
            reject(err);
          }

          let sql = sqlString.format(`select count(article_id) from b_article1`);

          conn.query(sql, (err, res) => {

            // console.log(res);

            conn.release();
            if (!res) {
              callback(err, null);
              reject(err);
            } else {
              callback(err, res[0]);
              resolve(res);
            }
          });
        }

      });

    });
  }

  // 获取指定id的文章
  getArticleId(id, callback) {

    return new Promise((resolve, reject) => {
      Pool.getConnection((err, conn) => {
        if(!conn) {
          reject('数据库连接失败！');
        } else {
          if (err) {
            callback(err, null);
            conn.release();
            reject(err);
          }

          let sql = sqlString.format(`select * from b_article1 where article_id=${id} limit 1`)

          conn.query(sql, (error, res) => {
            conn.release();
            if (!res) {
              callback(err, null);
              reject(err);
            } else {
              callback(err, res);
              resolve(res);
            }
          });
        }
      });
    });

  }

  // 搜索文章
  searchArticle(keyWord, callback) {
    return new Promise((resolve,reject) => {
      Pool.getConnection((err, conn) => {
        if(err) {
          conn.release();
          callback(err, null);
          reject(err);
        }

        let sql = sqlString.format(`SELECT * FROM b_article1 WHERE title like "%${keyWord}%" order by update_time desc`);

        conn.query(sql,(err, res) => {
          conn.release();

          // console.log(res);
          if(res) {
            callback(err, res);
            resolve(res);
          } else {
            callback(err, null);
            reject(res);
          }

        });

      });
    });
  }
}


module.exports = User;



