<template>
  <div>
    <my-video :sources="video.sources" :options="video.options"></my-video>
  </div>
</template>

<script>
import myVideo from 'vue-video'
export default {
    data () {
        return {
            video: {
                sources: [],
                options: {
                    autoplay: true,
                    volume: 0.6,
                    poster: 'http://covteam.u.qiniudn.com/poster.png'
                }
            }
        }
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
            let obj = {}
            obj['type'] = 'video/mp4'
            obj['src'] = link
            console.log(obj)
            this.video.sources.push(obj)
            console.log(this.video.sources)
          }, (response) => {
            console.error(response)
          })
      } 
    },
    methods: {
      
    },
    components: {
        myVideo
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
