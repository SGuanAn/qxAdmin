<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            <i class="el-icon-more operation"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="rename" v-permission="['ADMIN', 'FILE_RENAME']">重命名</el-dropdown-item>
            <el-dropdown-item v-if="scope.row.type !== 'folder'">
                <a :href=" '/' + FILE_PATH + '/' + scope.row.name" :download="scope.row.name" >下载</a>
            </el-dropdown-item>
            <el-dropdown-item @click.native="deleteResource" v-permission="['ADMIN', 'FILE_DELETE']">删除</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { renameFile, deleteFile } from '@/api/File'
import permission from '@/directive/permission/index' // 权限判断指令
import { mapGetters } from 'vuex'

export default {
    directives: { permission },
    props: ['scope'],
    data () {
        return {
        }
    },
    computed:{
        ...mapGetters([
            'FILE_PATH'
        ]),
    },
    methods: {
        rename (){
            // TODO 文件名校验
            this.$prompt('请输入新的文件名', '重新命名', {
                closeOnClickModal: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: this.scope.row.name
                
            }).then(({value}) => {
                let fileData = this.$parent.$parent.tableData
                for( let i=0; i<fileData.length; i++) {
                    if(fileData.length !== 0 && fileData[i].name === value){
                        this.$notify({
                            title: '文件已存在',
                            type: 'warning',
                            duration: 2500
                        });
                        return false;
                    }
                }
                renameFile( this.FILE_PATH, this.scope.row.name, value).then(res => {
                    if(res.code === 200) {
                        this.$notify({
                            title: res.msg,
                            type: 'success',
                            duration: 2500
                        })
                    }
                   this.$parent.$parent.$parent.getFileList(this.FILE_PATH)
                })
            }).catch(() => {})
        },
        deleteResource () {
            this.$confirm('是否确定要删除该文件？', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteFile(this.scope.row.path).then(res => {
                    if(res.code === 200) {
                        this.$notify({
                            title: res.msg,
                            type: 'success',
                            duration: 2500
                        })
                    }
                   this.$parent.$parent.$parent.getFileList(this.FILE_PATH)
                })
            }).catch(() => {});
        }
    }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>
