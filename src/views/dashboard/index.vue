<template>
  <div class="dashboard-container">
    <v-header />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VHeader from './module/header'

export default {
  name: 'Dashboard',
  components:{ VHeader },
  data() {
    return{}
  },
  created(){
    
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
