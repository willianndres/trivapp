<template>
  <div class="container container-cats">
    <div class="row">
      <div class="col-lg-12 pt-4 text-center">
        <p class="p-ques">Adicionar categorías</p>
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
import router from "../../router/index";
export default {
  setup() {
    const $swal = inject("$swal");
    const state = reactive({
      name: "",
      file: [],
    });
    const cFile = (event) => {
      state.file = event.target.files[0];
    };
    const sendDataCategories = async () => {
      let formData = new FormData();
      formData.append("name", state.name);
      formData.append("file", new Blob([state.file], { type: "image/png" }));
      const sendData = await fetch(endpoint + "add-category", {
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