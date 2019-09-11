<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to" >编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  data() {
    return {
      disableds:false
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      
      const _this = this.$refs.form
      _this.placeholders.city = this.data.HouseholdCity
      _this.placeholders.province = this.data.HouseholdProvince
      _this.placeholders.area = this.data.HouseholdA
      _this.form = {
        id:this.data.id,
        name:this.data.name,
        Gender:this.data.Gender,
        age:this.data.age,
        IDNumber:this.data.IDNumber,
        BirthDate:this.data.BirthDate,
        Nation:this.data.Nation,
        Marriage:this.data.Marriage,
        phone:this.data.phone,
        Occupation:this.data.Occupation,
        address:this.data.address,
        Total:this.data.Total,
        one_Tuition:this.data.one_Tuition,
        two_Tuition:this.data.two_Tuition,
        Unpaid:this.data.Unpaid,
        source:this.data.source,
        promote:this.data.promote,
        Enrolment:this.data.Enrolment,
        payment:this.data.payment,
        major_enrollment:this.data.major_enrollment,
        batch:this.data.batch,
        receipt:this.data.receipt,
        student_account:this.data.student_account,
        student_password:this.data.student_password,
        Payment_status:this.data.Payment_status,
        signTime:this.data.signTime,
        recruit_teacher:this.data.recruit_teacher,
        reception_teacher:this.data.reception_teacher,
        Remarks:this.data.Remarks,
        mail:this.data.mail,
        Political:this.data.Political,
        register:this.data.register,
        emergency_contact:this.data.emergency_contact,
        Types_type:this.data.Types_type,
      }
    _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>