<style lang="scss" scoped>
  @import '../assets/css/home.scss';
</style>

<template>
  <div id="home">
    <el-row>
      <el-col class="home-left"
              v-loading="loading"
              element-loading-text = '加载中...'
      >

        <el-card  v-show="!searchShow && list.length === 0" class="no-data">{{noData}}</el-card>

        <!-- 文章列表 -->
        <el-row v-show="!searchShow" class="grid-content" v-for="(item,index) in list" :key="`s-${index}`">
          <router-link :to="{path: `/detail/${item.id}`}" class="title" target="_blank" :title="item.title">
            <el-card class="box-card list-home" >
              <el-col :span="4" v-if="item.cover">
                <div class="left grid-content" >
                  <!--<a href="javascript:void(0);" @click="jumpToDetail(item.id)">-->
                    <!--<img src="https://www.talklee.com/zb_users/upload/2018/04/201804191524126621550907.jpg" alt="">-->
                  <!--</a>-->
                  <!--<img v-if="!item.cover " data-src="../assets/img/list1.jpg" :alt="item.title">-->
                  <img class="lazy-img" :data-src="coverUrl + item.cover" alt="">

                </div>
              </el-col>
              <el-col :span="item.cover ? 20 : 24">
                <div class="right grid-content">
                  <b class="title">{{item.title}}</b>
                  <p>{{item.intro}}</p>
                  <!--<a href="/detail/{{item.id}}" class="title">{{ item.title }}</a>-->
                  <!--<p>{{ item.intro}}...<a href="javascript:void(0);" @click="jumpToDetail(item.id)">【详细】</a></p>-->
                  <span>
                    <i class="fa fa-user"></i>&nbsp;
                    <b>{{ item.author }}</b> &nbsp;
                    <i class="fa fa-calendar"></i>&nbsp;
                    {{ item.createTime }}&nbsp;
                    <i class="fa fa-eye"></i>&nbsp;
                    <em>{{ item.hits }}</em> &nbsp;
                    <!--<i class="el-icon-edit-outline"></i>&nbsp;-->
                    <!--<i>{{ item.postNum }}</i>-->
                  </span>
                </div>
              </el-col>
            </el-card>
          </router-link>

        </el-row >
        <p v-show="sw && !searchShow" class="loadMore"><i class="fa fa-spinner"></i>&nbsp;加载中...</p>

        <el-card  v-show="searchShow && searchList.length === 0" class="no-data">没有搜索到内容</el-card>
        <!-- 搜索文章列表 -->
        <el-row v-show="searchShow" class="grid-content" v-for="(item,index) in searchList" :key="index">
          <router-link :to="{path: `/detail/${item.id}`}" target="_blank">
            <el-card class="box-card list-home" >
            <el-col v-if="item.cover" :span="4">
              <div class="left grid-content">
                <!--<a href="javascript:void(0);" @click="jumpToDetail(item.id)">-->
                <!--<img src="https://www.talklee.com/zb_users/upload/2018/04/201804191524126621550907.jpg" alt="">-->
                <!--</a>-->
                <!--<img v-if="!item.cover" src="../assets/img/list1.jpg" :alt="item.title">-->
                <img class="lazy-img" :data-src="coverUrl + item.cover" alt="">
              </div>
            </el-col>
            <el-col :span="item.cover ? 20 : 24">
              <div class="right grid-content">
                <b class="title">{{item.title}}</b>
                <p>

                {{item.intro}}...<router-link :to="{path: `/detail/${item.id}`}" target="_blank">【详细】</router-link></p>
                <!--<a href="/detail/{{item.id}}" class="title">{{ item.title }}</a>-->
                <!--<p>{{ item.intro}}...<a href="javascript:void(0);" @click="jumpToDetail(item.id)">【详细】</a></p>-->
                <span>
                  <i class="fa fa-user"></i>&nbsp;
                  <b>{{ item.author }}</b> &nbsp;
                  <i class="fa fa-calendar"></i>&nbsp;
                  {{ item.createTime }}&nbsp;
                  <i class="fa fa-eye"></i>&nbsp;
                  <em>{{ item.hits }}</em> &nbsp;
                  <!--<i class="el-icon-edit-outline"></i>&nbsp;-->
                  <!--<i>{{ item.postNum }}</i>-->
                </span>
              </div>
            </el-col>
          </el-card>
          </router-link>

        </el-row >

      </el-col>
      <el-col class="home-right" >
        <div class="grid-content">
          <!-- 信息-->
          <el-card class="box-card ava">
            <el-col>
              <a class="ava-img" href="javascript:void(0);">
                <img src="../assets/img/me.jpg"  alt="">
              </a>
            </el-col>

            <el-col class="intro">
              <p><i>博主：</i>盛吉祥</p>
              <p>专注于前端开发N多年</p>
              <p><i>职业：</i>前端开发工程师</p>
              <p><i>QQ：</i>445094898</p>

            </el-col>

          </el-card>
          <!-- 热门和推荐 -->
          <el-tabs class="border-card" type="border-card" style="height:341px;overflow:hidden;">
            <el-tab-pane label="热门">
              <ul class="list-tab" v-for="(item, index) in list.slice(0,9)" :key="index">
                <li>
                  <span class="li-icon li-icon-1">{{index + 1}}</span>
                  <router-link :to="{path:`/detail/${item.id}`}" :title="item.title">{{item.title}}</router-link>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="推荐">推荐</el-tab-pane>
          </el-tabs>

          <!-- 标签 -->
          <el-card class="box-card tags">
            <el-tag>html</el-tag>
            <el-tag type="success">css</el-tag>
            <el-tag type="info">javascript</el-tag>
            <el-tag type="warning">nodejs</el-tag>
            <el-tag type="danger">vue</el-tag>
            <el-tag type="warning">vuex</el-tag>
            <el-tag type="warning">vue-router</el-tag>
            <el-tag type="danger">axios</el-tag>
            <el-tag type="info">webpack</el-tag>
            <el-tag type="success">gulp</el-tag>
            <el-tag>react</el-tag>
            <el-tag type="success">mysql</el-tag>
            <el-tag type="info">mongodb</el-tag>
            <el-tag type="warning">html5</el-tag>
            <el-tag type="danger">css3</el-tag>
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


