<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.main-container{
  min-width:1190px;
  overflow-x:scroll;
}
  .el-date-editor .el-range-separator {
    width: 10%;
}
.el-dialog__wrapper .City select{
  width: 165px !important;
}
</style>