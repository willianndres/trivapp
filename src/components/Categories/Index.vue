<template>
  <div class="container container-cats">
    <div class="row">
      <div class="col-lg-12 pt-4 text-center">
        <p class="p-ques">Gestionar categorías</p>
      </div>
      <div class="col-lg-12 pt-5">
        <table class="table table-trivapp">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Imagen</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in allCategories" :key="category._id">
              <td>{{ index }}</td>
              <td>{{ category.name }}</td>
              <td>{{ category.file }}</td>
              <td>
                <DropdownCategories :id="category._id" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { endpoint, bearerHeader } from "../../../backend/api";
import DropdownCategories from "../UIComponents/DropdownCategories.vue";
import { useStore } from "vuex";
export default {
  components: {
    DropdownCategories,
  },
  setup() {
    const state = reactive({
      isActive: false,
    });
    const store = useStore();
    const getAllCategories = async () => {
      const getData = await fetch(endpoint + "get-all-categories", {
        method: "get",
        headers: {
          Authorization: bearerHeader,
        },
      });
      if (getData.status == 200) {
        const data = await getData.json();
        store.dispatch("SET_CATEGORY_A", data.all_categories);
      }
    };
    getAllCategories();

    return {
      ...toRefs(state),
      allCategories: computed(() => store.state.allCategories),
    };
  },
};
</script>
<style>
.p-ques {
  color: white;
  font-size: 30px;
  font-weight: bold;
}
.table-trivapp {
  --bs-table-bg: #192841;
  --bs-table-striped-bg: #192841;
  --bs-table-striped-color: #fff;
  --bs-table-active-bg: #192841;
  --bs-table-active-color: #fff;
  --bs-table-hover-bg: #192841;
  --bs-table-hover-color: #fff;
  color: #fff;
  border-color: #192841;
}
</style>