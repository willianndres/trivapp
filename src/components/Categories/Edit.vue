<template>
  <div class="container container-cats">
    <div class="row">
      <div class="col-lg-12 pt-4 text-center">
        <p class="p-ques">Editar categoría</p>
      </div>
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-6 form-group">
            <label class="label-cats">Nombre</label>
            <input
              type="text"
              name="name"
              v-model="name"
              class="form-control"
            />
          </div>
          <div class="col-lg-6 form-group">
            <label class="label-cats">Imagen</label>
            <input
              type="file"
              name="image"
              @change="cFile"
              class="form-control"
            />
          </div>
          <div class="col-lg-12 text-center form-group pt-5">
            <button class="btn btn-primary" @click.prevent="sendDataCategories">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs } from "vue";
import { endpoint, bearerHeader } from "../../../backend/api";
import { useRoute } from "vue-router";
import router from "../../router/index";
export default {
  setup() {
    const $swal = inject("$swal");
    const route = useRoute();
    const state = reactive({
      name: "",
      file: false,
    });
    const getCategory = async () => {
      const getData = await fetch(
        endpoint + "get-category-by-id/" + route.params.id,
        {
          method: "get",
          headers: {
            Authorization: bearerHeader,
          },
        }
      );
      if (getData.status == 200) {
        const data = await getData.json();
        state.name = data.category_object.name;
      }
    };
    getCategory();
    const cFile = (event) => {
      state.file = event.target.files[0];
    };
    const sendDataCategories = async () => {
      let formData = new FormData();
      formData.append("name", state.name);
      if (state.file != false) {
        formData.append("file", new Blob([state.file], { type: "image/png" }));
      } else {
        formData.append("file", "");
      }
      formData.append("id", route.params.id);
      const sendData = await fetch(endpoint + "update-category", {
        method: "post",
        headers: {
          Authorization: bearerHeader,
        },
        body: formData,
      });
      if (sendData.status == 200) {
        const data = await sendData.json();
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
    };
    return {
      ...toRefs(state),
      cFile,
      sendDataCategories,
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
.label-cats {
  color: white;
}
</style>