<template>
  <div>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
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
    <el-input type="text" @focus="" style="width:200px;margin:10px 0 0 10px" placeholder="搜索" />
    <el-button
      style="float:right;margin-top:10px;"
      type="success"
      v-show="isLogin"
      @click="jumpToSubArticle">发表新文章</el-button>
  </el-menu>

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
      }
    }
  }
</script>

<style scoped>

</style>
