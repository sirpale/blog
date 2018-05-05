const crypto = require('crypto');
const htmlEscaper = require('html-escaper');

const ccap = require('ccap')({
  width: 256,//set width,default is 256
  height: 60,//set height,default is 60
  offset: 40,//set text spacing,default is 40
  quality: 100,//set pic quality,default is 50
  generate: function () {//Custom the function to generate captcha text

    //generate captcha text here

    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newStr = '', max = 4;
    let arr = str.split('');

    for (let i = 0; i < max; i++) {
      newStr += arr[Math.round(Math.random() * (arr.length - 1))];
    }
    return newStr;//return the captcha text

  }
});

// const User =  require('../controller/user');
const User = require('../controller/user');
const Dte = require('../utils/date');

module.exports = app => {
  // 主页
  app.get('/', (req, res, next) => {

    req.session.yzm = '12345';

    res.render('index.html', {
      title: '首页'
    });

  });

  // 获取文章列表
  app.get('/getArticleList', (req, res, next) => {
    let user = new User({});
    let info = {
      status: 'error',
      message: '获取文章失败'
    };

    let articleNum = req.query.num || 10;

    // console.log(user);

    user.getArticle(articleNum, (err, rs) => {

      if (rs) {
        if (rs.length > 0) {
          for (let i = 0; i < rs.length; i++) {
            rs[i]['id'] = rs[i]['article_id'];
            rs[i]['title'] = htmlEscaper.unescape(rs[i]['title']);
            rs[i]['content'] = htmlEscaper.unescape(rs[i]['content']);
            // rs[i]['content'] = rs[i]['content'];
            rs[i]['intro'] = htmlEscaper.unescape(rs[i]['intro']).replace(/<[^<>]+>/g, '');
            // rs[i]['intro'] = rs[i]['intro'].replace(/<[^<>]+>/g,'');
            rs[i]['createTime'] = Dte.timeStampToTime(rs[i]['create_time']);
            rs[i]['postNum'] = rs[i]['post_num'];
          }

          user.getArticleTotal((err, s) => {

            info = {
              status: 'success',
              message: '获取文章成功！',
              data: rs,
              total: s['count(article_id)']
            };

            res.send(info);

          });
        }


      }

    });
  });

  // 验证码
  app.get('/code', (req, res, next) => {
    const CCAP = ccap.get();
    // 存入session
    req.session.CCAP = CCAP[0];
    res.end(CCAP[1]);
  });

  // 注册
  app.post('/reg', (req, res, next) => {


    let info = {
      status: 'error',
      message: '无返回信息'
    };

    // 请求过来的数据
    let user = {
      name: req.body.name,
      password: req.body.password,
      repassword: req.body.repassword,
      question: req.body.question,
      answer: req.body.answer,
      code: req.body.code
    };

    // 判断注册信息是否完整
    if (user.name === '' ||
      user.password === '' ||
      user.question === '' ||
      user.answer === '' ||
      user.repassword === '' ||
      user.code === ''
    ) {
      info.message = '以上内容不得为空！';
      return res.send(info);
    }

    // 判断验证码是否正确
    req.sessionStore.all((err, rs) => {
      let codeKey = '', code = '';

      console.log(rs);

      for (let i in rs) {
        let k = rs[i]['CCAP'];
        if (k && k !== '') {
          codeKey = i;
          code = k.toLowerCase();
        }
      }

      if (user.code !== code) {
        info.message = '验证码错误';
        return res.send(info);
      }

      // 密码加密
      let md5 = crypto.createHash('md5');
      let cryPwd = md5.update(user.password).digest('hex');

      let newUser = new User({
        name: user.name,
        password: cryPwd,
        question: user.question,
        answer: user.answer
      });

      // 判断用户名是否重复
      newUser.get(newUser.name, (err, rs) => {


        if (rs) {
          info.message = '注册失败，该用户名已被注册!';
          return res.send(info);
        }

        newUser.save((error, user) => {
          if (error) {
            info.message = `注册失败！错误信息：${error.code}`;
            return res.send(info);
          }

          req.session.user = {
            name: user.name
          };

          info = {
            status: 'success',
            message: '注册成功！',
            data: {
              name: user.name
            }
          };

          return res.send(info);

        });

      });

    });

  });

  // 获取用户信息
  app.get('/login', (req, res, next) => {

    // console.log('获取用户session信息：',req.session.user);
    if (req.session.user) {
      return res.send({
        status: 'success',
        message: '已登录！',
        userInfo: req.session.user
      })
    }

    res.send({status: 'error', message: '未登录'})


  });

  // 登录提交
  app.post('/login', (req, res, next) => {
    let info = {
      status: 'error',
      message: '暂无返回值'
    };

    // 判断用户名和密码、验证码是否为空
    if (req.body.name && req.body.password && req.body.code) {

      // 查找session表里是否存在验证码
      req.sessionStore.all((err, rs) => {
        let codeKey = '', code = '';
        for (let i in rs) {
          let k = rs[i]['CCAP'];
          if (k && k !== '') {
            codeKey = i;
            code = k.toLowerCase();
          }
        }

        if (req.body.code !== code) {
          info['message'] = '验证码错误！';
          return res.send(info);
        }

        let md5 = crypto.createHash('md5');
        let pwd = md5.update(req.body.password).digest('hex');

        let user = new User({
          name: req.body.name,
          password: pwd
        });

        user.get(user.name, (err, rs) => {
          if (!rs || rs.name !== user.name || rs.password !== pwd) {
            info['message'] = '登录失败，用户名或密码不正确！';
            return res.send(info);
          }
          info = {
            status: 'success',
            message: '登录成功',
            data: {
              name: rs.name
            }
          };
          req.session.user = {
            name: rs.name
          };
          return res.send(info);
        });

      });

    }

  });


  // 登出
  app.get('/logout', (req, res, next) => {
    req.session.user = null;
    res.send({status: 'success', message: '退出成功！'});
  });


  // 发表文章
  app.post('/subarticle', (req, res, next) => {
    let user = new User({});

    let info = {
      status: 'error',
      message: '提交失败！'
    };

    console.log(req.body.id);

    console.log(req.session.user);

    if (req.session.user.name) {

      let reg = /<[^<>]+>/g;

      // let rContent = encodeURIComponent(req.body.content),
      // let rContent = encodeURI((req.body.content).toString()),
      let rContent = htmlEscaper.escape(req.body.content),
        rTitle = htmlEscaper.escape(req.body.title),
        rAuthor = req.session.user.name,
        rIsSHow = req.body.isShow,
        rTags = req.body.tags,
        rIntro = htmlEscaper.escape(req.body.intro);

      // console.log(rContent);
      let article = {
        author: rAuthor,
        title: rTitle,
        content: rContent,
        isShow: rIsSHow === true ? 1 : 0,
        tags: rTags.join(','),
        createTime: Date.now(),
        intro: rIntro ? rIntro : rContent.substring(0, 100).replace(reg, '')
      };

      if (req.body.id) {
        article.id = req.body.id;
        user.modifyArticle(article, (err, rs) => {

          if (rs) {
            info = {
              status: 'success',
              message: '文章修改成功！'
            }
          }

          res.send(info);

        });

      } else {
        user.saveArticle(article, (err, rs) => {
          if (rs) {
            info = {
              status: 'success',
              message: '文章发表成功！'
            };
          }

          res.send(info);

        });
      }


    } else {
      res.send({status: 'error', message: '未登录'});
    }

  });


  // 获取文章详情
  app.get('/getArticle', (req, res, next) => {

    let user = new User({});
    let info = {
      status: 'error',
      message: '获取失败'
    };

    let aid = req.query.id;

    if (aid) {

      user.getArticleId(aid, (err, rs) => {
        rs[0]['id'] = rs[0]['article_id'];
        rs[0]['title'] = htmlEscaper.unescape(rs[0]['title']);
        rs[0]['content'] = htmlEscaper.unescape(rs[0]['content']);
        // rs[0]['content'] = rs[0]['content'];
        rs[0]['intro'] = htmlEscaper.unescape(rs[0]['intro']).replace(/<[^<>]+>/g, '');
        // rs[0]['intro'] = rs[0]['intro'].replace(/<[^<>]+>/g,'');
        rs[0]['isShow'] = rs[0]['is_show'] === 1;
        rs[0]['createTime'] = Dte.timeStampToTime(rs[0]['create_time']);
        rs[0]['updateTime'] = rs[0]['update_time'];
        rs[0]['postNum'] = rs[0]['post_num'];

        info = {
          status: 'success',
          message: '获取成功！',
          data: rs[0]
        };

        res.send(info);
      });

    }


  });

  // 文章详情页
  app.get('/detail/:id',(req, res, next) => {
    res.render('index',{title:'首页'});
  });

  // 个人中心
  app.get('/user/:id',(req, res, next) => {
    res.render('index',{title:'首页'});
  });

  // 提交
  app.get('/sub-article',(req, res, next) => {
    res.render('index',{title:'首页'});
  });

  // 工具页面
  app.get('/tool',(req, res, next) => {
    res.render('index',{title:'首页'});
  });

  // 留言板
  app.get('/message',(req, res, next) => {
    res.render('index',{title:'首页'});
  });



};


function origin(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
}
