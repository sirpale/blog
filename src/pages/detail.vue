<template>
  <el-card
    class="box-card content-card"

  >
    <el-row class="detail-content"
        v-loading="loading"
        element-loading-text="加载中..."
    >
      <span class="no-data" v-show="show">{{ noData }}</span>
      <div v-show="!show">
        <h3>
          {{article.title}}
          <el-button
            v-show="loginName && loginName === 'admin'"
            type="danger"
            icon="el-icon-edit"
            size="small"
            style="float:right;"
            @click="jumpToEdit(article.id)">
            修改
          </el-button>
        </h3>
        <span class="author">
        <i class="el-icon-edit"></i>&nbsp;
        {{article.author}} &nbsp;
        <i class="el-icon-date"></i>&nbsp;
        {{ article.createTime }}&nbsp;
        <i class="el-icon-view"></i>&nbsp;
        {{ article.hits }}&nbsp;
        <i class="el-icon-edit-outline"></i>&nbsp;
        {{article.postNum}}
      </span>
        <div class="intro">
          前言：{{ article.intro }}...
        </div>

        <div class="content" v-html="article.content"  v-hljs>
          <!--<mavon-editor v-model="article.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :codeStyle="style"/>-->
        </div>
      </div>

    </el-row>
  </el-card>
</template>



<style scoped lang="scss">

  .detail-content {
    padding: 20px;
    overflow:hidden;
    h3 {line-height:40px;padding-bottom:10px;font-size:20px;}
    span.author {padding: 10px 0;display:block;height:30px;line-height:30px;border-top:1px solid #e6e6e6;}
    .intro {border:1px solid #e6e6e6;background:#f9f9f9;padding:10px;line-height:24px;color:#666;}
    .content {padding: 20px 0;font-size:14px;line-height:26px;}
  }


</style>


<script src="@/assets/js/detail.js"></script>
