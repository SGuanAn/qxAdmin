<template>
    <div class="file-header">
        <el-row>
            <el-input v-model="Founder" style="width: 190px;" size="mini" clearable placeholder="搜索关键字" />
            <el-button type="success" size="mini" @click="onSubmit" icon="el-icon-search">搜索</el-button>
            <el-upload
                action="string"
                :show-file-list="false"
                :http-request="uploadFile"
                multiple
                :before-upload="beforeAvatarUpload"
                accept="image/jpeg,image/gif,image/png,text/plain,application/pdf" 
                style="display: inline-block;">
                <el-button type="primary" size="mini" icon="el-icon-upload">上传文件</el-button>
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
        uploadFile(params){
            var formData = new FormData();
            params.file.filePath = this.FILE_PATH
            formData.append("file", params.file);
            formData.append("filePath", this.FILE_PATH);
            uploadData(formData).then(res => {
                if(res.code === 200) {
                    this.$notify({
                        title: res.msg,
                        type: 'success',
                        duration: 2500
                    })
                }
                this.sup_this.getFileList(this.FILE_PATH)
            })
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
        display:none
    }
}
</style>
