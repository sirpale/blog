<template>

  <div class="container-box">
    <el-card class="box-card" style="padding:20px 0;">
      <el-form :ref="form" label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="简介：">
          <el-input type="textarea" v-model="form.intro"   rows="2"/>
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
        <el-form-item label="内容：" style="height:400px;margin-top:10px;">
          <!--<quill-editor-->
          <!--v-model="form.content"-->
          <!--:height="300"-->
          <!--:options="editorOption"-->
          <!--@blur=""-->
          <!--@focus=""-->
          <!--@ready=""-->
          <!--/>-->
          <!--<mavon-editor v-model="form.content" :ishljs = "true" style="height:400px;"/>-->
          <!--<el-input type="textarea" v-model="form.content" rows="10" />-->
          <div class="quill-editor-example">
            <!-- quill-editor -->
            <quill-editor v-model="form.content"
                          ref="myTextEditor"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)"
                          style="height:300px;"
            >
            </quill-editor>
            <div class="quill-code">
              <!--<code class="hljs" v-html=""></code>-->
            </div>
          </div>
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
<style scoped lang="scss">
  .quill-code {
    border: none;
    height: auto;
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
</style>

<script src="@/js/sub-article.js"></script>


