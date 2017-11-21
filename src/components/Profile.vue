<template>
  <div style="margin:0 auto; width:400px;">
    <el-form ref="form" :model="form" label-width="100px">
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
      }
    },
    mounted () {
      this.getProfile()
    }
  }
</script>

<style>
  .hi {
    color: red;
    font-size: 20px;
  }
</style>
