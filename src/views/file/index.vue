<template>
    <div class="head-container">
      <!-- 头部 -->
      <v-header :sup_this="sup_this"  @searchVal='getVal' />
      <!--表格渲染-->
      <el-table :data="tableData" height='600' v-loading="listLoading" :default-sort = "{ prop: 'gmtModified', order: 'descending' }">
        <el-table-column sortable prop="name" label="文件名" min-width="54" >
          <template slot-scope="scope">
              <FileIcon :type="scope.row.type"></FileIcon>
              <a href='javaccript:;' class='file-name' @click="getFileList(scope.row.path)"  v-if="scope.row.type === 'folder'">
                {{ scope.row.name }}
              </a>
              <a class="file-name" :href=" '/' + FILE_PATH + '/' + scope.row.name" target="_blank" v-else>
                  {{scope.row.name}}
              </a>
          </template>
        </el-table-column>
        <el-table-column sortable prop="size" :formatter="formatterSize" label="大小" min-width="22" />
        <el-table-column sortable prop="gmtModified" label="修改日期" min-width="22" >
          <template slot-scope="scope">
              <span>{{ parseTime(scope.row.gmtModified) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="22">
            <template slot-scope="scope">
                <FileOperation :scope="scope" />
            </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import VHeader from './module/header'
import FileIcon from './module/FileIcon'
import { getAll } from '@/api/File'
import { mapGetters } from 'vuex'
import FileOperation from './module/FileOperation'
import { parseTime, formatterFileSize } from '@/utils/index'

export default {
  components: { VHeader, FileIcon, FileOperation },
  data() {
    return{
      tableData: [],
      sup_this:this,
      listLoading: false,
      path:'upload/file' 
    }
  },
  created(){
    this.FileList();
  },
  computed:{
    ...mapGetters([
        'FILE_PATH'
    ]),
  },
  methods:{
    parseTime,
    FileList(){
      this.listLoading = true
      getAll({path: this.path}).then(res => {
        this.tableData = res
        this.listLoading = false
      })
    },
    getFileList(path){
      this.listLoading = true
      this.$store.commit('SET_FILE_PATH', path)
      getAll({path: path}).then(res => {
        this.tableData = res
        this.tableData = res
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    formatterSize (row){
        if (row.type === 'folder'){
            return '-'
        }
        return formatterFileSize(row.size)
    },
    //搜索
    getVal(val){
      var list = [];
      this.listLoading = true
      if(val !== ''){
          this.tableData.forEach(item => {
          if(item.name.indexOf(val) > -1){
            list.push(item)
          } else if(val === '') {
            list = [];
          }
        })
        this.tableData = list
      } else {
        this.getFileList(this.FILE_PATH);
      }
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    }
  }
}
</script>

<style lang='scss' scoped>
.head {
  &-container {
    padding: 30px;
    min-width: 1200px;

    .file-name{
      display: inline-block; 
      padding-left: 5px;
      padding-top: 2px;
      text-decoration: none;
      color: #000;
      cursor: pointer;
      position:absolute;
    }
    .file-name:hover{
        color: #3794ff;
    }
    .file_table{
        overflow: auto;
        height: 600px;
    }
  }
}
</style>
