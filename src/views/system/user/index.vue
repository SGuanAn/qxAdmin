<template>
  <div class="head-container">
    <!-- 头部搜索 新增加 -->
    <v-search :keyword.sync='searchVal' @searchVal='getUserList' />
    <!--表格渲染-->
    <el-table ref="userList" :data="userList" fit v-loading="listLoading" style="width: 100%;margin-top:30px;" >
      <el-table-column type="index" label="序号" width="100px"/>
      <el-table-column prop="username" label="登录账号" />
      <el-table-column prop="usernames" label="用户姓名" />
      <el-table-column prop="usernames" label="用户角色" >
        <template slot-scope="scope">
          <el-tag> {{ scope.row.roleName }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="账号状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state === 1">已激活</el-tag>
          <el-tag type="info" v-if="scope.row.state === 2">已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="用户电话" />
      <el-table-column prop="email" label="用户邮箱" />
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <edit v-permission="['ADMIN', 'USER_EDIT']" :data="scope.row" :sup_this="sup_this" />
          <el-button v-permission="['ADMIN', 'USER_DELETE']" size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getUserList" />
  </div>
</template>

<script>
import permission from '@/directive/permission/index' // 权限判断指令
import VSearch from './module/header'
import edit from './module/edit'
import { getUsers, deleteUser } from '@/api/user'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination'

export default {
  components:{ VSearch, Pagination, edit },
  directives: { permission },
  data() {
    return {
      searchVal:'',
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      sup_this: this,
      userList:[]
    }
  },
  methods: {
    parseTime,
    getUserList(){
      this.listLoading = true
      this.listQuery.keyWord = this.searchVal
      this.listQuery = Object.assign({}, this.listQuery)
      getUsers(this.listQuery).then(res => {
        this.userList = res.data
        this.total = res.total
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    handleDelete({ $index, row }) {
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        deleteUser(row.id).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserList();
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
    this.getUserList();
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
