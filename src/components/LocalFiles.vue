<template>
  <div class="main">
    <base-left></base-left>
    <div class="right-panel">
      <div class="right-top">
        <div class="path-block">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="ops-block">
            <el-upload
                  :action="uploadAction"
                  :on-success="handleSuccess"
                  :before-upload="handleBefore"
                  :file-list="filestoupload"
                  style="float:left;">
              <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-upload>
            <el-dropdown class="new-btn">
              <el-button type="text">
                新建<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><svg-icon id="icon-wenjian1" class="new-file"></svg-icon><label>新建文件</label></el-dropdown-item>
                <el-dropdown-item><svg-icon id="icon-muluwenjianjia" class="new-file"></svg-icon><label>新建目录</label></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
      <div class="right-main">
        <el-table
          ref="multipleTable"
          :data="filelist"
          stripe
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="" width="50">
            <template scope="scope">
              <svg-icon id="icon-wenjianjia" class="new-file"></svg-icon>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            sortable
            width="360">
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
              <a href="#" @click.prevent="handleDownload(scope.$index, scope.row)">
                <i class="fa fa-download"></i>
              </a>
              <i class="el-icon-star-off"></i>
              <el-button size="small" @click="handleShare(scope.$index, scope.row)">分享</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseLeft from '@/components/BaseLeft'
  import Common from '@/mixin/common.js'

  export default {
    data() {
      return {
        currentPath: "/",
        filelist: [],
        filestoupload: [],
        uploadAction: "api/api/upload/files"
      }
    },
    mixins: [Common],
    methods: {
      handleShare(index, row) {
        console.log(index)
        console.log(row)
      },
      handleSuccess(response){
          console.log(response)
          let files = response.files
          console.log(files)
          for (let index = 0; index < files.length; index++) {
            console.log(files[index])
            let obj = {}
            obj['name'] = files[index]['Name']
            obj['size'] = this.formatSize(files[index]['Size'])
            obj['mtime'] = files[index]['MtimeRelative']
            obj['type'] = files[index]['Type']
            this.filelist.push(obj)
          }
          //this.filestoupload = [{name: response.name, url: imgBaseUrl + response.photo}]
      },
      handleBefore(){
        return this.filestoupload.length === 1 ? false : true // 只让它上传一张
      },
      handleDownload(index, row) {
        this.$http.get('api/api/file/get_tmp_download_link', {params:{"path":this.currentPath + row.name}}).then((response) => {
          console.log(response)
          let data = response.data
          let link = data['link']
          console.log(link)
          link = 'api' + link
          window.location = link
        }, (response) => {
          console.error(response)
        })
      }
    },
    mounted() {
      let dir_path = this.$route.query.p ? this.$route.query.p : '/'
      let that = this

      this.$http.get('api/api/files', {params:{"path":dir_path}}).then((response) => {
        let data = response.data
        let files = data.files
        for (let index = 0; index < files.length; index++) {
          let obj = {}
          obj['name'] = files[index]['Name']
          obj['size'] = that.formatSize(files[index]['Size'])
          obj['mtime'] = files[index]['MtimeRelative']
          obj['type'] = files[index]['Type']
          this.filelist.push(obj)
        }
      }, (response) => {
        console.error(response)
      })
    },
    components: {
      BaseLeft
    }
  }
</script>

<style lang="scss" scoped>
  .right-panel {
    position: fixed;
    left: 60px;
    top: 0;
    width: 100%;
    height: 100%;
    .right-top {
      width: 100%;
      height: 60px;
      //background-color: #ccc;
      overflow: hidden;
      position: relative;
      .path-block {
        height: 100%;
        line-height: 60px;
        margin-right: 10px;
        float: left;
        padding-top: 25px;
        a {
          cursor: pointer;
          font-weight: bold;
          color: #555;
        }
      }
      .ops-block {
        height: 100%;
        line-height: 60px;
        float: left;
        margin-left: 20px;
      }
    }
    .right-main {
      background-color: #ccc;
      position: relative;
      top: 20px;
      width: 100%;
    }
  }
  .new-btn {
    margin-left: 15px;
  }
  .new-file {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
</style>