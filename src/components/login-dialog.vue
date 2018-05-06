<template>
  <el-dialog title=""
             top="10px"
             :width="loginWidth"
             :visible="dialogShow"
             :before-close="dialogClose"
  >
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
        <el-form :model="form" ref="form" :rules="rules" :label-width="formLabelWidth">
          <el-form-item label="*用户名：" prop="name">
            <el-input v-model.trim="form.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="*密码：" prop="password" >
            <el-input v-model.trim="form.password" auto-complete="off" type="password" />
          </el-form-item>
          <el-form-item label="验证码：" prop="code">
            <el-input v-model.trim="form.code"  auto-complete="off"  style="width:40%;float:left;" @keyup.enter.native="login"/>
            <img class="yzm" @click="randomCode" :src="code" style="width:50%;height:40px;display:block;float:right;" alt="">
          </el-form-item>
          <el-form-item label="" >
            <el-button type="primary" @click="login" :disabled="isDisabled">登录</el-button>
            <span><a href="javascript:void(0);">忘记密码？</a></span>
          </el-form-item>
          <el-form-item label="" >
            <p class="sub-msg red" v-if="show" ref="msg">{{ msg }}</p>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="reg">
        <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
          <el-form-item label="*用户名："  prop="name">
            <el-input v-model.trim="form.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="*密码：" prop="password">
            <el-input v-model.trim="form.password" auto-complete="off" type="password" />
          </el-form-item>
          <el-form-item label="*确认密码：" prop="repassword">
            <el-input v-model.trim="form.repassword"  auto-complete="off" type="password" />
          </el-form-item>
          <el-form-item label="提示问题：" prop="question">
            <el-input v-model.trim="form.question" auto-complete="off" />
          </el-form-item>
          <el-form-item label="问题答案：" prop="answer">
            <el-input v-model.trim="form.answer" auto-complete="off" />
          </el-form-item>
          <el-form-item label="验证码：" prop="code">
            <el-input v-model.trim="form.code"  auto-complete="off"  style="width:40%;float:left;" @keyup.enter.native="reg"/>
            <img class="yzm" @click="randomCode" :src="code" style="width:50%;height:40px;display:block;float:right;" alt="">
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" @click="reg">注册</el-button>
            <!--<el-button @click="resetForm('fm')">重置</el-button>-->
          </el-form-item>
          <el-form-item label="">
            <p class="sub-msg red" v-if="show" ref="msg">{{ msg }}</p>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script src="@/assets/js/login-dialog.js"></script>

<style scoped lang="scss">

</style>
