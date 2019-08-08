<template>
    <div class="dialo">
        <el-dialog :visible.sync="dialog" :close-on-click-modal='false' :title="isAdd ? '新建文件夹' : '重命名'" >
            <div style="margin:15px 0;">
                <span>请输入文件夹名</span>
            </div>
            <el-form ref="form" :model="form" size="small">
                <el-form-item prop="fileName">
                    <el-input v-model="form.fileName" clearable />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancel">取消</el-button>
                <el-button :loading="loading" type="primary" size="mini" @click="doSubmit" >确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createFolder } from '@/api/File'
import { mapGetters } from 'vuex'

    export default {
        data() {
            return{
               dialog: false,
               loading: false, 
               form:{
                   fileName: ''
               }
            }
        },
        props: {
            isAdd: {
                type: Boolean,
                required: true
            },
            sup_this: {
                type: Object,
                default: null
            }
        },
        computed:{
            ...mapGetters([
                'FILE_PATH'
            ]),
        },
        methods:{
            cancel() {
                this.resetForm()
            },
            doSubmit(){
                this.$refs['form'].validate((value) => {
                    if(value){
                        if (this.isAdd) {
                            this.doAdd()
                        }else {
                            this.doEdit()
                        }
                    } else {
                        return false;
                    }
                })
            },
            doAdd(){
                this.form.path = this.FILE_PATH
                let fileData = this.sup_this._data.tableData
                for( let i=0; i<fileData.length; i++) {
                    if(fileData.length !== 0 && fileData[i].name === this.form.fileName){
                        this.$notify({
                            title: '文件已存在',
                            type: 'warning',
                            duration: 2500
                        });
                        return false;
                    }
                }
                createFolder(this.form).then(res => {
                    if(res.code === 200) {
                        this.loading = true
                        this.resetForm()
                        this.$notify({
                            title: res.msg,
                            type: 'success',
                            duration: 2500
                        })
                        this.loading = false
                    } else {
                        this.$notify({
                            title: res.msg,
                            type: 'error',
                            duration: 2500
                        })
                    }
                    this.sup_this.getFileList(this.FILE_PATH)
                })
            },
            resetForm() {
                this.dialog = false
                this.$refs['form'].resetFields()
            }
        }
    }
</script>

<style lang="scss" scoped>
.dialo{
    /deep/ .el-dialog{
        margin-top: 30vh !important;
        width:420px;
    }
    /deep/ .el-dialog__body{
        padding: 0 20px;
    }
    /deep/ .el-form-item{
        margin-bottom: 0;
    }
}
    

</style>
