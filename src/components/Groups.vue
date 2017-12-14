<template>
  <div>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="群组名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
          <el-button type="primary" @click="newGroupFormVisible = true">添加群组</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <el-dialog title="新建群组" :visible.sync="newGroupFormVisible">
      <el-form status-icon :model="newGroupForm">
        <el-form-item prop="groupname">
          <el-input type="text" v-model="newGroupForm.groupname" auto-complete="off" placeholder="请输入群组名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newGroupFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewGroup">确 定</el-button>
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
      newGroupFormVisible: false,
      newGroupForm: {
        groupname: ''
      },
      users: []
    }
  },
  methods: {
    submitNewGroup() {
      this.$api.post('/api/group/new', this.newGroupForm, r => {
      })
    }/*,
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
    }*/
  },
  mounted () {
    //this.getAllUsers()
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
