<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增角色' : '编辑角色'" :close-on-click-modal='false' append-to-body width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input v-model="form.remark" style="width: 370px;" rows="5" type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils/index'
import { addRole, editRole } from '@/api/role'

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
    return {
      loading: false, dialog: false, depts: [], deptIds: [],
      form: { name: '', depts: [], dataScope:'自定义', remark: '' },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    parseTime,
    cancel() {
      this.resetForm()
    },
    doSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.isAdd) {
              this.doAdd()
            } else this.doEdit()
          } else {
            return false
          }
        }) 
    },
    doAdd() {
      const time = Date.now()
      this.form.createTime = parseTime(time)
      addRole(this.form).then(res => {
        if(res.code == -1){
          this.$message({
            message: '名称已被占用，请重新添加！',
            type: 'warning'
          });
        }
        if(res.code == 200){
          this.resetForm()
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
        }
        this.loading = false
        this.$parent.$parent.getRole()
      })
    },
    doEdit() {
      editRole(this.form).then(res => {
        this.resetForm()
        console.log(res)
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.getRole()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', depts: [], remark: '' }
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        console.log(res.content)
        this.depts = res.content
      })
    },
    changeScope() {
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>