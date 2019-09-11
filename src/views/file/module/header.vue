<template>
    <div class="file-header">
        <el-row>
            <el-input v-model="Founder" style="width: 190px;" size="mini" clearable placeholder="搜索关键字" />
            <el-button type="success" size="mini" @click="onSubmit" icon="el-icon-search">搜索</el-button>
            <el-upload
                action="string"
                :show-file-list="show_list"
                :auto-upload="false"
                :on-change="handleChange"
                :before-remove="beforeRemove"
                :file-list="fileList"
                :multiple="true"
                list-type="picture"
                :before-upload="beforeAvatarUpload"
                accept="image/jpeg,image/gif,image/png,text/plain,application/pdf" 
                style="display: inline-block;">
                <el-button slot="trigger" type="primary" size="mini" icon="el-icon-upload">选择文件</el-button>
                <el-button style="margin-left: 0;" size="mini" type="success" @click="submitUpload" 
                 element-loading-background="rgba(0, 0, 0, 0.8)"
                  element-loading-text="上传中...."
                 v-loading.fullscreen="fullscreenLoading">上传到服务器</el-button>
            </el-upload>
            <div style="display: inline-block;">
                <el-button type="primary" size="mini" icon="el-icon-tickets" @click="allFile">全部文件</el-button>
            </div>
            <div style="display: inline-block;">
                <el-button size="mini" icon="el-icon-folder-add" @click="$refs.fileForm.dialog = true">新建文件夹</el-button>
                <eForm ref="fileForm" :sup_this="sup_this" :is-add="true" />
            </div>
        </el-row>
    </div>
</template>

<script>
import eForm from './form'
import { mapGetters } from 'vuex'
import { uploadData } from '@/api/File'
export default {
    components: { eForm },
    data(){
        return {
            ruleForm: this.FILE_PATH,
            Founder:'',
            fullscreenLoading: false,
            fileList:[],
            show_list:false,
            path:'upload/file'
        }
    },
    props:{
        sup_this: {
            type: Object,
            required: true
        },
    },
    computed:{
        ...mapGetters([
            'FILE_PATH',
            'UploadDataApi'
        ]),
    },
    methods: {
        onSubmit() {
            this.$emit('searchVal', this.Founder )
        },
        allFile() {
            this.sup_this.getFileList(this.path)
        },
        submitUpload(){
            if(this.fileList == ''){
                this.$message.error('请上传文件!');
            } else {
                this.fullscreenLoading = true;
                var formData = new FormData();
                const file_list = this.fileList.map(item => ({
                        file: item.raw
                    })
                )
                for(var i in file_list) {
                    formData.append('file', file_list[i].file);
                }
                formData.append("filePath", this.FILE_PATH);
                uploadData(formData).then(res => {
                    if(res.code === 200) {
                        this.$notify({
                            title: res.msg,
                            type: 'success',
                            duration: 2500
                        })
                        this.show_list = false
                        this.fullscreenLoading = false;
                    }
                    this.sup_this.getFileList(this.FILE_PATH)
                    this.fileList = []
                })
            }
        },
        beforeRemove(file, fileList) {
           this.fileList = fileList;
        },
        handleChange(file, fileList){
            this.fileList = fileList;
            this.show_list = true
        },
        beforeAvatarUpload(file){
            if(file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'text/plain' || file.type === 'application/pdf'){
                 return file.type
            } else {
                this.$message.error('此文件格式不允许上传!');
                return false
            }
        }
    },
}
</script>

<style lang='scss' scoped>
.file-header{
    /deep/ .el-upload-list{
        z-index: 999;
        overflow: auto;
        position: fixed;
        right:0;
        bottom: 0;
        width: 500px;
        height: 400px;
        padding: 30px;
        background: #fff;
    }
     /deep/ .el-upload-list::-webkit-scrollbar {display:none}
}
</style>
