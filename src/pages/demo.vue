<template>
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button @click="$emit('enlarge-text',0.1)">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
</template>

<script>
  export default {
    name: "demo",
    props: ['post'],
    data() {
      return {
        counter: 0
      }
    },
    methods: {
      incrementCounter() {
        this.$emit('increment');
        this.counter++;
      }
    }
  }
</script>

<style scoped>

</style>
