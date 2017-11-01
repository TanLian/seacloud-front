<template>
  <section>
    <el-row type="flex" class="row-bg" justify="start" style="margin-bottom:10px;border-bottom:1px solid #e5e5e5;height:60px;">
        <el-col :span="6" class="toolbar" style="padding-bottom: 0px; padding-top:5px;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{name: 'Trash', query:{p: '/'} }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in dirArr" :to="{name: 'Trash', query:{p: item.to} }" :key="item.to">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6" class="toolbar" style="">
          <el-button :disabled="delete_btn_disabled">删除</el-button>
          <el-button type="primary" round>清空</el-button>
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
              <router-link v-if="scope.row.type=='dir' && scope.row.id != ''" :to="{name: 'Trash', query:{p: currentPath + scope.row.name+'.'+scope.row.id + '/'} }">{{scope.row.name}}</router-link>
              <router-link v-else-if="scope.row.type=='dir' && scope.row.id == ''" :to="{name: 'Trash', query:{p: currentPath + scope.row.name + '/'} }">{{scope.row.name}}</router-link>
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
              <a href="#" @click.prevent="handleDelete(scope.$index, scope.row)">
                <i class="fa fa-trash-o fa-lg"></i>
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
      delete_btn_disabled:true,
      currentPath: '',
      filelist: [],
      dirArr: []
    }
  },
  mixins: [Common],
  methods: {
    handleDelete(index, row) {
      console.log('delete file')
      console.log(index)
      console.log(row)
    },
    showTrashFiles() {
      let params = {"path":this.currentPath}
      this.$api.get('/api/files/trash', params, response => {
        let files = response.files
        for (let index = 0; index < files.length; index++) {
          let obj = {}
          obj['name'] = files[index].File['Name']
          obj['size'] = this.formatSize(files[index].File['Size'])
          obj['mtime'] = files[index].File['MtimeRelative']
          obj['type'] = files[index].File['Type']
          obj['id'] = files[index]['Id']
          this.filelist.push(obj)
        }
      })
    },
      updateDirArr() {
        this.dirArr = []
        let pArr = this.currentPath.split('/')
        //去掉空白字符
        pArr = pArr.filter(function(item){
          return item != ''
        })
        if (pArr.length > 0) {
          let item0 = {}
          item0['name'] = pArr[0].substring(0, pArr[0].lastIndexOf('.'))
          item0['to'] = '/' + pArr[0] + '/'
          this.dirArr.push(item0)
          let tmpDir = '/' + pArr[0] + '/'
          for (let i = 1; i < pArr.length; i++) {
            tmpDir += pArr[i] + '/'
            let item = {}
            item['name'] = pArr[i]
            item['to'] = tmpDir
            this.dirArr.push(item)
          }
        }
        
      }
  },
  mounted () {
    this.currentPath = this.$route.query.p ? this.$route.query.p : '/',
    this.showTrashFiles()
    this.updateDirArr()
  },
  beforeRouteUpdate (to, from, next) {
    this.currentPath = to.query.p ? to.query.p : '/'
    this.filelist = []
    this.showTrashFiles()
    this.updateDirArr()
    next()
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