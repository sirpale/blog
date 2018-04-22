
<template>
  <div>
    <!-- Form -->
    <el-button class="login-btn" type="text" v-show="!loginState.isLogin" @click="dialogOpen">登录/注册</el-button>

    <span class="login-after" v-show="loginState.isLogin">
       <a @click="logout" href="javascript:void(0);"> | [退出登录]</a>
      <a href="javascript:void(0);" @click="jumpToUser(userInfo.name)">
        <b>{{userInfo.name}}</b>
      </a>
      欢迎回来，

    </span>

    <el-dialog title=""
               top="10px"
               width="40%"
               :visible.sync="dialogShow.show"
               :before-close="dialogClose"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form :model="form" ref="form">
            <el-form-item label="用户名：" :label-width="formLabelWidth" prop="name">
              <el-input v-model.trim="form.name" auto-complete="off" />
            </el-form-item>
            <el-form-item label="密码：" :label-width="formLabelWidth" prop="password" >
              <el-input v-model.trim="form.password" auto-complete="off" type="password" />
            </el-form-item>
            <el-form-item label="验证码：" :label-width="formLabelWidth" prop="code">
              <el-input v-model.trim="form.code"  auto-complete="off"  style="width:50%;"/>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
              <el-button type="primary" @click="login" :disabled="isDisabled">登录</el-button>
              <span><a href="javascript:void(0);">忘记密码？</a></span>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
              <p class="sub-msg red" v-if="status.login" ref="msg">{{ msg.login }}</p>
            </el-form-item>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="reg">
          <el-form :model="form" ref="form">
            <el-form-item label="用户名：" :label-width="formLabelWidth" prop="name">
              <el-input v-model.trim="form.name" auto-complete="off" />
            </el-form-item>
            <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
              <el-input v-model.trim="form.password" auto-complete="off" type="password" />
            </el-form-item>
            <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="repassword">
              <el-input v-model.trim="form.repassword"  auto-complete="off" type="password" />
            </el-form-item>
            <el-form-item label="提示问题：" :label-width="formLabelWidth" prop="question">
              <el-input v-model.trim="form.question" auto-complete="off" />
            </el-form-item>
            <el-form-item label="问题答案：" :label-width="formLabelWidth" prop="answer">
              <el-input v-model.trim="form.answer" auto-complete="off" />
            </el-form-item>
            <el-form-item label="验证码：" :label-width="formLabelWidth" prop="code">
              <el-input v-model.trim="form.code"  auto-complete="off"  style="width:50%;"/>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
              <el-button type="success" @click="reg">注册</el-button>
              <el-button @click="resetForm('fm')">重置</el-button>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
              <p class="sub-msg red" v-if="status.reg" ref="msg">{{ msg.reg }}</p>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>

</template>

<script src="../js/login.js"></script>
