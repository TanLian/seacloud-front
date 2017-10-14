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
            <el-button type="primary">
              <input type="file" name="file" multiple @change="changeFile($event)">
              上传<i class="el-icon-upload el-icon--right"></i>
            </el-button>
            <!--<div class="upload-file-btn">
              <span>上传</span>
              <i class="el-icon-upload el-icon--right"></i>
              <input type="file" name="file" multiple @change="changeFile($event)">
            </div>-->
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
              <a href="#" @click.prevent="handleDelete(scope.$index, scope.row)">
                <i class="fa fa-trash-o fa-lg"></i>
              </a>
              <i class="el-icon-star-off"></i>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="rename" :row="scope.row" ref="rename">
                      <i class="fa fa-pencil"></i>
                      <span style="margin-left:8px;">重命名</span>
                    </el-dropdown-item>
                  <el-dropdown-item command="move">
                    <i class="fa fa-cut"></i>
                    <span style="margin-left:8px;">移动</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="copy">
                    <i class="fa fa-copy"></i>
                    <span style="margin-left:8px;">复制</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="重命名文件" size="tiny" :visible.sync="renameFormVisible">
      <el-form :model="renameForm">
        <p>重命名<b>{{renameForm.name}}</b>为：</p>
        <el-input v-model="newFileName" auto-complete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click.native="renameFileSubmit(renameForm.name)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import BaseLeft from '@/components/BaseLeft'
  import Common from '@/mixin/common.js'

  export default {
    data() {
      return {
        currentPath: this.$route.query.p ? this.$route.query.p : '/',
        filelist: [],
        uploadAction: "",
        renameFormVisible: false,
        renameForm: {
          name: ''
        },
        newFileName: ''
      }
    },
    mixins: [Common],
    methods: {
      handleCommand(command, a) {
        console.log(command)
        let data = this.$refs.rename.$attrs.row
        console.log(data.name)
        switch (command) {
          case 'rename':
              console.log(data)
              let obj = {'name':data.name}
              this.renameFormVisible = true
              this.renameForm = obj
              this.newFileName = data.name
            break
          case 'move':
              console.log(data)
            break
          case 'copy':
              console.log(data)
            break
          default:
            break
        }
      },
      renameFileSubmit(oldName) {
        let renameParams = {'parent_dir':this.currentPath, 'old_name':oldName, 'new_name':this.newFileName}
        this.$api.post('/api/file/rename', renameParams, r => {
          this.renameFormVisible = false
          console.log(r)
          this.refreshFileList()
        })
      },
      handleShare(index, row) {
        console.log(index)
        console.log(row)
      },
      changeFile(event) {
        var file = event.target.files[0]
        console.log(file)

        //获取上传链接
        this.$http.get("api/api/file/get_tmp_upload_link", {params:{"path":this.currentPath}}).then((response) => {
          console.log(response)
          let data = response.data
          let link = data['link']
          console.log(link)
          link = 'api' + link

          let formData = new FormData()
          formData.append('file', file)
          this.$http.post(link, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            console.log(response)
            let data = response.data
            let files = data.files
            for (let index = 0; index < files.length; index++) {
              let obj = {}
              obj['name'] = files[index]['Name']
              obj['size'] = this.formatSize(files[index]['Size'])
              obj['mtime'] = files[index]['MtimeRelative']
              obj['type'] = files[index]['Type']
              this.filelist.push(obj)
            }
          }, (response) => {
            console.error(response)
          })

        }, (response) => {
          console.error(response)
        })
      },
      handleDownload(index, row) {
        console.log("下载文件")
        console.log(row)
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
      },
      deleteConfirm(index, row) {
        let filename = row.name
        let tp = row.type
        let content = ""
        if (tp === "dir") {
          content = "此操作将删除目录" + filename + ",是否继续？"
        }else {
          content = "此操作将删除文件" + filename + ",是否继续？"
        }
        this.$confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('api/api/file/delete', {params:{"p":this.currentPath + filename}}).then((response) => {
            console.log(response)
            this.filelist = this.filelist.filter(function(i){ return i.name != filename })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }, (response) => {
            console.error(response)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleDelete(index, row) {
        console.log(row)
        this.deleteConfirm(index, row)
      },
      showFileList() {
        let dir_path = this.currentPath
        let params = {"path":dir_path}
        this.$api.get('/api/files', params, response => {
          let files = response.files
          for (let index = 0; index < files.length; index++) {
            let obj = {}
            obj['name'] = files[index]['Name']
            obj['size'] = this.formatSize(files[index]['Size'])
            obj['mtime'] = files[index]['MtimeRelative']
            obj['type'] = files[index]['Type']
            this.filelist.push(obj)
          }
        })
      },
      refreshFileList() {
        this.filelist = []
        this.showFileList()
      }
    },
    mounted() {
      this.showFileList()
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