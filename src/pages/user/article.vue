<template>
  <el-table
    :data="tableData"
    style="width: 100%">

    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>

    <el-table-column
      prop="date"
      label="日期"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="views"
      label="浏览数"
      width="100"
    >
    </el-table-column>
  </el-table>


</template>

<script>


  export default {
    name: "user-article",
    data() {
      return {
        activeName: 'user-article',
        tableData: [
          {
            date: '2018-05-02',
            views: 2319,
            title: 'vue入门教程（一）'
          },
          {
            date: '2018-05-02',
            views: 2319,
            title: 'vue入门教程（二）'
          },
          {
            date: '2018-05-02',
            views: 2319,
            title: 'vue入门教程（三）'
          },
          {
            date: '2018-05-02',
            views: 2319,
            title: 'vue入门教程（四）'
          },
          {
            date: '2018-05-02',
            views: 2319,
            title: 'vue入门教程（五）'
          }
        ]
      }
    },

    methods: {

    }
  }
</script>

