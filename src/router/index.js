import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home';
import Say from '@/pages/say';
import Net from '@/pages/net';
import Tool from '@/pages/tool';
import Message from '@/pages/message';

import UserHome from '@/pages/user/user-home';
import SubArticle from '@/pages/sub-article';
import Detail from '@/pages/detail';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta : {
        title : '首页'
      }
    },
    {
      path: '/say',
      name: 'Say',
      component: Say,
      meta: {
        title: '众说纷纭'
      }
    },
    {
      path: '/net',
      name: 'Net',
      component: Net,
      meta: {
        title: '互联网'
      }
    },
    {
      path: '/tool',
      name: 'Tool',
      component: Tool,
      meta: {
        title: '工具'
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        title: '留言'
      }
    },
    {
      path: '/user-home/:name',
      name: 'User-home',
      component: UserHome,
      meta: {
        title: '个人中心-首页'
      }
    },
    {
      path: '/sub-article',
      name: 'sub-article',
      component: SubArticle,
      meta: {
        title: '发表文章'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
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
