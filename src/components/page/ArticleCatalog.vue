<template>
  <div>
    <router-link to="/write">编辑</router-link>
    <div v-for="item in catalog" :key="item.title" class="catalog-item">
      <router-link :to=" '/article/' + item._id">{{ item.title }}</router-link>
      <span v-for="el,index in item.tags" :key="index">{{ el }}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ArticleCatalog",
      computed: {
          catalog () {
            console.log('catalog',this.$store.state.article.catalog)
            return this.$store.state.article.catalog
          }
      },
      created () {
        this.$store.dispatch('getArticleCatalog')
      }
    }
</script>

<style scoped>
.catalog-item{
  display: inline-block;
}
</style>
