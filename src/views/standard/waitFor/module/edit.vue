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
        detailed:this.data.detailed,
        learn:this.data.learn,
        HouseholdProvince:this.data.HouseholdProvince,
        HouseholdCity:this.data.HouseholdCity,
        HouseholdArea:this.data.HouseholdArea,
        graduation:this.data.graduation,
        Company:this.data.Company,
        email:this.data.email,
        social:this.data.social,
        address:this.data.address,
        Children:this.data.Children,
        Account:this.data.Account,
        AccountPassword:this.data.AccountPassword,
        Total:this.data.Total,
        Pay:this.data.Pay,
        Unpaid:this.data.Unpaid,
        source:this.data.source,
        Audit:this.data.Audit,
        Entrance:this.data.Entrance,
        payment:this.data.payment,
        declare:this.data.declare,
        progress:this.data.progress,
        Remarks:this.data.Remarks,
        major:this.data.major,
        Immigration:this.data.Immigration,
        XueXin:this.data.XueXin,
        XueXinPassword:this.data.XueXinPassword,
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