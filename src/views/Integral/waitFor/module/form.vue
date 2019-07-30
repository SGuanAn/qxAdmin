<template>
    <div class="dialo">
        <el-dialog v-el-drag-dialog :visible.sync="dialog" :title="isAdd ? '添加客户' : '客户信息'" append-to-body >
            <el-form ref="form" :rules="rules" :model="form" size="small">
                <div style="margin-left: 10px; margin-top: 10px; margin-right: 10px; margin-bottom:20px;">
                    <table border="1" bordercolor="#e1dbdb" style="border-collapse:collapse;" class="form  table-hover">
                        <tbody>
                            <tr>
                                <td colspan="8" style="text-align:center;" class="topTitle">基本信息</td>
                            </tr>
                            <tr>
                                <td width="130" class="tabletitle tdTitle"><span style="color:red; margin-right: 5px;">*</span>姓名：</td>
                                <td width="190" class="formValue">
                                    <el-form-item prop="name">
                                        <el-input v-model="form.name" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td width="130" class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>性别：</td>
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
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>民族：</td>
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
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>婚姻状况：</td>
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
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>职业：</td>
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
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>户口所在地：</td>
                                <td class="formValue" colspan="3">
                                   <el-form-item prop="HouseholdCity">
                                        <v-distpicker
                                        :placeholders="placeholders"
                                        @selected="onSelected"
                                        class="City"
                                        :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>详细地址：</td>
                                <td class="formValue">
                                    <el-form-item prop="detailed">
                                       <el-input v-model="form.detailed" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="8" style="text-align:center;" class="topTitle">其他信息</td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>学历：</td>
                                <td class="formValue">
                                    <el-form-item prop="MaritalStatus">
                                        <el-select v-model="form.learn" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                                v-for="item in learn"
                                                :key="item.name"
                                                :label="item.name"
                                                :value="item.name" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">毕业学校：</td>
                                <td class="formValue">
                                    <el-form-item prop="graduation">
                                        <el-input v-model="form.graduation" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">现工作单位：</td>
                                <td class="formValue" colspan="2">
                                   <el-form-item prop="Company">
                                       <el-input v-model="form.Company" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle">专业：</td>
                                <td class="formValue">
                                    <el-form-item prop="major">
                                        <el-input v-model="form.major" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>现单位社保数：</td>
                                <td class="formValue">
                                   <el-form-item prop="social">
                                       <el-input v-model="form.social" clearable :disabled='disabled' />
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
                                <td class="tabletitle tdTitle">小孩随迁数：</td>
                                <td class="formValue">
                                    <el-form-item prop="Children">
                                        <el-select v-model="form.Children" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="item in ChildrenData"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">人保账号：</td>
                                <td class="formValue">
                                    <el-form-item prop="Account">
                                        <el-input v-model="form.Account" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">人保密码：</td>
                                <td class="formValue" colspan="2">
                                    <el-form-item prop="AccountPassword">
                                        <el-input v-model="form.AccountPassword" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle">E-mail：</td>
                                <td class="formValue">
                                   <el-form-item prop="email">
                                       <el-input v-model="form.email" clearable :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">学信网账号：</td>
                                <td class="formValue">
                                    <el-form-item prop="XueXin">
                                        <el-input v-model="form.XueXin" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">学信网密码：</td>
                                <td class="formValue" colspan="2">
                                    <el-form-item prop="XueXinPassword">
                                        <el-input v-model="form.XueXinPassword" clearable :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align:center;" class="topTitle">订单信息</td>
                                <td colspan="4" style="text-align:center;" class="topTitle">备注</td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>总费用：</td>
                                <td class="formValue">
                                   <el-form-item prop="Total">
                                       <el-input v-model="form.Total" :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>来源：</td>
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
                                <td rowspan="5" colspan="3">
                                    <el-form-item prop="Remarks">
                                       <el-input type="textarea" v-model="form.Remarks" :disabled='disabled' />
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>已缴纳：</td>
                                <td class="formValue">
                                   <el-form-item prop="Pay">
                                       <el-input v-model="form.Pay" :disabled='disabled' />
                                   </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>审核方式：</td>
                                <td class="formValue">
                                    <el-form-item prop="Audit">
                                        <el-select v-model="form.Audit" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="item in AuditData"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
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
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>申报窗口：</td>
                                <td class="formValue">
                                    <el-form-item prop="Entrance">
                                        <el-select v-model="form.Entrance" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="item in EntranceData"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>付款方式：</td>
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
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>申报方式：</td>
                                <td class="formValue">
                                    <el-form-item prop="Sdeclare">
                                        <el-select v-model="form.Sdeclare" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option label="个人申报" value="个人申报" />
                                            <el-option label="单位申报" value="单位申报" />
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tabletitle tdTitle"><span style="color: red; margin-right: 5px;">*</span>迁入地：</td>
                                <td class="formValue">
                                    <el-form-item prop="Immigration">
                                        <el-select v-model="form.Immigration" placeholder="==请选择==" clearable :disabled='disabled' >
                                            <el-option
                                            v-for="item in ImmigrationData"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"/>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="tabletitle tdTitle">工作进度：</td>
                                <td>
                                    <el-form-item prop="progress">
                                        <el-input v-model="form.progress" :disabled='true' />
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
// import { addData, editData } from '@/api/Alldata'
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
            } else if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
                callback(new Error('请输入正确的11位手机号码'))
            } else {
                callback()
            }
        }
        return{
            learn: Datas.learn, // 赋值 json 学历
            MarriageData: Datas.Marriage,  // 赋值 json 婚姻情况
            ChildrenData: Datas.Children,  // 赋值
            sourceData: Datas.source,  // 赋值
            AuditData: Datas.examineMode,  // 赋值
            EntranceData: Datas.Entrance, 
            paymentData: Datas.payment, 
            ImmigrationData: Datas.Immigration,
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
                BirthDate:'', //出生日期
                Nation:'', //民族
                Marriage:'', //婚姻状况
                phone:'', //手机号码
                Occupation:'', //职业
                detailed:'', //详细地址
                learn:'', //学历
                graduation:'', //毕业学校
                Company:'', //工作单位
                email:'', //邮箱地址
                social:'', //社保
                address:'',// 通讯地址
                Children:'0', //小孩随迁数
                Account:'', //人保账号
                AccountPassword:'', //人保密码
                Total:0, //总费用
                Pay:0, //已缴纳
                Unpaid: 0, //未缴
                source:'', //来源
                Audit:'', //审核方式
                Entrance:'', //申报窗口
                payment:'', //付款方式
                Sdeclare:'', //申报方式
                progress:'无', //工作进度
                Remarks:'', //备注
                major:'', //专业
                Immigration:'', //迁移地
                XueXin:'', //学信网账户
                XueXinPassword:'', //学信网密码
            },
            rules: {
                name: [
                    { required: true, message: '姓名不能为空'}
                ],
                Gender: [
                    { required: true, message: '不能为空'}
                ],
                age: [
                    { required: true, message: '不能为空'}
                ],
                IDNumber: [
                    { required: true, message: '不能为空'}
                ],
                BirthDate: [
                    { required: true, message: '不能为空'}
                ],
                Nation: [
                    { required: true, message: '不能为空'}
                ],
                Marriage: [
                    { required: true, message: '不能为空'}
                ],
                phone: [
                    { required: true, message: '不能为空'}
                ]
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
        this.form.belong = '无'
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
            }else if(res.code === -1){
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
        console.log(this.form)
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
      }
  },
  computed:{
        ...mapGetters([
            'user'
        ]),
        Unpaid:function() {
            return this.form.Unpaid = this.form.Total - this.form.Pay
        }
    }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper{
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
        height: 179px;
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
        // height: 100%;
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
    .formValue {
        position: relative;
        // width: auto;
    }
}
</style>