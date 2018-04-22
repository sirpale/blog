<template>
  <div class="container-box">
    <el-card class="box-card">

        <el-col :span="4">
          <div class="left">
            <ul>
              <li><a href="javascript:void(0);">个人主页</a></li>
              <li><a href="javascript:void(0);">发表的文章</a></li>
              <li><a href="javascript:void(0);">收藏</a></li>
              <li><a href="javascript:void(0);">留言</a></li>
            </ul>
          </div>




        </el-col>
        <el-col :span="20">
          <div class="right">
            没有任何内容
          </div>
        </el-col>




    </el-card>
  </div>


</template>

<script>


  export default {
    name: "user-home",
    data() {
      return {
        activeName: 'user-home',
        handleOpen : true
      }
    },

    methods: {

    }
  }
</script>

<style scoped lang="scss" src="../../styles/user.scss"></style>
