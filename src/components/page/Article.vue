<template>
  <div class="article-wrap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css">
    <div class="article-container">
      <h2 class="title">{{ article.title }}</h2>
      <div class="tags">
        <Tag color="green" v-for="item in article.tags" :key="item">{{item}}</Tag>
      </div>
      <div class="time">{{ article.time }}</div>
      <router-link to="/write">编辑</router-link>
      <div class="content" v-html="html"></div>
    </div>
  </div>
</template>

<script>

  const dateFormat = () => {
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+" : this.getMonth() + 1, //月份
        "d+" : this.getDate(), //日
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
        "S" : this.getMilliseconds()
        //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for ( var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1,
            (RegExp.$1.length == 1) ? (o[k])
              : (("00" + o[k])
                .substr(("" + o[k]).length)));
      return fmt;
    }
  }

  dateFormat();
  export default {
    name: "Article",
    computed: {
      html () {
        const html = this.$store.state.article.article.html
        return html ? html : ''
      },
      article () {
        return this.$store.state.article.article
      },
    },
    created () {
      const id = this.$route.params.id
      this.$store.dispatch('getArticleDetails', { id })
    },
    methods: {
      timeRender (time) {
        const d = new Date(new Date(time).getTime() + 8 * 60 * 60 * 1000)
        return d.Format('yyyy-MM-dd HH:mm:ss')
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../config/base.less';

  .title{
    text-align: center;
    letter-spacing: .05em;
  }
  .article-wrap{
    min-height: 100vh;
    background-image: url(/assets/image/article/read-bg.jpg);
    background-attachment: fixed;
    overflow: hidden;
  }
  .article-container{
    max-width: 1100px;
    min-height: 100vh;
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
    margin: 0 auto;
    border-left: 10px solid rgba(255, 255, 255, 0.2);
    border-right: 10px solid rgba(255, 255, 255, 0.2);
  }
  .tags{
    text-align: center;
    margin-top: 20px;
    padding: 0 20%;
  }
  .content{
    margin-top: 20px;
  }
  .time{
    text-align: right;
  }
</style>
