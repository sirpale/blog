<template>
  <el-dialog
    title="提示"
    :visible.sync="show"
    width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$store.state.dialog.show = false">取 消</el-button>
    <el-button type="primary" @click="$store.state.dialog.show = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>

  import {mapState} from 'vuex';

  export default {
    computed: {
      // 这里的三点是扩展运算符
      ...mapState({
        show: state => state.dialog.show
      })
    }
  }
</script>

<style scoped>

</style>
