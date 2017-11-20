<template>
<div>
  <codemirror ref="myEditor" :value="code"></codemirror>
</div>
</template>

<script>
import Vue from 'vue'
import { codemirror } from 'vue-codemirror-lite'
export default {
  data () {
    return {
      code: ''
    }
  },
  computed: {
    editor() {
      // get current editor object
      return this.$refs.myEditor.editor
    }
  },
  mounted() {
    // use editor object...
    this.editor.focus()
    console.log('this is current editor object', this.editor)
    let parent_dir = this.$route.query.dir
    let file_name = this.$route.query.file

     //获取下载链接
    if (parent_dir && file_name) {
      this.$http.get('api/api/file/get_tmp_download_link', {params:{"path": parent_dir + '/' + file_name}}).then((response) => {
          console.log(response)
          let data = response.data
          let link = data['link']
          console.log(link)
          link = 'api' + link
          console.log(link)
          this.$http.get(link).then((response) => {
            console.log(response)
            this.code = response.data
          }, (response) => {
            console.error(response)
          })
        }, (response) => {
          console.error(response)
        })
    } 
  },
  components: {
    codemirror
  }
}
</script>

<style>
</style>