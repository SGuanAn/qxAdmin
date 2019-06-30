<template>
  <div class="head-container">
    <!-- 头部搜索 新增加 -->
    <v-search :keyword.sync='searchVal' @searchVal='getRole' />
    <!--表格渲染-->
    <el-table ref="roleDatas" :data="roleData" fit v-loading="listLoading" style="width: 100%;margin-top:30px;" >
      <el-table-column type="index" label="序号" align="center" width="100px"/>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="dataScope" label="数据权限" />
      <el-table-column prop="remark" label="描述" />
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="270px" >
        <template slot-scope="scope">
          <edit v-permission="['ADMIN', 'ROLES_EDIT']" :data="scope.row" :sup_this="sup_this" />
          <power v-permission="['ADMIN', 'ROLES_POWER']" :data="scope.row" style="display: inline-block;"/>
          <el-button v-permission="['ADMIN', 'ROLES_DELETE']" size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope)" :disabled="scope.row.id ==1 ? true:false" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getRole" />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import VSearch from './module/header'
import edit from './module/edit'
import power from './module/power'
import { getAll, deleteRole } from '@/api/role'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination'

export default {
  components:{ VSearch, Pagination, edit, power },
  directives: { permission },
  data() {
    return {
      disableds:false,
      searchVal:'',
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      sup_this: this,
      roleData:[]
    }
  },
  methods: {
    parseTime,
    getRole(){
      this.listLoading = true
      this.listQuery.keyWord = this.searchVal
      this.listQuery = Object.assign({}, this.listQuery)
      getAll(this.listQuery).then(res => {
        this.roleData = res.data
        this.total = res.total
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    handleEdit(scope) {
      console.log(scope.row)
    },
    handleDelete({ $index, row }) {
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        deleteRole(row.id).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getRole();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
    },
  },
  created(){
    this.getRole();
  }
}
</script>

<style lang="scss" scoped>
.head {
  &-container {
    padding: 30px;
  }
  
}
</style>
