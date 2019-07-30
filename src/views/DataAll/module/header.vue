<template>
  <div class="search-container">
    <!-- 搜索 -->
    <el-row>
        <el-input v-model="formInline.Founder" style="width: 190px;" size="mini" clearable placeholder="搜索关键字" />
        
        <el-button type="success" size="mini" @click="onSubmit" icon="el-icon-search">搜索</el-button>
      
        <!-- 新增 -->
        <div v-permission="['ADMIN', 'DATAALL_ADD']" style="display: inline-block;margin: 0px 2px;">
          <el-button
              class="filter-item"
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="$refs.form.dialog = true">新增</el-button>
          <eForm ref="form" :sup_this="sup_this" :is-add="true" />
        </div>
        <!-- 导出 -->
        <div style="display: inline-block;">
        <el-button
            v-permission="['ADMIN', 'DATAALL_EXPORT']"
            :loading="downloadLoading"
            size="mini"
            class="filter-item"
            type="warning"
            icon="el-icon-download"
            @click="download">导出</el-button>
        </div>
        <!-- 导入 -->
        <div v-permission="['ADMIN', 'DATAALL_UPLOAD']" style="display: inline-block;">
          <upload-excel-component 
          :on-success="handleSuccess"
          :before-upload="beforeUpload" />
        </div>
        <el-button v-permission="['ADMIN', 'DATAALL_DELETE']" type="danger" size="mini" @click="handleDelete" icon="el-icon-delete">删除</el-button>
    </el-row>
    <el-row style="margin-top:15px">
      <el-select v-model="formInline.Audit" style="width: 150px;" size="mini" clearable placeholder="审核方式">
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <!-- 工作进度 -->
      <el-input v-model="formInline.progress" style="width: 150px;" size="mini" clearable placeholder="工作进度" />
      <!-- 申报方式 -->
      <el-select v-model="formInline.Sdeclare" style="width: 150px;" size="mini" placeholder="申报方式" clearable >
        <el-option
          v-for="item in declareArr"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="formInline.Entrance" style="width: 150px;" size="mini" clearable placeholder="申报窗口">
        <el-option
          v-for="item in options2"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-date-picker
        style="width:240px"
        size="mini"
        v-model="formInline.time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        value-format="yyyy-MM-dd"
        end-placeholder="结束日期" />
    </el-row>
  </div>
</template>

<script>
import jsonData from '@/json/data.json' // 引用json数据
import permission from '@/directive/permission/index.js' // 权限判断指令
import { deleteData, branchData, ImportExcel } from '@/api/Alldata'
import { getAllUsers } from '@/api/user'
import { parseTime } from '@/utils/index'
import { mapGetters } from 'vuex'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import eForm from './form'
import { constants } from 'crypto';
 export default {
    directives: { permission },
    components: { eForm, UploadExcelComponent },
    props: {
    sup_this: {
      type: Object,
      required: true
    },
    keyWord: {
      type: Object,
      required: true
    },
    RowArr: {
      type: Array,
      required: true,
    },
  },
    data() {
      return {
        username:'',
        userData:[],
        visible:false,
        downloadLoading: false,
        options: jsonData.examineMode,
        options2: jsonData.Entrance,
        declareArr: jsonData.Declare
      }
    },
    computed:{
      formInline:{
        get(){
          return this.keyWord
        },
        set(val){
          this.$emit('update:keyWord', val)
        }
      },
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      parseTime,
      onSubmit() {
        this.$emit('searchVal', this.formInline )
      },
      handleDelete(){
        var names = []
        this.RowArr.forEach((data, index) => {
          names.push(
            {
              id: data.id,
              Audit: data.Audit,
              progress: data.progress,
              belong: data.belong
            }
          )
        })
        if(names[0] === undefined){
          this.$notify({
            title: '请选择要删除的数据',
            type: 'warning',
            duration: 2500
          })
        }else{
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteData(names).then(res => {
                  this.$notify({
                    title: '删除成功',
                    type: 'success',
                    duration: 2500
                  })
                this.$parent.getAll();
              })
            }).catch(() => {
              this.$notify({
                type: 'info',
                title: '已取消删除',
                duration: 2500
              });          
          });
        }
      },
      //导出
      download() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
              const tHeader = [
                '姓名',
                '性别',
                '年龄',
                '身份证号',
                '出生日期',
                '民族',
                '婚姻状况',
                '手机号码',
                '职业',
                '详细地址',
                '学历',
                '毕业学校',
                '工作单位',
                '邮箱地址',
                '社保',
                '通讯地址',
                '小孩随迁数',
                '人保账号',
                '人保密码',
                '总费用',
                '已缴纳',
                '未缴',
                '来源',
                '审核方式',
                '申报窗口',
                '付款方式',
                '申报方式',
                '工作进度',
                '备注',
                '专业',
                '迁移地',
                '学信网账户',
                '学信网密码'

              ]
              const filterVal = [
                'name',
                'Gender',
                'age',
                'IDNumber',
                'BirthDate',
                'Nation',
                'Marriage',
                'phone',
                'Occupation',
                'detailed',
                'learn',
                'graduation',
                'Company',
                'email',
                'social',
                'address',
                'Children',
                'Account',
                'AccountPassword',
                'Total',
                'Pay',
                'Unpaid',
                'source',
                'Audit',
                'Entrance',
                'payment',
                'Sdeclare',
                'progress',
                'Remarks',
                'major',
                'Immigration',
                'XueXin',
                'XueXinPassword'
              ]
              const data = this.formatJson(filterVal, this.sup_this.$data.tableData)
              excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: '数据列表'
            })
            this.downloadLoading = false
        })
      },
      // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime') {
          return parseTime(v[j])
        }else {
          return v[j]
        }
      }))
    },
    //导入
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 5
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '请不要上载大小超过5M的文件',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      results.map(v => {
        v.创建人 = this.user.usernames
        v.创建时间 = new Date()
        v.手机号码 = String(v.手机号码)
      })
      ImportExcel(results).then(res => {
        if(res.code === 200){
            this.$notify({
              title: '导入成功',
              type: 'success',
              duration: 2500
            })
            this.$parent.getAll();
        } else if (res.code === -1) {
          this.$notify({
            title: res.msg,
            type: 'warning',
            duration: 0
          })
        } else if (res.code === -200) {
          this.$notify({
            title: res.msg,
            type: 'warning',
            duration: 0
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.popover-footer{
  text-align: right;
  margin-top: 10px;
}
.search-container input {
    height: 33px;
    line-height: 33px;
}
.el-range-separator{
    width: 10%;
}

.search-container input {
    height: 33px;
    line-height: 33px;
}
</style>
