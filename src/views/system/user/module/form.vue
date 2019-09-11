<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增用户' : '编辑用户'" append-to-body width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="登录账号" prop="username">
        <el-input v-model="form.username" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="用户姓名" prop="usernames">
        <el-input v-model="form.usernames" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="用户电话" prop="phone" >
        <el-input v-model.number="form.phone" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="用户状态" prop="email">
        <el-radio-group v-model="form.state">
          <el-radio :label="1">激活</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户权限">
        <el-select v-model="roleId" style="width: 300px;" :closable='true' placeholder="请选择权限" >
          <el-option
            v-for="(item, index) in roleName"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="描述信息">
        <el-input v-model="form.introduction" style="width: 300px;" rows="5" type="textarea"/>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils/index'
import { addUser, editUser } from '@/api/user'
import { getRoles } from '@/api/role'

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    const validUser = (rule, value, callback) => {
      if (value) {
         if (/[\u4e00-\u9fa5]/g.test(value)) {
           callback(new Error('不能输入汉字!'));
         } else {
           callback();
         }
       }
       callback();
    }
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      loading: false, dialog: false,
      form: { username: '',usernames: '', introduction: '', avatar:'', name:'', roleId:null, phone: null, email:'',state: 1 },
      roleId:null,
      roleName:[],
      rules: {
        username: [
          { required: true, message: '请输入用户名'},
          { validator: validUser, trigger: 'blur' }
        ],
        usernames: [
          { required: true, message: '请输入用户姓名'},
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        roleId:[
          { required: true, trigger: 'blur', validator: '请选择角色' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ]
      }
    }
  },
  created(){
    this.getRoles();
  },
  methods: {
    parseTime,
    cancel() {
      this.resetForm()
    },
    doSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
          if(this.roleId === null) {
              this.$message({
                message: '角色不能为空',
                type: 'warning'
            })
          }else{
            this.loading = true
            this.form.roleId = this.roleId
            if (this.isAdd) {
              this.doAdd()
            }else this.doEdit()
          }
          } else{
            return false
          }
        }) 
    },
    getRoles() {
      getRoles().then(res => {
        this.roleName = res.data
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    doAdd() {
      const time = Date.now()
      this.form.createTime = time
      addUser(this.form).then(res => {
        if(res.code == 1){
          this.$message({
            message: '用户名已被占用，请重新输入！',
            type: 'warning'
          });
        }
        if(res.code == 200){
          console.log(res)
          this.resetForm()
          this.$notify({
            title: '添加成功',
            message: '默认密码：123456，请自行修改',
            type: 'success',
            duration: 2500
          })
        }
        this.loading = false
        this.$parent.$parent.getUserList()
      })
    },
    doEdit() {
      editUser(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.getUserList()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { username: '', introduction: '', roleId:null, name:'' }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>