
<template>

  <div class="container-box">
    <el-card class="box-card" style="padding:20px 0;"
             v-loading="loading"
             element-loading-text = '获取文章信息中..'
    >
      <el-form :ref="form" label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="简介：">
          <el-input type="textarea" v-model="form.intro"   rows="2"/>
        </el-form-item>
        <el-form-item label="封面图片：">
          <!--<el-input type="file"  v-model="form.cover"/>-->
          <el-upload
            class="uploader"
            title="点击上传图片"
            :action="uploadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.cover && !imageUrl" :src="coverUrl+form.cover" class="cover">
            <img v-if="imageUrl" :src="imageUrl" class="cover">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
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
            <!--<input type="button" value="切换裁剪" @click="canCrop=!canCrop">-->
            <!--<Editor-->
              <!--ref="myTextEditor"-->
              <!--:canCrop="canCrop"-->
              <!--:uploadUrl="uploadUrl"-->
              <!--v-model="content"-->
            <!--&gt;</Editor>-->
            <!-- quill-editor -->
            <quill-editor v-model="form.content"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)"
                          style="height:300px;"
            >
            </quill-editor>

          </div>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input style="width:100px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="subArticle">发表文章</el-button>
          <span class="red" v-show="show">{{ msg }}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<style scoped lang="scss">

  .uploader {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img {width:200px;height:150px;border:1px dashed #d9d9d9;border-radius:6px;}
  }

  .uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius:6px;
    font-size: 50px;
    color: #8c939d;
    width: 200px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    &:hover {
      border-color:#409eef;
      background:#eee;
    }
  }
</style>



<script src="@/assets/js/sub-article.js"></script>


