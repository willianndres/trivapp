<template>
  <DashboardL>
    <router-view></router-view>
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