<template>
  <el-form @keyup.enter.native="userLogin" :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="demo-ruleForm login-form">
    <h3 class="title">用户登录</h3>
    <el-form-item prop="username">
      <el-input v-model="formLabelAlign.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="formLabelAlign.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="userLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data () {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          username: '',
          password: ''
        },
        checked: false
      }
    },
    methods: {
      userLogin () {
        let params = {username:this.formLabelAlign.username, password:this.formLabelAlign.password} 
        this.$api.post('/user/login', params, r => {
          this.$router.push({name: 'MyFile'})
        })
      },
      getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
      },
      alreadyLogin() {
        let logined = false
        let params = {token:this.getCookie('Authorization')} 
        this.$api.post('/api/is_user_login/', params, r => {
          this.$router.push({name: 'MyFile'})
        })
      }
    },
    mounted () { 
      this.alreadyLogin()
    }
  }
</script>

<style lang="scss" scoped>
  .login-form {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>