<template>
    <div class="dialo">
        <el-dialog :visible.sync="dialog" :title="isAdd ? '新建文件夹' : '重命名'" >
            <div style="margin:15px 0;">
                <span>请输入文件夹名</span>
            </div>
            <el-form ref="fileForm" :model="form" size="small">
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
        },
        methods:{
            cancel() {
                this.resetForm()
            },
            doSubmit(){

            },
            resetForm() {
                this.dialog = false
                this.$refs['fileForm'].resetFields()
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
