<template>
  <div class="row">
    <div class="col-lg-12 pt-4">
      <div class="dropdown fr mr-3">
        <a
          class="btn btn-user dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          :aria-expanded="isActive ? 'true' : 'false'"
          @click.prevent="isActive = !isActive"
        >
          {{ user.name }}
        </a>

        <div
          class="dropdown-menu"
          :class="{ show: isActive }"
          aria-labelledby="dropdownMenuLink"
        >
          <a class="dropdown-item" href="#">Editar usuario</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" @click.prevent="closeSesion"
            >Cerrar sesión</a
          >
        </div>
      </div>
      <div class="fr mr-1" v-if="user.rol == 1 && route.path !== '/categories'">
        <router-link to="/categories" class="btn btn-user"
          >Gestionar categorías</router-link
        >
      </div>
      <div class="fr mr-1" v-if="route.path == '/categories'">
        <router-link to="/categories/add" class="btn btn-user"
          >Adicionar categorías</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
export default {
  setup() {
    const user = JSON.parse(localStorage.getItem("user")) ?? null;
    const state = reactive({
      user,
      isActive: false,
    });
    const route = useRoute();
    const closeSesion = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    };
    return {
      ...toRefs(state),
      closeSesion,
      route,
    };
  },
};
</script>

<style scoped>
.btn-user {
  color: white;
  border: 1px solid white;
}
.btn-user:hover {
  color: whitesmoke;
}
.btn-user:focus {
  box-shadow: none !important;
}

.dropdown-menu {
  background-color: transparent;
  border: 1px solid white;
}
.dropdown-menu a {
  color: white;
}
.b-white {
  padding: 10px;
  border: 1px solid white;
  color: white;
  border-radius: 10px;
}
.mr-1 {
  margin-right: 1rem;
}
.ml-1 {
  margin-left: 0.5rem;
}
.cp {
  cursor: pointer;
}
.dropdown-divider {
  border-top: 1px solid white;
}
.fr {
  float: right;
}
</style>