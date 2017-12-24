<template>
  <section>
      <el-row type="flex" class="row-bg" justify="start" style="margin-bottom:10px;border-bottom:1px solid #e5e5e5;height:60px;">
        <el-col :span="6" class="toolbar" style="padding-bottom: 0px; padding-top:5px;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{name: 'MyFile', query:{p: '/'} }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in dirArr" :to="{name: 'MyFile', query:{p: item.to} }" :key="item.to">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6" class="toolbar" style="">
          <div class="upload-file-btn">
            <div class="upload-div">上传<i class="el-icon-upload el-icon--right"></i></div>
            <input type="file" class="upload-input" name="file" multiple @change="changeFile($event)">
          </div>
          <el-dropdown class="new-btn" @command="handleNew">
            <el-button type="text">
              新建<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="new-file"><svg-icon id="icon-wenjian1" class="new-file"></svg-icon><label>新建文件</label></el-dropdown-item>
              <el-dropdown-item command="new-dir"><svg-icon id="icon-muluwenjianjia" class="new-file"></svg-icon><label>新建目录</label></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
              <router-link v-if="scope.row.type=='dir'" :to="{name: 'MyFile', query:{p: currentPath + scope.row.name + '/'} }">{{scope.row.name}}</router-link>
              <a v-else href="#" @click.prevent="handleClickFile(scope.$index,scope.row)">{{scope.row.name}}</a>
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
              <a href="#" @click.prevent="handleDownload(scope.$index, scope.row)">
                <i class="fa fa-download"></i>
              </a>
              <a href="#" @click.prevent="handleDelete(scope.$index, scope.row)">
                <i class="fa fa-trash-o fa-lg"></i>
              </a>
              <a href="#" @click.prevent="handleStar(scope.$index, scope.row)">
                <!--<i class="el-icon-star-off"></i>-->
                <i :class="scope.row.starred ? 'fa fa-star fa-lg' : 'fa fa-star-o fa-lg'"></i>
              </a>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="rename" :filename="scope.row.name">
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
    <el-dialog title="重命名文件" size="tiny" :visible.sync="renameFormVisible">
      <el-form :model="renameForm">
        <p>重命名<b>{{renameForm.name}}</b>为：</p>
        <el-input v-model="newFileName" auto-complete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click.native="renameFileSubmit(renameForm.name)">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import Common from '@/mixin/common.js'
  import { codemirror } from 'vue-codemirror-lite'

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
        newFileName: '',
        dirArr: [],
        code: 'const str = "hello world"'
      }
    },
    mixins: [Common],
    methods: {
      handleClickFile(index, row) {
        let filename = row.name
        console.log(filename)
        let suffix = this.getSuffix(filename)
        console.log(suffix)
        switch (suffix) {
          case '.pdf':
            this.$router.push({name: 'PdfViewer', query: {dir: this.currentPath, file:filename}})
            break
          case '.mp4':
            this.$router.push({name: 'VideoViewer', query: {dir: this.currentPath, file:filename}})
            break
          case '.txt':
            this.$router.push({name: 'TextViewer', query: {dir: this.currentPath, file:filename}})
            break
          case '.jpeg':
          case '.jpg':
          case '.png':
          case '.gif':
            this.$router.push({name: 'ImageViewer', query: {dir: this.currentPath, file:filename}})
            break
          default:
            break
        }
      },
      handleNew(command) {
        console.log(command)
        switch (command) {
          case 'new-file':
            this.newFile()
            break;
          case 'new-dir':
            this.newDir()
            break
          default:
            break
        }
      },
      newFile() {
        this.$prompt('请输入文件名称', '新建文件', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          //inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          console.log(value)
          let renameParams = {'parent_dir':this.currentPath, 'name':value}
          this.$api.post('/api/file/new', renameParams, r => {
            //this.renameFormVisible = false
            console.log(r)
            this.refreshFileList()
          })
        }).catch(() => {});
      },
      newDir() {
        this.$prompt('请输入目录名称', '新建目录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          //inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          console.log(value)
          let renameParams = {'parent_dir':this.currentPath, 'name':value}
          this.$api.post('/api/dir/new', renameParams, r => {
            //this.renameFormVisible = false
            console.log(r)
            this.refreshFileList()
          })
        }).catch(() => {});
      },
      handleCommand(command, comp) {
        console.log(command)
        let filename = comp.$attrs.filename
        console.log(filename)
        switch (command) {
          case 'rename':
              let obj = {'name':filename}
              this.renameFormVisible = true
              this.renameForm = obj
              this.newFileName = filename
            break
          case 'move':
            break
          case 'copy':
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
              obj['starred'] = files[index]['Starred']
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
          this.$http.get('api/api/file/delete', {params:{"p":this.currentPath + '/' + filename}}).then((response) => {
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
            obj['starred'] = files[index]['Starred']
            this.filelist.push(obj)
          }
        }, response => {
          if (response.error === "not login") {
            this.$router.push({name: 'Login'})
          }
        })
      },
      refreshFileList() {
        this.filelist = []
        this.showFileList()
      },
      updateDirArr() {
        this.dirArr = []
        let pArr = this.currentPath.split('/')
        //去掉空白字符
        pArr = pArr.filter(function(item){
          return item != ''
        })
        let tmpDir = ''
        for (let i = 0; i < pArr.length; i++) {
          tmpDir += pArr[i] + '/'
          let item = {}
          item['name'] = pArr[i]
          item['to'] = tmpDir
          this.dirArr.push(item)
        }
      },
      handleStar(index, row) {
        let params = {'parent_dir':this.currentPath, 'name':row.name}
        this.$api.post('/api/files/favorites/add', params, r => {
          console.log(r)
          this.refreshFileList()
        })
      }
    },
    mounted() {
      this.showFileList()
      this.updateDirArr()
    },
    beforeRouteUpdate (to, from, next) {
      let parent_dir = to.query.p
      this.currentPath = parent_dir
      this.updateDirArr()
      this.refreshFileList()
      next()
    },
    components: {
      codemirror
    }
  }
</script>

<style lang="scss" scoped>
  .upload-file-btn {
    position: relative;
    display: inline-block;
    .upload-div {
        width: 100px;
        height: 36px;
        background: #2178fc;
        color: #fff;
        text-align: center;
        line-height: 36px;
    }
    .upload-input {
      width: 200px;/*因为file-input在部分浏览器中会自带一个输入框，需要双击才可以点击上传,放大后将其定位到div外面就好啦*/
        height: 36px;
        position: absolute;
        left: -100px;
        top: 0;
        z-index:1;
        -moz-opacity: 0;
        -ms-opacity: 0;
        -webkit-opacity: 0;
        opacity: 0;  /*css属性——opcity不透明度，取值0-1*/
        filter: alpha(opacity=0); /*兼容IE8及以下--filter属性是IE特有的，它还有很多其它滤镜效果，而filter: alpha(opacity=0); 兼容IE8及以下的IE浏览器(如果你的电脑IE是8以下的版本，使用某些效果是可能会有一个允许ActiveX的提示,注意点一下就ok啦)*/
        cursor: pointer;
    }
  }
  .new-file {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
</style>