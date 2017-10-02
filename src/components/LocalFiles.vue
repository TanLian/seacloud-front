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
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-dropdown>
              <el-button type="text">
                新建<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><label>新建文件</label></el-dropdown-item>
                <el-dropdown-item><label>新建目录</label></el-dropdown-item>
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

  export default {
    data() {
      return {
        filelist: []
      }
    },
    methods: {
      handleShare(index, row) {
        console.log(index)
        console.log(row)
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
</style>