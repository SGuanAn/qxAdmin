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
