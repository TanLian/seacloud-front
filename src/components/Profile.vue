<template>
  <div style="margin:0 auto; width:400px;">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="api/api/avatar/upload"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="密码" style="text-align:left">
        <label>******</label>
        <a href="#" @click.prevent="changePWFormVisible=true">修改</a>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入您的个性签名"
          v-model="form.motto">
        </el-input>
      </el-form-item>

      <el-form-item label="关于我">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入关于您的一些信息"
          v-model="form.intro">
        </el-input>
      </el-form-item>

      <el-form-item label="部门">
        <el-input v-model="form.depart"></el-input>
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="form.tele"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="修改密码" :visible.sync="changePWFormVisible">
      <el-form status-icon  :rules="rules" ref="ruleForm" :model="changePWForm">
        <el-form-item :label-width="formLabelWidth" prop="passwd">
          <el-input type="password" v-model="changePWForm.current_pw" auto-complete="off" placeholder="请输入当前密码"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" prop="newpasswd">
          <el-input type="password" v-model="changePWForm.new_pw" auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" prop="confirm_newpass">
          <el-input type="password" v-model="changePWForm.confirm_new_pw" auto-complete="off" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePWFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChangePw('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          motto: '',
          intro: '',
          depart: '',
          tele: ''
        },
        imageUrl: '',
        changePWFormVisible: false,
        formLabelWidth: '60px',
        changePWForm: {
          current_pw: '',
          new_pw: '',
          confirm_new_pw: ''
        },
        ruleForm: {
          passwd: '',
          newpasswd: '',
          confirm_newpass: ''
        },
        rules: {
          passwd : [
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          newpasswd : [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirm_newpass : [
            { required: true, message: '确认密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        this.$api.post('/api/profile/post', this.form, r => {
        })
      },
      getProfile() {
        this.$api.get('/api/profile/get', {}, response => {
          this.form = response
        })
      },
      getAvatar() {
        this.$api.get('/api/avatar/get', {}, response => {
          this.imageUrl = "data:image/png;base64," + response.data
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitChangePw(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            if (this.changePWForm.new_pw !== this.changePWForm.confirm_new_pw) {
              console.log('两次密码不一致')
              return
            }
            let changepwParams = {
              'password':this.changePWForm.current_pw, 
              'new_password':this.changePWForm.new_pw,
              'confirm_password':this.changePWForm.confirm_new_pw
            }
            this.$api.post('/api/user/changepw', changepwParams, r => {
              //this.renameFormVisible = false
              console.log(r)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      }
    },
    mounted () {
      this.getProfile()
      this.getAvatar()
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
