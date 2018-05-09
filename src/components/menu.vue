<template>
  <div class="nav">
    <div class="b-nav">
      <div class="left">
        <div class="logo" style="float:left;margin:10px 0 0 20px;">
          <router-link to="/"><img src="../assets/img/logo.png" style="width:138px;height:44px;" alt=""></router-link>
        </div>
        <div class="search-warp">
          <el-input type="text" class="sc" @focus="scFocus" @blur="scBlur" style="width:100px;margin:10px 0 0 30px" placeholder="搜索" />
          <el-button class="fa fa-search" @click="" />
        </div>
      </div>

      <div class="right">
        <el-menu
          class="home-menu"
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
          router
        >

          <el-menu-item index="/">首页</el-menu-item>
          <!--<el-menu-item index="/say">众说纷纭</el-menu-item>-->
          <!--<el-menu-item index="/net">互联网</el-menu-item>-->
          <el-menu-item index="/tool">工具</el-menu-item>
          <el-menu-item index="/message">留言</el-menu-item>
          <el-menu-item v-show="loginName" :index="`/user/${loginName}`">个人中心</el-menu-item>
          <el-menu-item v-show="isLogin" :index="`/sub-article`">
            <el-button
              type="default"
              size="small"
              @click="jumpToSubArticle" >写文章</el-button>
          </el-menu-item>
        </el-menu>
      </div>
    </div>



    <div class="sub-menu">
      <ul><li><router-link :to="{path:'/'}">首页</router-link></li></ul>
      <ul><li><router-link :to="{path:'/tool'}">工具</router-link></li></ul>
      <ul><li><router-link :to="{path:'/message'}">留言板</router-link></li></ul>
      <!--<ul><li><router-link v-show="loginName" :to="{path:`/user/${loginName}`}">个人中心</router-link></li></ul>-->
    </div>






  </div>
</template>

<script>

  import {mapState,mapActions} from 'vuex';

  export default {
    data() {
      return {
        activeIndex: this.$router.history.current.path
      }
    },
    computed: {
      ...mapState({
        isLogin : state => state.login.isLogin,
        loginName:  state => state.login.loginName
      })
    },
    mounted() {},
    methods: {
      ...mapActions(['setArticleID']),
      handleSelect(key, keyPath) {},
      jumpToSubArticle() {
        this.setArticleID(null);
        this.$router.push({path: `/sub-article`});
      },
      scFocus() {

        let sc = document.querySelector('.sc');

        sc.style.width = '200px';

      },
      scBlur() {
        let sc = document.querySelector('.sc');

        sc.style.width = '100px';
      }
    }
  }
</script>

<style scoped>

</style>
