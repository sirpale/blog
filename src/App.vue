<template>

  <div id="app">
    <!--<img src="./assets/logo.png">-->

    <div class="head-top">
      <div class="left">
        今天是 <b>{{ date }}</b>
      </div>
      <div class="right">
        <i class="el-icon el-icon-menu"></i>
        <Login />
      </div>

    </div>
    <Head></Head>
    <div class="container">
      <router-view/>
    </div>
    <div class="clear"></div>
    <Foot/>
  </div>
</template>

<script type="text/javascript" src="@/assets/js/app.js"></script>



