<template>
  <div class="write-container">
    <div class="settings">
      <Form ref="form" :model="form" inline>
        <div style="max-width: 1200px;margin: 0 auto;">
          <div class="two-content">
            <FormItem prop="user">
              <Input type="text" v-model="form.user" placeholder="Title" style="width: 200px">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="tag">
              <Input type="text" v-model="form.tag" placeholder="Tag" style="width: 200px">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="addTag">添加标签</Button>
              <Button type="primary" @click="handleSubmit('form')">发布</Button>
            </FormItem>
          </div>
          <div class="two-content">
            <Tag closable color="green" v-for="item,index in tags" :key="index" @on-close="deleteTip(item)">{{ item }}</Tag>
          </div>
        </div>
      </Form>
    </div>
    <mavon-editor  class="editor" @save="save"></mavon-editor>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    data() {
      return {
        tags: [],
        form: {
          user: '',
          tag: ''
        },
      }
    },
    components: {
      mavonEditor
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      addTag () {
        this.form.tag && this.tags.push(this.form.tag)
        this.form.tag = undefined
        console.log(this.tags)
      },
      deleteTip (tag) {
        console.log('delete tag', tag)
        this.tags.splice(this.tags.indexOf(tag), 1)
      },
      save (value, render) {
        console.log('value', value)
        console.log('render', render)
      }
    }
  }

</script>

<style lang="less" scoped="scoped">
  .write-container {
    height: 100vh;
  }

  .settings {
    background: linear-gradient(to right, yellow, darkseagreen);
    height: 80px;
    padding: 5px 0;
  }
  .two-content{
    overflow: hidden;
    display: inline-block;
    width: 49%;
    vertical-align: top;
  }
  .editor{
    height: calc(100vh - 80px);
    z-index: 1000;
  }
</style>
