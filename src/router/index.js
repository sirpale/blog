import Vue from 'vue'
import Router from 'vue-router'

import Err from '@/pages/error';

// import Home from '@/pages/home';
// import Say from '@/pages/say';
// import Net from '@/pages/net';
// import Tool from '@/pages/tool';
// import Message from '@/pages/message';
//
// import User from '@/pages/user/user';
// import UserHome from '@/pages/user/home';
// import UserArticle from '@/pages/user/article';
// import UserCollect from '@/pages/user/collect';
// import UserMessage from '@/pages/user/message';
// import UserSet from '@/pages/user/set';
//
//
//
// import SubArticle from '@/pages/sub-article';
// import Detail from '@/pages/detail';

Vue.use(Router);

import * as mod from './mod';


// const Tool = () => Promise.resolve('@/pages/tool');
// const Message = () => Promise.resolve('@/pages/message');


const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '',
    //   name: 'Err',
    //   component: Err,
    //   meta: {
    //     title: '错误提示'
    //   }
    // },
    {
      path: '/',
      name: 'Home',
      component: mod.Home,
      meta : {
        title : '首页'
      }
    },
    // {
    //   path: '/say',
    //   name: 'Say',
    //   component: Say,
    //   meta: {
    //     title: '众说纷纭'
    //   }
    // },
    // {
    //   path: '/net',
    //   name: 'Net',
    //   component: Net,
    //   meta: {
    //     title: '互联网'
    //   }
    // },
    {
      path: '/tool',
      name: 'Tool',
      component: mod.Tool,
      meta: {
        title: '工具'
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: mod.Message,
      meta: {
        title: '留言'
      }
    },
    {
      path: '/user/:id',
      component: mod.User,
      children: [
        {path: '', component: mod.UserHome},
        {path:'article', component:mod.UserArticle},
        {path:'collect',component:mod.UserCollect},
        {path:'message', component:mod.UserMessage},
        {path:'set', component:mod.UserSet}
      ],
      meta: {
        title: '个人中心-首页'
      }
    },
    {
      path: '/sub-article',
      name: 'sub-article',
      component: mod.SubArticle,
      meta: {
        title: '发表文章'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: mod.Detail,
      meta: {
        title: '文章详情'
      }
    }
  ]
});


router.afterEach(function(to, from){

  // document.title = '盛吉祥的博客-' + to.meta.title || '盛吉祥的博客';
  // document.querySelector('meta[name="keyword"]').setAttribute('content','keywords');
  // document.querySelector('meta[name="description"]').setAttribute('content','description');
});


export default router;
