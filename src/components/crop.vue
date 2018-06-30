<template>

  <vue-crop
    @crop-upload-success="uploadSuccess"
    v-model="show"
    :width="width"
    :height="height"
    :url="uploadUrl"
    :field="fileName"
    img-format="png"
  >

  </vue-crop>



</template>

<script>

  import VueCrop from 'vue-image-crop-upload/upload-2';

  export default {
    props: {
      value: {type:Boolean},
      width:{type:Number, default:200},
      height: {type:Number, default:200},
      // 上传图片的地址
      uploadUrl: {type:String},
      // 上传图片的file控件name
      fileName: {type:String}
    },
    data() {
      return {
        show:false
      }
    },
    mounted() {
      this.show = this.value;
    },
    components: {
      VueCrop
    },
    methods: {
      uploadSuccess(res, field) {
        this.$emit('uploadSuccess', res);
      }
    },
    watch: {
      value(newVal) {
        this.show = newVal;
      },
      show(newVal) {
        if(!this.show) this.$emit('input',false);
      }
    }
  }
</script>

<style scoped>

</style>
