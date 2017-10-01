<template>
  <div class="main">
    <base-left></base-left>
    <div class="right-panel">
      <div class="right-top">
        <div class="path-block">
          <a href="/">
            <i class="fa fa-home fa-fw"></i>
          </a>
        </div>
        <div class="ops-block">
            <el-button type="primary">上传文件</el-button>
            <el-button>新建文件</el-button>
            <el-button>新建目录</el-button>
          </div>
      </div>
      <div class="right-main">
        <el-table
          ref="multipleTable"
          :data="filelist"
          stripe
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="size"
            label="大小"
            width="120">
          </el-table-column>
          <el-table-column
            prop="mtime"
            label="修改日期"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseLeft from '@/components/BaseLeft'

  export default {
    data() {
      return {
        filelist: []
      }
    },
    mounted() {
      let dir_path = this.$route.query.p ? this.$route.query.p : '/'

      this.$http.get('api/api/files', {params:{"path":dir_path}}).then((response) => {
        let data = response.data
        let files = data.files
        for (let index = 0; index < files.length; index++) {
          let obj = {}
          obj['name'] = files[index]['Name']
          obj['size'] = files[index]['Size']
          obj['mtime'] = files[index]['MtimeRelative']
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
      position: relative;
      .path-block {
        height: 100%;
        line-height: 60px;
        margin-right: 10px;
        float: left;
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
      top: 60px;
      width: 100%;
    }
  }
</style>