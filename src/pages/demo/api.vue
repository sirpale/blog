<template>

  <div>
    父组件传过来的数据：

    <p>标题：{{ thisTitleTxt }}</p>
    <p>数组：{{ thisChildArr }}</p>

    <p>
      子组件传给父组件：
      <el-button @click="up">和父组件通信</el-button>
    </p>

    <p>
      非父子组件通信：
      {{msg}}
    </p>


  </div>

</template>


<script>
  export default {
    name : 'api',
    props: {
      childArr: {
        type: Array,
        default: [0,0,1,2]
      },
      titleTxt : String

    },
    data() {
      return {
        msg: '我是API',
        thisChildArr: this.childArr,
        thisTitleTxt: this.titleTxt
      }
    },
    created() {
      this.bus.$on('change',()=> {
        this.msg = 'eeeeeeeeeeeeeeeeee'
      })
    },
    mounted() {


    },
    methods: {
      up() {
        this.$emit('upup', '呵呵')// 主动触发upup方法
      }
    }
  }
</script>


<style scoped>

</style>
