<template>
  <div class="search-container">
    <!-- 搜索 -->
    <el-row>
        <el-input v-model="formInline.Founder" style="width: 190px;" size="mini" clearable placeholder="搜索关键字" />
        
        <el-button type="success" size="mini" @click="onSubmit" icon="el-icon-search">搜索</el-button>
        <!-- 领取 -->
        <div style="display: inline-block;">
          <el-button
            class="filter-item"
            size="mini"
            type="warning"
            icon="el-icon-plus"
            @click="Receive">领取</el-button>
        </div>
        <!-- 分配 -->
        <div style="display: inline-block;">
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-share"
            @click="Receive">分配</el-button>
        </div>
        <!-- 新增 -->
        <div v-permission="['ADMIN', 'GUANGKAI_ADD']" style="display: inline-block;margin: 0px 2px;">
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
            v-permission="['ADMIN', 'GUANGKAI_EXPORT']"
            :loading="downloadLoading"
            size="mini"
            class="filter-item"
            type="warning"
            icon="el-icon-download"
            @click="download">导出</el-button>
        </div>
        <!-- 导入 -->
        <div style="display: inline-block;">
        <upload-excel-component 
        v-permission="['ADMIN', 'GUANGKAI_UPLOAD']"
        :on-success="handleSuccess"
        :before-upload="beforeUpload" />
        </div>
        <el-button v-permission="['ADMIN', 'GUANGKAI_DELETE']" type="danger" size="mini" @click="handleDelete" icon="el-icon-delete">删除</el-button>
    </el-row>
    <el-row style="margin-top:15px">
      <el-select v-model="Audit" size="mini" multiple collapse-tags placeholder="审核方式">
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="Entrance" style="width: 220px;" size="mini" multiple collapse-tags placeholder="申报窗口">
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
import { deleteGuangk } from '@/api/student'
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
        Audit:[],
        Entrance: [],
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
        this.$emit('searchVal', this.formInline)
      },
      handleDelete(){
        var ids = []
        this.RowArr.forEach((data, index) => {
          ids.push(data.id)
        })
        if(ids[0] === undefined){
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
                deleteGuangk(ids).then(res => {
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
      //领取
      Receive() {},
      //分配
      distribution() {},
      //导出
      download() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
              const tHeader = [
                '姓名',
                '性别',
                '手机号',
                '固定电话',
                '邮箱',
                '证件类型',
                '身份证号',
                '报读类型',
                '在职情况',
                '婚姻状况',
                '缴纳学费',
                '已缴学费',
                '未缴学费',
                '工作单位',
                '户口所在地',
                '详细地址',
                '创建人',
                '创建时间'

              ]
              const filterVal = [
                'name',
                'Gender',
                'phone',
                'tel',
                'email',
                'DocumentType',
                'DocumentNumber',
                'StudentCategory',
                'WorkingState',
                'MaritalStatus',
                'TuitionFeeSoure',
                'PayTuition',
                'UnpaidTuition',
                'CompanyName',
                'HouseholdCity',
                'HouseholdArea',
                'Founder',
                'createTime'
              ]
              const data = this.formatJson(filterVal, this.sup_this.$data.tableData)
              excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: '学员列表'
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
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      var time = parseTime( new Date() )
      results.forEach(data => {
        data['创建人'] = this.user.usernames
        data['创建时间'] = time
      })
    }
  }
}
</script>
<style lang="scss" scoped>

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
