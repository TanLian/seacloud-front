<template>
  <div>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
          <el-button type="primary" @click="newUserFormVisible = true">添加用户</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <ul class="userlist">
      <li v-for="user in users" class="user">
        <el-tooltip placement="top">
          <div slot="content">
            格言：{{ user['motto'] }} <br>
            关于：{{ user['intro'] }} <br>
            部门：{{ user['depart'] }} <br>
            电话：{{ user['tele'] }} <br>
          </div>
          <img :src="user['avatar']" class="avatar">
        </el-tooltip>
        <div>{{ user['username'] }}</div>
      </li>
		</ul>

    <el-dialog title="新建用户" :visible.sync="newUserFormVisible">
      <el-form status-icon ref="ruleForm" :model="newUserForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="newUserForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="newUserForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="is_admin">
          <el-checkbox v-model="newUserForm.is_admin">添加为管理员</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filters: {
				name: ''
      },
      newUserFormVisible: false,
      newUserForm: {
        username: '',
        password: '',
        is_admin: false
      },
      users: []
    }
  },
  methods: {
    submitNewUser() {
      let params = this.newUserForm
      params['source'] = 'local'
      this.$api.post('/api/user/add', params, r => {
      })
    },
    getAllUsers() {
      this.$api.get('/api/user/getallusers', {}, r => {
        for (let user of r.userlist) {
          let obj = {}
          obj['username'] = user['UserName']
          obj['avatar'] = "data:image/png;base64," + user['Avatar']
          obj['depart'] = user['Depart']
          obj['intro'] = user['Intro']
          obj['tele'] = user['Tele']
          obj['motto'] = user['Motto']
          this.users.push(obj)
        }
      })
    }
  },
  mounted () {
    this.getAllUsers()
  }
}
</script>
<style lang="scss" scoped>
.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
  text-align: left;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.userlist {
  list-style: none;

  .user {
    width: 140px;
    height: 90px;
    margin-top: 20px;
    display: inline-block;
    float: left;

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 1000px;
    }
  }
}
</style>
