<template>
  <DashboardL>
    <router-view :key="$route.fullPath"></router-view>
  </DashboardL>
</template>

<script>
import DashboardL from "../components/Layout/DashboardL.vue";
export default {
  components: {
    DashboardL,
  },
};
</script>