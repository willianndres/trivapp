<template>
  <div class="col-gl-12 pt-3">
    <div class="col-lg-6 mx-auto text-center col-links">
      <router-link to="/login" :class="{ selected: selectedLogin }"
        >Login</router-link
      >
      |
      <router-link to="/" :class="{ selected: selectedRegister }"
        >Registrarse</router-link
      >
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const state = reactive({
      selectedRegister: route.path == "/" ? true : false,
      selectedLogin: route.path == "/login" ? true : false,
    });

    return toRefs(state);
  },
};
</script>

<style>
.col-links {
  color: white;
}
.col-links a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}
.col-links .selected {
  color: #ddbf9b;
}
</style>