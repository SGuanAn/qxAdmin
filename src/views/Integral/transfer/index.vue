<template>
    <div class="head-container">
        <!-- 头部搜索 -->
        <v-header :sup_this="sup_this" :RowArr.sync='idArr' :keyWord.sync='searchVal' @searchVal='getAll' />
        <!--表格渲染-->
        <el-table ref="tableData" tooltip-effect="dark" :data="tableData" border v-loading="listLoading" style="margin-top:30px;" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="30" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="phone" label="手机号码" />
            <el-table-column prop="IDNumber" label="证件号" width="180" />
            <el-table-column prop="Sdeclare" label="申报方式" />
            <el-table-column prop="Audit" label="审核方式" />
            <el-table-column prop="progress" label="工作进度" />
            <el-table-column prop="Entrance" label="申报窗口" />
            <el-table-column prop="belong" label="归属用户" />
            <el-table-column prop="Founder" label="创建人" />
            <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="操作时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.updateTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200px;">
                <template slot-scope="scope">
                    <see v-permission="['ADMIN', 'BUSINESS_SEE']" :data="scope.row" :sup_this="sup_this" />
                    <edit v-permission="['ADMIN', 'BUSINESS_EDIT']" :data="scope.row" :sup_this="sup_this" />
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
import { TransferList } from '@/api/Integral'
import { mapGetters } from 'vuex'
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
            idArr:[],
            searchVal:{},
            total: 1,
            listQuery: {
                page: 1,
                limit: 20,
            },
        }
    },
    created(){
        this.getAll()
    },
    methods:{
        parseTime,
        deleteEmptyProperty,
        getAll(){
            this.listLoading = true
            this.listQuery.searchVal = deleteEmptyProperty(this.searchVal)
            this.listQuery.username = this.user.usernames
            TransferList(this.listQuery).then(res => {
                this.tableData = res.data
                this.total = res.total
                setTimeout(() => {
                    this.listLoading = false
                }, 500)
            })
        },
        handleSelectionChange(val){
            this.idArr = val
        },
    },
    computed:{
        ...mapGetters([
        'user'
      ])
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