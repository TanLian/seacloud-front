<template>
  <div style="width: 50%">
    <el-button @click="prevPage"><svg-icon id="icon-prev" class="svg-icon"></svg-icon></el-button>
    <input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}
    <el-button @click="nextPage"><svg-icon id="icon-next" class="svg-icon"></svg-icon></el-button>
    <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
    <pdf v-show="show" :src="pdfurls" :page="page" @progress="loadedRatio = $event" @error="error" @numPages="numPages = $event"></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  data () {
    return {
      pdfurls:'',
      show: true,
      page: 1,
      loadedRatio:0,
      numPages: 3,
    }
  },
  methods: {
    error(err) {
			console.log(err);
    },
    prevPage() {
      if (this.page <= 1) {
        return
      }
      this.page -= 1
    },
    nextPage() {
      if (this.page >= this.numPages) {
        return
      }
      this.page += 1
    }
  },
  components: {
    pdf
  },
  mounted () {
    //获取参数
    let parent_dir = this.$route.query.dir
    let file_name = this.$route.query.file
    console.log(parent_dir)
    console.log(file_name)

    //获取下载链接
    if (parent_dir && file_name) {
      this.$http.get('api/api/file/get_tmp_download_link', {params:{"path": parent_dir + '/' + file_name}}).then((response) => {
          console.log(response)
          let data = response.data
          let link = data['link']
          console.log(link)
          link = 'api' + link
          console.log(link)
          this.pdfurls = link
        }, (response) => {
          console.error(response)
        })
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .svg-icon {
    width: 20px;
    height: 20px;
  }
</style>
