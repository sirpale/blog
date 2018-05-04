<template>

  <div class="container-box">
    <el-card class="box-card">

        <el-col :span="4">
          <div class="left">
            <ul v-for="(item, index) in list" :key="index">
              <li ><router-link :class="" :to="{path:`/user/${loginName}/${item.name}`}">{{item.title}}</router-link></li>
            </ul>
          </div>

        </el-col>
        <el-col :span="20">
          <div class="right">
            <router-view />
          </div>
        </el-col>

    </el-card>
  </div>


</template>

<script>

  import {mapState, mapActions} from 'vuex';

  export default {
    name: "user-home",
    data() {
      return {
        activeName: 'user-home',
        handleOpen : true,
        list: [
          {
            name: '',
            title: '个人主页'
          },
          {
            name: 'article',
            title: '发表的文章'
          },
          {
            name: 'collect',
            title: '收藏'
          },
          {
            name: 'message',
            title: '留言'
          },
          {
            name: 'set',
            title: '设置'
          }
        ]
      }
    },
    computed: {
      ...mapState({
        loginName: state => state.login.loginName
      })
    },

    methods: {

    }
  }

</script>

<style scoped lang="scss" src="../../assets/css/user.scss"></style>
