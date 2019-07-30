<template>
    <div class="head-container">
      <!-- 头部 -->
      <v-header />
      <!--表格渲染-->
      <el-table :data="tableData" :default-sort = "{ prop: 'gmtModified', order: 'descending' }">
        <el-table-column prop="name" label="文件名" min-width="54" >
          <!-- <template slot-scope="scope">
              <FileIcon :type="scope.row.type"></FileIcon>
          </template> -->
        </el-table-column>
        <el-table-column prop="size" label="大小" min-width="22" />
        <el-table-column prop="gmtModified" label="修改日期" min-width="22" />
      </el-table>
    </div>
</template>
<script>
import VHeader from './module/header'
import FileIcon from './module/FileIcon'
import { getAll } from '@/api/File'

export default {
  components: { VHeader, FileIcon },
  data() {
    return{
      tableData: [],
      path:'./upload/file'
    }
  },
  created(){
    this.FileList();
  },
  methods:{
    FileList(){
      getAll({path: this.path}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.head {
  &-container {
    padding: 30px;
    min-width: 1200px;
  }
}
</style>
