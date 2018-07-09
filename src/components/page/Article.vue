<template>
  <div class="article-container">
    <router-link to="/write">编辑</router-link>
    <div v-html="article"></div>
  </div>
</template>

<script>
    import MarkdownIt from 'markdown-it'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "Article",
      computed: {
          article () {
            const md = new MarkdownIt();
            const value = this.$store.state.article.article.content
            return value ? md.render(value) : ''
          }
      },
      created () {
        const id = this.$route.params.id
        this.$store.dispatch('getArticleDetails', { id })
      }
    }
</script>

<style scoped>
.article-container{
  max-width: 1400px;
  margin: 0 auto;
}
</style>
