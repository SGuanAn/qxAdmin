<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to" />
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
      _this.getRoles()
      _this.roleId = this.data.role_id
      console.log(_this)
      _this.form = { id: this.data.id, name: this.data.name, username: this.data.username, introduction: this.data.introduction, createTime: this.data.createTime,phone: this.data.phone, email:this.data.email,usernames:this.data.usernames}
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