
<template>
  <div>
    <!-- Form -->
    <el-button class="login-btn" type="text" v-show="!isLogin" @click="switchDialog"><i class="fa fa-user"></i>&nbsp;登录/注册</el-button>

    <span class="login-after" v-show="isLogin">
       <a @click="logout" href="javascript:void(0);"> | [退出登录]</a>
      <router-link :to="{path:`/user/${userInfo.name}`}" ><b>{{userInfo.name}}</b></router-link>
    </span>

    <LoginDialog />
  </div>

</template>

<script src="@/assets/js/login.js"></script>
