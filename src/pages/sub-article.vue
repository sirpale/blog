<template>

  <div class="container-box">
    <el-card class="box-card" style="padding:20px 0;">
      <el-form :ref="form" label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="内容：">
          <el-input type="textarea" v-model="form.content" rows="10" />
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-switch
            v-model="form.isShow"
            active-color="#13ce66"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item label="标签：">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox label="html"  />
            <el-checkbox label="css" />
            <el-checkbox label="javascript" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input style="width:100px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="subArticle">发表文章</el-button>
          <span class="red" v-show="show">{{ this.msg }}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script src="@/js/sub-article.js"></script>

<style scoped>

</style>
