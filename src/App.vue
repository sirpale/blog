<template>

  <div id="app">
    <!--<img src="./assets/logo.png">-->

    <div class="head-top">
      <div class="left">
        Hi，欢迎来到 <span class="red">盛吉祥</span>的博客，今天是 <b>{{ date }}</b>
      </div>
      <div class="right">
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



