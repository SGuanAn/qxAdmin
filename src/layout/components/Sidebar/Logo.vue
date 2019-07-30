<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/user/personal">
        <img v-if="avatar" :src="avatar" class="sidebar-logo">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/user/personal">
        <img v-if="avatar" :src="avatar" class="sidebar-logo">
        <h1 class="name"> {{ user.usernames }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'user'
    ])
  },
  data() {
    return {
      title: '勤学教育',
      logo: '/upload/images/8a2fc940-90a2-11e9-a7c6-37cc56f71d12.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}
.name{
  font-size: 18px;
  color: #fff;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 175px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      margin-top: 30px;
      width: 100px;
      height: 100px;
      border-radius: 100px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      // line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      // vertical-align: middle;
    }
  }
  &.collapse {
    height: 70px;
    line-height: 70px;
    .sidebar-logo {
      margin-right: 0px;
      width: 50px;
      height: 50px;
      margin-top: 0;
      border-radius: 32px;
    }
  }
}
</style>
