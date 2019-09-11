<template>
    <div class="dialo">
        <el-dialog v-el-drag-dialog :visible.sync="dialog" :close-on-click-modal='false' :title="isAdd ? '添加学员' : '学员信息'" append-to-body>
            <el-form ref="form" :rules="rules" :model="form" size="small">
                <div style="margin-left: 10px; margin-top: 10px; margin-right: 10px; margin-bottom:20px;">
                    <table border="1" bordercolor="#e1dbdb" style="border-collapse:collapse;" class="form  table-hover">
                        <tbody>
                            <tr>
                                <td colspan="8" style="text-align:center;" class="topTitle">学员信息</td>
                            </tr>
                            <tr>
                                <td width="130" class="tabletitle tdTitle"><span style="color:red; margin-right: 5px;">*</span>姓名：</td>
                                <td width="190" class="formValue">
                                    <el-form-item prop="name">
                                        <el-input v-model="form.name" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td width="130" class="tabletitle tdTitle">性别：</td>
                                <td width="190" class="formValue">
                                    <el-form-item prop="Gender">
                                        <el-select v-model="form.Gender" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option label="男" value="男" />
                                            <el-option label="女" value="女" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td width="130" class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>年龄：</td>
                                <td width="190" class="formValue">
                                    <el-form-item prop="age">
                                        <el-input v-model="form.age" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td width="132" rowspan="4" align="center">
                                    <div class="file" style="padding: 4px;">
                                        <img id="uploadPreview" src="@/assets/images/defaultpic.jpg" width="125" style="max-width: 120px; height: auto; width: auto\9; width: 100%" height="150" alt=""> 
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>身份证号：</td>
                                <td class="formValue">
                                    <el-form-item prop="IDNumber">
                                        <el-input v-model="form.IDNumber" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>出生日期：</td>
                                <td class="formValue">
                                    <el-form-item prop="BirthDate">
                                        <el-date-picker v-model="form.BirthDate" type="date" placeholder="选择日期" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">民族：</td>
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
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle">婚姻状况：</td>
                                <td class="formValue">
                                    <el-form-item prop="Marriage">
                                        <el-select v-model="form.Marriage" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                                v-for="item in MarriageData"
                                                :key="item.name"
                                                :label="item.name"
                                                :value="item.name" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>手机号码：</td>
                                <td class="formValue">
                                   <el-form-item prop="phone">
                                       <el-input v-model="form.phone" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">职业：</td>
                                <td class="formValue">
                                    <el-form-item prop="Occupation">
                                        <el-select v-model="form.Occupation" placeholder="==请选择==" clearable :disabled='disabled' >
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
                                <td class="tabletitle tdTitle">户籍：</td>
                                <td class="formValue">
                                   <el-form-item prop="register">
                                       <el-input v-model="form.register" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">政治面貌：</td>
                                <td class="formValue">
                                   <el-form-item prop="Political">
                                       <el-input v-model="form.Political" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">E-mail：</td>
                                <td class="formValue">
                                   <el-form-item prop="mail">
                                       <el-input v-model="form.mail" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle">报名日期：</td>
                                <td class="formValue">
                                    <el-form-item prop="signTime">
                                        <el-date-picker v-model="form.signTime" type="date" placeholder="选择日期" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">学员账户：</td>
                                <td class="formValue">
                                    <el-form-item prop="student_account">
                                        <el-input v-model="form.student_account" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">学员密码：</td>
                                <td class="formValue">
                                    <el-form-item prop="student_password">
                                        <el-input v-model="form.student_password" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle">招生老师：</td>
                                <td class="formValue">
                                    <el-form-item prop="recruit_teacher">
                                        <el-input v-model="form.recruit_teacher" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">接待老师：</td>
                                <td class="formValue">
                                    <el-form-item prop="reception_teacher">
                                        <el-input v-model="form.reception_teacher" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">通讯地址：</td>
                                <td class="formValue" colspan="2">
                                    <el-form-item prop="address">
                                        <el-input v-model="form.address" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle">紧急联系人：</td>
                                <td class="formValue" colspan="2">
                                    <el-form-item prop="emergency_contact">
                                        <el-input v-model="form.emergency_contact" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align:center;" class="topTitle">订单信息</td>
                                <td colspan="4" style="text-align:center;" class="topTitle">备注</td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>总学费：</td>
                                <td class="formValue">
                                   <el-form-item prop="Total">
                                       <el-input v-model="form.Total" :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">来源：</td>
                                <td class="formValue">
                                    <el-form-item prop="source">
                                        <el-select v-model="form.source" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="item in sourceData"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td rowspan="6" colspan="3">
                                    <el-form-item prop="Remarks">
                                       <el-input type="textarea" v-model="form.Remarks" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>第一年学费：</td>
                                <td class="formValue">
                                   <el-form-item prop="one_Tuition">
                                       <el-input v-model="form.one_Tuition" :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>层次：</td>
                                <td class="formValue">
                                    <el-form-item prop="promote">
                                        <el-select v-model="form.promote" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="item in promoteData"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                               <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>第二年学费：</td>
                               <td class="formValue">
                                   <el-form-item prop="two_Tuition">
                                       <el-input v-model="form.two_Tuition" :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">批次：</td>
                                <td>
                                    <el-form-item prop="batch">
                                        <el-input v-model="form.batch" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>未缴：</td>
                                <td class="formValue">
                                   <el-form-item prop="Unpaid">
                                       <el-input v-model="form.Unpaid" :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>报读院校：</td>
                                <td class="formValue">
                                    <el-form-item prop="Enrolment">
                                        <el-input v-model="form.Enrolment" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle">付款方式：</td>
                                <td class="formValue">
                                    <el-form-item prop="payment">
                                        <el-select v-model="form.payment" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="item in paymentData"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>报读专业：</td>
                                <td class="formValue">
                                    <el-form-item prop="major_enrollment">
                                        <el-input v-model="form.major_enrollment" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle">收据编号：</td>
                                <td class="formValue">
                                    <el-form-item prop="receipt">
                                        <el-input v-model="form.receipt" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">报读类型：</td>
                                <td class="formValue">
                                   <el-form-item prop="Types_type">
                                       <el-select v-model="form.Types_type" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="item in TypesData"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
                                   </el-form-item>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
import elDragDialog from '@/directive/el-drag-dialog'
import Datas from '@/json/data.json'
import { addData, editData } from '@/api/learnForm'
import { parseTime } from '@/utils/index'
import VDistpicker from 'v-distpicker'
import { mapGetters } from 'vuex'
import { constants } from 'crypto';
export default {
    components: { VDistpicker },
    directives: { elDragDialog },
    data(){
        const validPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入电话号码'))
            } else if (!/^1[3456789]\d{9}$/.test(value)) {
                callback(new Error('请输入正确的11位手机号码'))
            } else {
                callback()
            }
        }
        const validateIDCard = (rule, value, callback) => {
            if (value && (!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(value) || (value.length !== 15 && value.length !== 18))) {
                callback(new Error('身份证号码不规范'))
            } else {
                callback()
            }
        }
        return{
            MarriageData: Datas.Marriage,  // 赋值 json 婚姻情况
            sourceData: Datas.source,  // 赋值
            promoteData: [
                {id:1, name: '高升专'},
                {id:2, name: '专升本'},
                {id:3, name: '其他'}
            ],  // 赋值
            TypesData:[
                {id:1, name: '自考'},
                {id:2, name: '广开'},
                {id:3, name: '国开'},
                {id:4, name: '成人高考'},
                {id:5, name: '网络教育'},
                {id:6, name: '全日制大学'},
            ], // 报读类型
            paymentData: Datas.payment, 
            dialog: false,
            disabled:false,
            loading: false,
            placeholders: {
              province: '= 选择省 =',
              city: '= 选择市 =',
              area: '= 选择区 =',
            },
            form:{
                name:'',  //姓名
                Gender: '',  //性别
                age:'', // 年龄
                IDNumber:'', //身份证号
                BirthDate:null, //出生日期
                Nation:'', //民族
                Marriage:'', //婚姻状况
                phone:'', //手机号码
                Occupation:'', //职业
                address:'',// 通讯地址
                Total:0, //总学费
                one_Tuition:0, // 第一年学费
                two_Tuition:0, // 第二年学费
                Unpaid: 0, //未缴
                source:'', //来源
                promote:'', //层次
                Enrolment:'', //报读院校
                payment:'', //付款方式
                major_enrollment:'', //报读专业
                batch:'', //批次
                receipt:'', //收据编号
                student_account:'', //学员账户
                student_password:'', //学员密码
                Payment_status:'', // 缴费情况
                signTime: null, // 报名日期
                recruit_teacher: '', // 招生老师
                reception_teacher: '', // 接待老师
                Remarks:'', //备注
                mail:'', // 邮箱
                Political:'', // 政治面貌
                register:'', // 户籍
                emergency_contact:'', // 紧急联系人
                Types_type:'', // 报读类型

            },
            rules: {
                name: [
                    { required: true, message: '姓名不能为空'}
                ],
                IDNumber: [
                    { required: true,  message: '不能为空', trigger: 'blur' },
                    { validator: validateIDCard, trigger: 'blur' }
                ],
                phone: [
                    { required: true, trigger: 'blur', validator: validPhone }
                ],
                promote: [
                    { required: true, message: '不能为空'}
                ],
                major_enrollment: [
                    { required: true, message: '不能为空'}
                ],
                Enrolment: [
                    { required: true, message: '不能为空'}
                ],
                one_Tuition: [
                    { required: true, message: '不能为空'}
                ],
                two_Tuition: [
                    { required: true, message: '不能为空'}
                ],
                Total: [
                    { required: true, message: '不能为空'}
                ],
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
    doSubmit(){
        this.form.Founder = this.user.usernames
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
        const time = Date.now()
        this.form.createTime = parseTime(time)
        addData(this.form).then(res => {
            if(res.code === 200) {
                this.loading = true
                this.resetForm()
                this.$notify({
                    title: res.msg,
                    type: 'success',
                    duration: 2500
                })
                this.loading = false
            } else if(res.code === -1) {
                this.$notify({
                    title: res.msg,
                    type: 'warning',
                    duration: 2500
                })
            }
            this.$parent.$parent.sup_this.getAll()
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
        editData(this.form).then(res => {
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
  watch:{
      Unpaid(val){
          this.form.Unpaid = val
      },
      BirthDate(val){
          this.form.BirthDate = val
      },
      MyAge(val){
          this.form.age = val
      },
      Payment_status(val) {
          this.form.Payment_status = val
      }
  },
  computed:{
        ...mapGetters([
            'user'
        ]),
        Unpaid:function() {
            return this.form.Unpaid = this.form.Total - this.form.one_Tuition - this.form.two_Tuition
        },
        BirthDate:function() {
            return this.form.IDNumber.substring(6, 10) + "-" + this.form.IDNumber.substring(10, 12) + "-" + this.form.IDNumber.substring(12, 14);
        },
        Payment_status:function() {
             if(this.form.Total > 0 && this.form.Unpaid === 0) {
                 return this.form.Payment_status = '学费已缴完'
             } else if(this.form.Total > 0 && this.form.Unpaid > 0) {
                 return this.form.Payment_status = '学费未缴完'
             } else{
                 return this.form.Payment_status = '学费未缴完'
             }
        },
        MyAge:function() {
            var myDate = new Date(); 
            var month = myDate.getMonth() + 1; 
            var day = myDate.getDate(); 
            var age = myDate.getFullYear() - this.form.IDNumber.substring(6, 10) - 1;
            if (this.form.IDNumber.substring(10, 12) < month || this.form.IDNumber.substring(10, 12) == month && this.form.IDNumber.substring(12, 14) <= day) { 
                age++; 
            }
            return age;
        }
    }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper{
    /deep/ .el-dialog__body{
        height:600PX;
        overflow-x:scroll;
    }
    .topTitle{
        height: 50px;
        font-weight: 900;
        background: #e5e5e5;
        color: #333;
    }
    .tdTitle{
        background: #e5e5e5;
        color: #333;
    }
    table{border:1px solid #909399}
    .kuan{
        width: 100% !important;
        /deep/ .el-input__inner{
            width: 100%;
        }
    }
    .City{
        /deep/ select{
            font-size: 14px;
            border-radius: 0;
            width: 170px;
        }
    }
    /deep/ .el-textarea__inner{
        padding: 0;
        height: 210px;
        border: 0;
        border-radius: 0;
    }
    /deep/ .el-form-item{
        margin-bottom: 1px;
    }
    /deep/ .el-form-item__error{
        z-index: 100;
    }
   /deep/ .el-dialog__header{
        background: #42b983;
    }
    /deep/ .el-dialog{
        width: 1180px;
    }
    /deep/ .el-dialog__title{
        color: #fff;
    }
    /deep/ .el-dialog__close{
        color: #000;
        font-size: 16px;
    }
    /deep/ .el-input__inner{
        border-radius: 0;
        border: 0;
    }
    /deep/ .el-date-editor{
        width: 100%;
    }
    /deep/ .el-input__icon{
        height: 28px;
        line-height: 28px;
    }
    .tabletitle {
        padding-left: 8px;
        color: #444;
    }
    // .formValue {
    //     // position: relative;
    //     // width: auto;
    // }
}
</style>