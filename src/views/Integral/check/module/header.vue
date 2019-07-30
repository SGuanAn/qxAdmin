<template>
  <div class="search-container">
    <!-- 搜索 -->
    <el-row>
        <el-input v-model="formInline.Founder" style="width: 190px;" size="mini" clearable placeholder="搜索关键字" />
        
        <el-button type="success" size="mini" @click="onSubmit" icon="el-icon-search">搜索</el-button>
        <!-- 导出 -->
        <div style="display: inline-block;">
          <el-button
              v-permission="['ADMIN', 'BUSINESS_EXPORT']"
              :loading="downloadLoading"
              size="mini"
              class="filter-item"
              type="warning"
              icon="el-icon-download"
              @click="download">导出</el-button>
        </div>
        <!-- 步骤 -->
        <div style="display: inline-block;">
          <el-button
              size="mini"
              class="filter-item"
              type="primary"
              icon="el-icon-tickets"
              @click="step">已体检</el-button>
        </div>
        <!-- 转出 -->
        <div style="display: inline-block;">
          <el-popover v-model="visible" title="选择用户" placement="right" width="200" trigger="manual">
            <div>
              <el-select v-model="username" style="width:100%;" size="mini" clearable placeholder="选择用户">
                <el-option
                  v-for="item in userData"
                  :key="item.usernames"
                  :label="item.usernames"
                  :value="item.usernames">
                </el-option>
            </el-select>
            <div class="popover-footer">
                <el-button type="text" @click="visible = false" size="mini">取消</el-button>
                <el-button type="primary" @click="doSubmit" size="mini">确认</el-button>
            </div>
            </div>
            <el-button
            class="filter-item"
            icon="el-icon-share"
            size="mini"
            type="danger"
            slot="reference"
            @click="distribution">转出</el-button>
          </el-popover>
        </div>
        <!-- 退费 -->
        <div style="display: inline-block;">
          <el-button
          type="danger"
          size="mini"
          @click="Refund"><svg-icon icon-class="refund1" />退费</el-button>
        </div>
    </el-row>
    <el-row style="margin-top:15px">
      <el-select v-model="formInline.Entrance" style="width: 220px;" size="mini" clearable placeholder="申报窗口">
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
import { InspectData, branchData, RefundData } from '@/api/Integral'
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
        visible:false,
        userData:[],
        username:'',
        downloadLoading: false,
        options: jsonData.examineMode,
        options2: jsonData.Entrance
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
      //步骤
      step() {
        var ids = []
        this.RowArr.forEach((data, index) => {
          ids.push(data.id)
        })
        if(ids[0] === undefined){
          this.$notify({
            title: '请选择选择录入数据',
            type: 'warning',
            duration: 2500
          })
        } else {
          this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              InspectData(ids).then(res => {
                if(res.code === 200) {
                  this.$notify({
                    title: res.msg,
                    type: 'success',
                    duration: 2500
                  })
                  this.$parent.getAll();
                }
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
      //转出
      distribution() {
        this.visible = !this.visible
        getAllUsers().then(res => {
          this.userData = res.data
        })
      },
      //转出
      doSubmit(){
        const ids = []
        this.RowArr.forEach((data, index) => {
          ids.push(data.id)
        })
        if(ids[0] === undefined){
          this.$notify({
            title: '请选择数据',
            type: 'warning',
            duration: 2500
          })
        } else if(this.username === '') {
          this.$notify({
            title: '请选择用户',
            type: 'warning',
            duration: 2500
          })
        } else {
          const data = {id: ids, username: this.username}
          branchData(data).then(res => {
            if(res.code === 200){
                this.$notify({
                  title: '操作成功',
                  type: 'success',
                  duration: 2500
                })
                this.$parent.getAll();
            }
            if(res.code === -200) {
              this.$notify({
                title: res.msg,
                type: 'warning',
                duration: 0
              })
            }
          })
          this.visible = false
        }
      },
      //退费
      Refund() {
        const ids = []
        this.RowArr.forEach((data, index) => {
          ids.push(data.id)
        })
        if(ids[0] === undefined){
          this.$notify({
            title: '请选择数据',
            type: 'warning',
            duration: 2500
          })
        } else {
          this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              RefundData(ids).then(res => {
                if(res.code === 200) {
                  this.$notify({
                    title: res.msg,
                    type: 'success',
                    duration: 2500
                  })
                  this.$parent.getAll();
                }
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
              filename: '客户信息'
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
