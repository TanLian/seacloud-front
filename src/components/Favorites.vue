<template>
  <section>
    <el-row type="flex" class="row-bg" justify="start" style="margin-bottom:10px;border-bottom:1px solid #e5e5e5;height:60px;">
        <el-col :span="6" class="toolbar" style="">
          <el-button type="primary" round>取消收藏</el-button>
        </el-col>
      </el-row>
    <el-table
          ref="multipleTable"
          :data="filelist"
          stripe
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="35">
          </el-table-column>
          <el-table-column label="名称" width="180" align="left">
            <template scope="scope">
              <svg-icon :id="scope.row.type=='dir'?'icon-wenjianjia':'icon-wenjian'" class="new-file"></svg-icon>
              <router-link v-if="scope.row.type=='dir'" :to="{name: 'MyFile', query:{p: scope.row.path + '/'} }">{{scope.row.name}}</router-link>
              <a v-else href="#" @click.prevent="">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="size"
            label="大小"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="mtime"
            label="修改日期"
            sortable
            width="240"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template scope="scope">
              <a href="#" @click.prevent="handleCancelStar(scope.$index, scope.row)">
                <i class="fa fa-star fa-lg"></i>
              </a>
            </template>
          </el-table-column>
        </el-table>
  </section>
</template>

<script>
import Common from '@/mixin/common.js'
export default {
  data () {
    return {
      filelist: [],
    }
  },
  mixins: [Common],
  methods: {
    showFavorateFiles() {
      this.$api.get('/api/files/favorites', {}, response => {
        let files = response.files
        for (let index = 0; index < files.length; index++) {
          let obj = {}
          obj['name'] = files[index]['File']['Name']
          obj['size'] = this.formatSize(files[index]['File']['Size'])
          obj['mtime'] = files[index]['File']['MtimeRelative']
          obj['type'] = files[index]['File']['Type']
          obj['path'] = files[index]['Path']
          this.filelist.push(obj)
        }
      })
    },
    handleCancelStar(index, row) {
      let params = {'path':row.path}
      this.$api.post('/api/files/favorites/delete', params, r => {
        console.log(r)
      })
    }
  },
  mounted () {
    this.showFavorateFiles()
  }
}
</script>

<style scoped>
.new-file {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
</style>