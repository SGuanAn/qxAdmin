<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to" :disabled="this.data.id ==1 ? true:false" >编辑</el-button>
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
    //   _this.deptIds = []
      _this.form = { id: this.data.id, name: this.data.name, remark: this.data.remark, dataScope: this.data.dataScope, level: this.data.level, 
      createTime: this.data.createTime }
    //   for (let i = 0; i < _this.form.depts.length; i++) {
    //     _this.deptIds[i] = _this.form.depts[i].id
    //   }
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