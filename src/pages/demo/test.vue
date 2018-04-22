<template>
  <!--<el-button type="text" @click="$store.dispatch('switchDialog')">点击打开 Dialog</el-button>-->
  <!--<t-dialog />-->

  <!--组件状态管理-->
  <!--<el-button @click="add">+1</el-button>-->
  <!--<el-button @click="dec">-1</el-button>-->
  <!--<p>{{count}}</p>-->

  <!--<div>-->
  <!--<el-input type="text" v-model="incrementValue" style="width:200px;"/>-->
  <!--<el-button @click="incrementWithValue">计算</el-button>-->
  <!--<div v-if="show">-->
  <!--计算中...-->
  <!--</div>-->

  <!--</div>-->

  <p>原始父组件信息：{{msg}}</p>
  <t-api
    :title-txt="titleTxt"
    :child-arr="childArr"
    :msg="msg"
    @upup="change"
  />


  <t-api2 />
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  import Dialog from './dialog';
  import Api from './api';
  import Api2 from './api2';


  export default {
    name: "test",
    data() {
      return {
        msg: '原始信息',
        childArr: [1,2,3,4],
        titleTxt: '这里是工具板块',
        incrementValue: 0,
        dialogVisible: false,
        activeIndex: '/tool'
      }
    },
    components: {
      "t-dialog": Dialog,
      "t-api": Api,
      "t-api2": Api2
    },
    computed: {
      ...mapState({
        show: state => state.login.waiting,
        count: state => state.login.count
      })
    },
    methods : {
      change(msg) {
        this.msg = msg;
        console.log(msg);
      },
      ...mapActions({
        add: 'increment',
        dec: 'decrement'
      }),
      incrementWithValue() {
        try{
          this.$store.dispatch('incrementWithValue', this.incrementValue);
        } catch(e) {
          console.log(e);
        }

      }
    }

  }



</script>

<style scoped>

</style>
