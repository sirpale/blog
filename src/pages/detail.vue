<template>
  <el-card class="box-card content-card">
    <div class="detail-content">
      <h3>{{article.title}}</h3>
      <span class="author">作者：{{article.author}} 时间：{{ article.createTime }} 浏览量：{{ article.hits }}</span>
      <div class="content" v-html="article.content">
        <!--<mavon-editor v-model="article.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :codeStyle="style"/>-->
      </div>

    </div>
  </el-card>
</template>



<style scoped lang="scss">

  .detail-content {
    padding: 20px;
    h3 {text-align: center;height:40px;line-height:40px;font-size:20px;}
    span.author {text-align:center;display:block;height:30px;line-height:30px;border-top:1px solid #e6e6e6;}
    .content {padding: 20px 0;font-size:14px;line-height:26px;}
  }


</style>


<script src="@/js/detail.js"></script>
