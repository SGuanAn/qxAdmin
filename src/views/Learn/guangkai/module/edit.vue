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
        email:this.data.email,
        phone:this.data.phone,
        tel:this.data.tel,
        DocumentType:this.data.DocumentType,
        StudentCategory:this.data.StudentCategory,
        TuitionFeeSoure:this.data.TuitionFeeSoure,
        Founder:this.data.Founder,
        ZipCode:this.data.ZipCode,
        CompanyName:this.data.CompanyName,
        HouseholdCity:this.data.HouseholdCity,
        HouseholdArea:this.data.HouseholdArea,
        PayTuition:this.data.PayTuition,
        HouseholdProvince:this.data.HouseholdProvince,
        UnpaidTuition:this.data.UnpaidTuition,
        WorkingState:this.data.WorkingState,
        MaritalStatus:this.data.MaritalStatus,
        PoliticalStatus:this.data.PoliticalStatus,
        DocumentNumber:this.data.DocumentNumber,
        Gender:this.data.Gender,
        BirthDate:this.data.BirthDate,
        Nation:this.data.Nation,
        createTime:this.data.createTime,
        HouseholdA:this.data.HouseholdA,
        Remarks:this.data.Remarks,
        whole:this.data.whole
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