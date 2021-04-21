<template>
  <div class="dropdown mb-3" :class="{ show: isOpen }">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click.prevent="isOpen = !isOpen"
    >
      Acciones
    </button>
    <div
      class="dropdown-menu"
      :class="{ show: isOpen }"
      aria-labelledby="dropdownMenuButton"
    >
      <router-link class="dropdown-item" :to="'/categories/edit/' + id"
        >Editar</router-link
      >
      <a class="dropdown-item cp" @click.prevent="deleteCategory">Eliminar</a>
      <router-link class="dropdown-item" :to="'/categories/add-questions/' + id"
        >Adicionar productos</router-link
      >
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs } from "vue";
import { endpoint, bearerHeader } from "../../../backend/api";
import router from "@/router";
import { useStore } from "vuex";
export default {
  props: {
    id: String,
  },
  setup(props) {
    const state = reactive({
      isOpen: false,
    });
    const store = useStore();
    const $swal = inject("$swal");
    const deleteCategory = async () => {
      $swal({
        icon: "warning",
        title: "¿Estás seguro que quieres realizar esta acción?",
        showCancelButton: true,
        text: "Si aceptas se borrar la información acerca de esta categoría.",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const sendData = await fetch(endpoint + "delete-category", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: bearerHeader,
            },
            body: JSON.stringify({
              id: props.id,
            }),
          });
          if (sendData.status == 200) {
            const data = await sendData.json();
            store.dispatch("SET_CATEGORY_A", data.all_categories);
            $swal({
              icon: "success",
              title: "Buen trabajo.",
              text: data.message,
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/categories");
              }
            });
          }
        }
      });
    };
    return {
      ...toRefs(state),
      deleteCategory,
    };
  },
};
</script>

<style scoped>
.cp {
  cursor: pointer;
}
</style>