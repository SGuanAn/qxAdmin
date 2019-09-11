<template>
    <div class="head-container">
        <!-- 头部搜索 -->
        <v-header :sup_this="sup_this" :RowArr.sync='idArr' :keyWord.sync='searchVal' @searchVal='getAll' />
        <!--表格渲染-->
        <el-table ref="tableData" tooltip-effect="dark" :data="tableData" border v-loading="listLoading" style="margin-top:30px;" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="30" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="IDNumber" label="证件号" width="180" />
            <el-table-column prop="promote" label="层次" />
            <el-table-column prop="Enrolment" label="报读院校" />
            <el-table-column prop="Types_type" label="报读类型" />
            <el-table-column prop="major_enrollment" label="报读专业" />
            <el-table-column prop="batch" label="批次" />
            <el-table-column prop="Total" label="总学费" />
            <el-table-column prop="Unpaid" label="未缴" />
            <el-table-column prop="Payment_status" label="学费情况" />
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="录入时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200px;">
                <template slot-scope="scope">
                    <see v-permission="['ADMIN', 'LEARN_FORM_SEE']" :data="scope.row" :sup_this="sup_this" />
                    <edit v-permission="['ADMIN', 'LEARN_FORM_EDIT']" :data="scope.row" :sup_this="sup_this" />
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAll" />
    </div>
</template>

<script>
import VHeader from './module/header'
import permission from '@/directive/permission/index' // 权限判断指令
import { getList } from '@/api/learnForm'
import { parseTime, deleteEmptyProperty } from '@/utils/index'
import Pagination from '@/components/Pagination'
import edit from './module/edit'
import see from './module/see'
export default {
    components:{ VHeader, Pagination, edit, see },
    directives: { permission },
    data(){
        return{
            listLoading: false,
            sup_this: this,
            tableData: [],
            searchVal:{},
            idArr:[],
            total: 0,
            listQuery: {
                page: 1,
                limit: 20
            },
        }
    },
    created(){
        // this.getAll()
    },
    methods:{
        parseTime,
        deleteEmptyProperty,
        getAll(){
            this.listLoading = true
            this.listQuery.searchVal = deleteEmptyProperty(this.searchVal)
            getList(this.listQuery).then(res => {
                this.tableData = res.data
                this.total = res.total
                setTimeout(() => {
                    this.listLoading = false
                }, 500)
            })
        },
        handleSelectionChange(row){
            this.idArr = row
        },
    },
}
</script>

<style lang="scss" scoped>
.head {
  &-container {
    padding: 30px;
    min-width: 1200px;
  }
  
}
</style>