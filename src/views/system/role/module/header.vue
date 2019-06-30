<template>
  <div class="search-container">
    <!-- 搜索 -->
    <el-input v-model="searchValue" clearable :placeholder="placeholderDes" style="width: 200px" class="filter-item" @keyup.enter.native="search" />
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="search">搜索</el-button>
    <!-- 新增 -->
    <div v-permission="['ADMIN', 'ROLES_ADD']" style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import eForm from './form'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  components: { eForm },
  directives: { permission },
  data() {
    return {
      placeholderDes:'请输入搜索关键字',
    }
  },
  props:{
        keyword: {
          type: String,
          required: true,
        },
    },
  computed:{
    searchValue:{
      get(){
        return this.keyword
      },
      set(val) {
        this.$emit('update:keyword', val)
      }
    }
  },
  methods:{
    search() {
      this.$emit('searchVal', { keyword: this.searchValue })
    }
  }
}
</script>
<style lang="scss">
.search-container input {
    height: 33px;
    line-height: 33px;
}

</style>
