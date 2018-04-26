const crypto = require('crypto');

// const User =  require('../controller/user');
const User  = require('../controller/user');
const Dte = require('../utils/date');

module.exports = app => {

  // 主页
  app.get('/',(req, res, next) => {




    let user = new User({});
    let info = {
      status: 'error',
      message: '获取文章失败'
    };

    // console.log(user);

    user.getArticle(10,(err, rs) => {

      if(rs && rs.length > 0) {

        for(let i=0;i<rs.length;i++) {
          rs[i]['createTime'] = Dte.timeStampToTime(rs[i]['create_time']);
          rs[i]['postNum'] = rs[i]['post_num'];
         }

        info = {
          status : 'success',
          message: '获取文章成功！',
          data: rs
        };

        res.send(info);
      }

    });

  });


  // 注册
  app.post('/reg', (req, res, next) => {
    // origin(res);

    console.log('参数：');
    console.log(req.body);

    let info = {
      status : 'error',
      message : '无返回信息'
    };

    // 过滤掉Options请求
    if(req.method === 'POST') {

      if (req.body.password === req.body.repassword) {

        // 请求过来的数据
        let user = {
          name: req.body.name,
          password: req.body.password,
          question: req.body.question,
          answer: req.body.answer
        };

        // console.log(user);
        // 密码加密
        let md5 = crypto.createHash('md5');
        let cryPwd = md5.update(user.password).digest('hex');

        let newUser = new User({
          name: user.name,
          password: cryPwd,
          question: user.question,
          answer: user.answer
        });


        newUser.get(newUser.name,(err, rs) => {
          // console.log('获取时的错误信息：' + err);

          if(rs) {
            info.message = '注册失败，该用户名已被注册!';
            return res.send(info);
          }

          newUser.save((error, user) => {
            if(error) {
              info.message = `注册失败！错误信息：${error.code}`;
              return res.send(info);
            }

            req.session.user = {
              name : user.name
            };

            // console.log('赋值后的：');
            // console.log(req.session);

            info = {
              status: 'success',
              message: '注册成功！',
              data: {
                name : user.name
              }
            };

            return res.send(info);

          });

        });

      }
    } else {
      res.send({status: 200});
    }

  });

  // 获取用户信息
  app.get('/login',(req, res, next) => {

    console.log(req.session.user);

    if(req.session.user) {
       return res.send({
        status:'success',
        message: '已登录！',
        userInfo : req.session.user
      })
    }

    res.send({status: 'error', message: '未登录'})

  });


  // 登录提交

  app.post('/login',(req, res, next) => {


    let info = {
      status: 'error',
      message: '暂无返回值'
    };


    if(req.body.name && req.body.password) {

      let md5 = crypto.createHash('md5');
      let pwd = md5.update(req.body.password).digest('hex');

      let user = new User( {
        name: req.body.name,
        password: pwd
      });

      user.get(user.name,(err, rs) => {
        if(rs && rs.password === pwd) {
          info = {
            status: 'success',
            message: '登录成功',
            data : {
              name : rs.name
            }
          };

          req.session.user = {
            name : rs.name
          }

          // console.log(req.session);

        }  else {
          info.message = '登录失败，用户名或密码不正确！';
        }

        return res.send(info);
      });
    }

  });


  // 登出
  app.get('/logout',(req, res, next) => {
    req.session.user = null;
    res.send({status: 'success',message: '退出成功！'});
  });


  // 发表文章
  app.post('/subarticle',(req, res, next) => {
    let user = new User({});

    let info ={
      status: 'error',
      message: '提交失败！'
    };

    console.log('用户session值');
    console.log(req.session);

    if(req.session.user.name) {
      let article = {
        author: req.session.user.name,
        title: req.body.title,
        content: req.body.content,
        isShow: req.body.isShow === true ? 1 : 0,
        tags: (req.body.tags).join(','),
        createTime: Date.now()
      };


      user.saveArticle(article,(err, rs) => {

        if(rs) {
          info = {
            status: 'success',
            message: '文章发表成功！'
          };


        }


        return res.send(info);

      });
    }

  });

};


function origin(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
}
