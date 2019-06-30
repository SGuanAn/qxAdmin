<template>
    <div class="dialo">
        <el-dialog :visible.sync="dialog" :title="isAdd ? '添加学生' : '学生信息'" append-to-body >
            <el-form ref="form" :rules="rules" :model="form" size="small">
                <div style="margin-left: 10px; margin-top: 10px; margin-right: 10px; margin-bottom:20px;">
                    <table border="1" bordercolor="#e1dbdb" style="border-collapse:collapse;" class="form  table-hover">
                        <tbody>
                            <tr>
                                <td width="120" rowspan="7" style="text-align:center">基本信息</td>
                                <td width="180" class="tabletitle"><span style="color:red; margin-right: 5px;">*</span>姓名：</td>
                                <td width="190" class="formValue">
                                    <el-form-item prop="name">
                                        <el-input v-model="form.name" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td width="132" class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>性别：</td>
                                <td width="191" class="formValue">
                                    <el-form-item prop="Gender">
                                        <el-select v-model="form.Gender" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option label="男" value="男" />
                                            <el-option label="女" value="女" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td width="164" class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>批次：</td>
                                <td width="240" class="formValue">
                                    <el-form-item prop="PoliticalStatus">
                                        <el-input v-model="form.PoliticalStatus" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td width="132" rowspan="4" align="center">
                                    <div class="file" style="width: 120px; height: 120px; padding: 4px;">
                                        <img id="uploadPreview" src="@/assets/images/defaultpic.jpg" width="125" style="max-width: 120px; height: auto; width: auto\9; width: 100%" height="150" alt=""> 
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>证件类型：</td>
                                <td class="formValue">
                                    <el-form-item prop="DocumentType">
                                        <el-select v-model="form.DocumentType" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option label="身份证" value="身份证" />
                                            <el-option label="军人" value="军人" />
                                            <el-option label="港澳台居民证件" value="港澳台居民证件" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>证件号码：</td>
                                <td class="formValue">
                                    <el-form-item prop="DocumentNumber">
                                        <el-input v-model="form.DocumentNumber" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>报读类型：</td>
                                <td class="formValue">
                                    <el-form-item prop="StudentCategory">
                                        <el-select v-model="form.StudentCategory" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option label="专科" value="专科" />
                                            <el-option label="课程专科" value="课程专科" />
                                            <el-option label="本科（专升本）" value="本科（专升本）" />
                                            <el-option label="课程本科（专升本）" value="课程本科（专升本）" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>出生日期：</td>
                                <td class="formValue">
                                    <el-form-item prop="BirthDate">
                                        <el-date-picker v-model="form.BirthDate" type="date" placeholder="选择日期" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>民族：</td>
                                <td class="formValue">
                                    <el-form-item prop="Nation">
                                        <el-select v-model="form.Nation" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="(item, index) in NationData"
                                            :key="item.name + index"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>在职情况：</td>
                                <td class="formValue">
                                    <el-form-item prop="WorkingState">
                                        <el-select v-model="form.WorkingState" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option label="自由职业" value="自由职业" />
                                            <el-option label="学生" value="学生" />
                                            <el-option label="待业人员" value="待业人员" />
                                            <el-option label="在职" value="在职" />
                                            <el-option label="其他" value="其他" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>婚姻状况：</td>
                                <td class="formValue">
                                    <el-form-item prop="MaritalStatus">
                                        <el-select v-model="form.MaritalStatus" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option label="未婚" value="未婚" />
                                            <el-option label="已婚" value="已婚" />
                                            <el-option label="离婚" value="离婚" />
                                            <el-option label="丧偶" value="丧偶" />
                                            <el-option label="其他" value="其他" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>总学费：</td>
                                <td class="formValue">
                                    <el-form-item prop="whole">
                                        <el-input v-model="form.whole" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>已缴学费：</td>
                                <td class="formValue">
                                   <el-form-item prop="PayTuition">
                                       <el-input v-model="form.PayTuition" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>未缴学费：</td>
                                <td class="formValue">
                                   <el-form-item prop="UnpaidTuition">
                                       <el-input v-model="form.UnpaidTuition" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>手机号码：</td>
                                <td class="formValue">
                                   <el-form-item prop="phone">
                                       <el-input v-model="form.phone" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>固定电话：</td>
                                <td class="formValue" colspan="2">
                                   <el-form-item prop="tel">
                                       <el-input v-model="form.tel" clearable class="kuan"  :disabled='disabled' />
                                   </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>E-mail：</td>
                                <td class="formValue">
                                   <el-form-item prop="email">
                                       <el-input v-model="form.email" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>邮编：</td>
                                <td class="formValue">
                                   <el-form-item prop="ZipCode">
                                       <el-input v-model="form.ZipCode" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>工作单位：</td>
                                <td class="formValue" colspan="2">
                                   <el-form-item prop="CompanyName">
                                       <el-input v-model="form.CompanyName" clearable class="kuan" :disabled='disabled' />
                                   </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>户口所在地：</td>
                                <td colspan="3" class="formValue">
                                    <el-form-item prop="HouseholdCity">
                                        <v-distpicker
                                        :placeholders="placeholders"
                                        @selected="onSelected"
                                        class="City"
                                        :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle"><span style="color: red; margin-right: 5px;">*</span>详细地址：</td>
                                <td colspan="3" class="formValue">
                                    <el-form-item prop="HouseholdArea">
                                       <el-input v-model="form.HouseholdArea" clearable class="kuan" :disabled='disabled' />
                                   </el-form-item>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <el-form-item label="备注" prop="Remarks">
                        <el-input type="text" v-model="form.Remarks" clearable class="kuan" :disabled='disabled' />
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancel">取消</el-button>
                <el-button :loading="loading" type="primary" @click="doSubmit" :disabled='disabled'>确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import jsonData from '@/json/Nation.json'
import { Guangk, editGuangk } from '@/api/student'
import { parseTime } from '@/utils/index'
import VDistpicker from 'v-distpicker'
import { mapGetters } from 'vuex'
import { constants } from 'crypto';
export default {
    components: { VDistpicker },
    data(){
        const validPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入电话号码'))
            } else if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
                callback(new Error('请输入正确的11位手机号码'))
            } else {
                callback()
            }
        }
        return{
            dialog: false,
            disabled:false,
            loading: false,
            placeholders: {
              province: '= 选择省 =',
              city: '= 选择市 =',
              area: '= 选择区 =',
            },
            form:{
                name:'',
                email:'',
                phone:'',
                tel:'',
                Founder:'',
                ZipCode:'',
                CompanyName:'',
                HouseholdCity:'',
                HouseholdArea:'',
                PayTuition:'0',
                HouseholdProvince:'',
                UnpaidTuition:'0',
                WorkingState:'',
                MaritalStatus:'',
                PoliticalStatus:'',
                DocumentNumber:'',
                Gender:'',
                BirthDate:'',
                Nation:'',
                createTime:'',
                DocumentType:'',
                StudentCategory:'',
                TuitionFeeSoure:'',
                HouseholdA:'',
                Remarks:'',
                whole:''
            },
            rules: {
                name: [
                    { required: true, message: '姓名不能为空'}
                ],
                // Gender: [
                //     { required: true, message: '不能为空'}
                // ],
                // phone: [
                //     { required: true, trigger: 'blur', validator: validPhone }
                // ],
                // PoliticalStatus:[
                //     { required: true, message: '不能为空'}
                // ],
                // ZipCode:[
                //     { required: true, message: '不能为空'}
                // ],
                // CompanyName:[
                //     { required: true, message: '不能为空'}
                // ],
                // HouseholdCity:[
                //     { required: true, message: '不能为空'}
                // ],
                // HouseholdArea:[
                //     { required: true, message: '不能为空'}
                // ],
                // PayTuition:[
                //     { required: true, message: '不能为空'}
                // ],
                // WorkingState:[
                //     { required: true, message: '不能为空'}
                // ],
                // MaritalStatus:[
                //     { required: true, message: '不能为空'}
                // ],
                // DocumentNumber:[
                //     { required: true, message: '不能为空'}
                // ],
                // BirthDate:[
                //     { required: true, message: '不能为空'}
                // ],
                // Nation:[
                //     { required: true, message: '不能为空'}
                // ],
                // email: [
                //     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                //     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                // ],
            },
            fullnames:[],
            HouCity:[],
            NationData:[],
            selectName:{}
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
  created(){
      this.NationData = jsonData;
  },
  methods:{
    parseTime,
    cancel() {
      this.resetForm()
    },
    selectGet(vId){
        this.selectName = this.fullnames.find((item) => {
            return item.id === vId
        })
    },
    onSelected(data){
        this.form.HouseholdCity = data.province.value
        this.form.HouseholdProvince = data.city.value
        this.form.HouseholdA = data.area.value
    },
    doSubmit(){
        const time = Date.now()
        this.form.createTime = parseTime(time)
        this.form.Founder = this.user.usernames
        if((this.form.PayTuition === '0'|| this.form.PayTuition === '') && (this.form.UnpaidTuition != '0' || this.form.UnpaidTuition != '')){
            this.form.TuitionFeeSoure = '未缴纳'
            
        }else if(this.form.PayTuition != '0' && this.form.UnpaidTuition != '0' && this.form.UnpaidTuition != ''){
            this.form.TuitionFeeSoure = '部分缴纳'
            
        }else if(this.form.PayTuition != '0' && (this.form.UnpaidTuition === '0' || this.form.UnpaidTuition === '')){
            this.form.TuitionFeeSoure = '已全部缴纳'
            
        }else{
            this.form.TuitionFeeSoure = ''
            
        }
        this.$refs['form'].validate((value) => {
            if(value){
                if (this.isAdd) {
                this.doAdd()
                }else this.doEdit()
            }else{
                return false;
            }
        })
    },
    doAdd(){
        Guangk(this.form).then(res => {
            if(res.code === 200) {
                this.loading = true
                this.resetForm()
                this.$notify({
                    title: '添加成功',
                    type: 'success',
                    duration: 2500
                })
                this.loading = false
            }else if(res.code === -200){
                this.$notify({
                    title: '此学员已存在',
                    type: 'warning',
                    duration: 2500
                })
            }
            this.$parent.$parent.getAll()
        }).catch(err => {
            this.loading = false
            this.$notify({
                title: '添加失败',
                type: 'error',
                duration: 2500
            })
        })
    },
    doEdit(){
        editGuangk(this.form).then(res => {
            this.resetForm()
                this.$notify({
                title: '修改成功',
                type: 'success',
                duration: 2500
            })
        this.loading = false
        this.sup_this.getAll()
        }).catch(err => {
            this.loading = false
            console.log(err)
        })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
    }
  },
  computed:{
        ...mapGetters([
            'user'
        ]),
    }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper{
    .kuan{
        width: 100% !important;
        /deep/ .el-input__inner{
            width: 100%;
        }
    }
    /deep/ .el-input{
        width: 169px;
    }
    /deep/ .el-form-item{
        margin-bottom: 1px;
    }
    /deep/ .el-form-item__error{
        z-index: 100;
    }
    .City{
        /deep/ .el-input__inner{
            width: 120px;
        }
        /deep/ .el-input{
            width: 120px;
        }
    }
   /deep/ .el-dialog__header{
        background: #42b983;
    }
    /deep/ .el-dialog{
        min-width: 1180px;
    }
    /deep/ .el-dialog__title{
        color: #fff;
    }
    /deep/ .el-dialog__close{
        color: #000;
        font-size: 16px;
    }
    /deep/ .el-input__inner{
        width: 169px;
        height: 28px;
        border-radius: 0;
    }
    /deep/ .el-input__icon{
        height: 28px;
        line-height: 28px;
    }
    .tabletitle {
        padding-left: 8px;
        color: #444;
    }
    .formValue {
        position: relative;
        padding: 5px;
        width: auto;
    }
}
</style>