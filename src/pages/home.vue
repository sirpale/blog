<template>
  <div id="home">
    <el-row>
      <el-col :span="18"
              v-loading="loading"
              element-loading-text = '数据在加载中...'
              element-loading-background="rgba(255,255,255)"
      >
        <el-card  v-show="list.length === 0" class="no-data">{{noData}}</el-card>
        <el-row class="grid-content" v-for="(item,index) in list" :key="index">

          <!-- 轮播图 -->
          <!--<el-card class="box-card">-->
            <!--<div class="block">-->
              <!--<el-carousel height="220px">-->
                <!--<el-carousel-item width="100%" v-for="(item,index) in imgs" :key="index">-->
                  <!--<img :src="item" alt="" style="width:100%;display:block;height:100%;">-->
                <!--</el-carousel-item>-->
              <!--</el-carousel>-->
            <!--</div>-->
          <!--</el-card>-->

          <!-- 文章列表 -->
          <el-card class="box-card list-home" >

            <el-col :span="4">
              <div class="left grid-content">
                <!--<a href="javascript:void(0);" @click="jumpToDetail(item.id)">-->
                  <!--<img src="https://www.talklee.com/zb_users/upload/2018/04/201804191524126621550907.jpg" alt="">-->
                <!--</a>-->
                <router-link :to="{path:`/detail/${item.id}`}">
                  <img src="../assets/img/list.jpg" alt="">
                </router-link>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="right grid-content">
                <router-link :to="{path: `/detail/${item.id}`}" class="title">{{item.title}}</router-link>
                <p>{{item.intro}}...<router-link :to="{path: `/detail/${item.id}`}">【详细】</router-link></p>
                <!--<a href="/detail/{{item.id}}" class="title">{{ item.title }}</a>-->
                <!--<p>{{ item.intro}}...<a href="javascript:void(0);" @click="jumpToDetail(item.id)">【详细】</a></p>-->
                <span>
                  <i class="el-icon-edit"></i>&nbsp;
                  <b>{{ item.author }}</b> &nbsp;
                  <i class="el-icon-date"></i>&nbsp;
                  {{ item.createTime }}&nbsp;
                  <i class="el-icon-view"></i>&nbsp;
                  <em>{{ item.hits }}</em> &nbsp;
                  <i class="el-icon-edit-outline"></i>&nbsp;
                  <i>{{ item.postNum }}</i></span>
              </div>
            </el-col>
          </el-card>

        </el-row >

        <el-button v-show="getMoreShow" style="width:100%;" @click="getMore">{{getMoreText}}</el-button>

      </el-col>
      <el-col :span="6" style="padding-left:10px;" >
        <div class="grid-content">
          <!-- 信息-->
          <el-card class="box-card ava">
            <a class="ava-img" href="javascript:void(0);">
              <img src="../assets/img/logo.png"  alt="">
            </a>
            <el-col :span="24" class="intro">
              <span>盛吉祥</span>
              <p>
                个人博客，发表日常记录，记录个人成长，工作经验总结
              </p>
            </el-col>

          </el-card>
          <!-- 热门和推荐 -->
          <el-tabs class="border-card" type="border-card" style="height:341px;overflow:hidden;">
            <el-tab-pane label="热门">
              <ul class="list-tab">
                <li>
                  <span class="li-icon li-icon-1">1</span>
                  <a href="javascript:void(0);" title="久煮火锅汤会让人中毒？朋友圈十大谣言曝光(2条评论)" target="_blank">久煮火锅汤会让人中毒？朋友圈十大谣言曝光</a>
                </li>
                <li>
                  <span class="li-icon li-icon-2">2</span>
                  <a href="javascript:void(0);" title="“橘子皮秒开指纹锁”这是真的吗(2条评论)" target="_blank">“橘子皮秒开指纹锁”这是真的吗</a>
                </li>
                <li>
                  <span class="li-icon li-icon-3">3</span>
                  <a href="javascript:void(0);" title="研究表明：2月14日结婚更有可能会离婚(10条评论)" target="_blank">研究表明：2月14日结婚更有可能会离婚</a>
                </li>
                <li>
                  <span class="li-icon li-icon-4">4</span>
                  <a href="javascript:void(0);" title="升级版勒索病毒来袭，面对勒索病毒，个人用户该怎么办(2条评论)" target="_blank">升级版勒索病毒来袭，面对勒索病毒，个人用户该怎么办</a>
                </li>
                <li>
                  <span class="li-icon li-icon-5">5</span>
                  <a href="javascript:void(0);" title="zblogphp设置精选导读的教程(8条评论)" target="_blank">zblogphp设置精选导读的教程</a>
                </li>
                <li>
                  <span class="li-icon li-icon-6">6</span>
                  <a href="javascript:void(0);" title="zblogphp调用置顶文章的教程(4条评论)" target="_blank">zblogphp调用置顶文章的教程</a>
                </li>
                <li>
                  <span class="li-icon li-icon-7">7</span>
                  <a href="javascript:void(0);" title="zblogphp热门文章、热评文章调用代码(0条评论)" target="_blank">zblogphp热门文章、热评文章调用代码</a>
                </li>
                <li>
                  <span class="li-icon li-icon-8">8</span>
                  <a href="javascript:void(0);" title="zblogPHP智能侧边栏跟随固定范围浮动的效果(6条评论)" target="_blank">zblogPHP智能侧边栏跟随固定范围浮动的效果</a>
                </li>
                <li>
                  <span class="li-icon li-icon-9">9</span>
                  <a href="javascript:void(0);" title="简单说下网站导致CPU飙升的问题(8条评论)" target="_blank">简单说下网站导致CPU飙升的问题</a>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="推荐">推荐</el-tab-pane>
          </el-tabs>

          <!-- 标签 -->
          <el-card class="box-card" style="height:180px;overflow:hidden;">
            <el-tag>标签一</el-tag>
            <el-tag type="success">标签二</el-tag>
            <el-tag type="info">标签三</el-tag>
            <el-tag type="warning">标签四</el-tag>
            <el-tag type="danger">标签五</el-tag>
            <el-tag>标签一</el-tag>
            <el-tag type="success">标签二</el-tag>
            <el-tag type="info">标签三</el-tag>
            <el-tag type="warning">标签四</el-tag>
            <el-tag type="danger">标签五</el-tag>
          </el-card>

          <!-- 最新留言 -->
          <el-card class="box-card list-msg" v-for="(item, index) in messages" :key="index">
            <div class="list-content">
              <el-col :span="4" class="left">
                <a href="javascript:void(0);">
                  <img src="../assets/img/ava.jpg" alt="">
                </a>
              </el-col>
              <el-col :span="20" class="right">
                <p>{{item.content}}</p>
                <span>{{item.name}} 发表于：{{item.time}}</span>
              </el-col>
            </div>

          </el-card>

        </div>
      </el-col>

      <!--<el-col :span="24">-->
        <!--<el-card class="box-card list-show">-->
          <!--<h2>作品项目</h2>-->
          <!--<el-col :span="4" class="list-show-img">-->
            <!--<a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a>-->
          <!--</el-col>-->
          <!--<el-col :span="4" class="list-show-img">-->
            <!--<a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a>-->
          <!--</el-col>-->
          <!--<el-col :span="4" class="list-show-img">-->
            <!--<a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a>-->
          <!--</el-col>-->
          <!--<el-col :span="4" class="list-show-img">-->
            <!--<a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a>-->
          <!--</el-col>-->
          <!--<el-col :span="4" class="list-show-img">-->
            <!--<a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a>-->
          <!--</el-col>-->
          <!--<el-col :span="4" class="list-show-img">-->
            <!--<a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a>-->
          <!--</el-col>-->

          <!--&lt;!&ndash;<ul>&ndash;&gt;-->
            <!--&lt;!&ndash;<li><a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li><a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li><a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li><a href="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li><a hrefs="javascript:void(0);"><img src="https://www.talklee.com/zb_users/upload/2018/01/201801111515660263681764.jpg" alt=""></a></li>&ndash;&gt;-->
          <!--&lt;!&ndash;</ul>&ndash;&gt;-->
        <!--</el-card>-->
      <!--</el-col>-->

      <!--<div class="clear"></div>-->
      <!--<div class="link">-->
        <!--<ul>-->
          <!--<li><a href="javascript:void(0);">百度文库</a></li>-->
          <!--<li><a href="javascript:void(0);">起点小说网</a></li>-->
          <!--<li><a href="javascript:void(0);">腾讯游戏平台</a></li>-->
        <!--</ul>-->
      <!--</div>-->

    </el-row>
  </div>
</template>

<script src="@/assets/js/home.js"></script>

<style lang="scss" scoped>
  @import '../assets/css/home.scss';
</style>
