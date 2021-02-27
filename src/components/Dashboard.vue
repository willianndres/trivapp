<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 pt-4">
        <p class="float-end b-white">Willian Candanoza</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 pt-4 text-center">
        <p class="p-ques">Selecciona la categoría</p>
      </div>
    </div>
  </div>
  <div
    class="d-flex flex-column pt-4 justify-content-center align-items-center"
  >
    <div class="row">
      <div class="col-lg-6">Hola</div>
      <div class="col-lg-6">Hola</div>
      <div class="col-lg-6">Hola</div>
      <div class="col-lg-6">Hola</div>
    </div>
  </div>
</template>

<script>
import { endpoint, bearerHeader } from "../../backend/api";
export default {
  setup() {
    const getAllCats = async () => {
      const allCats = await fetch(endpoint + "get_all_category", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: bearerHeader,
        },
      });
      console.log(allCats);
    };
    getAllCats();

    return {};
  },
};
</script>

<style scoped>
.p-ques {
  color: white;
  font-size: 30px;
  font-weight: bold;
}
.b-white {
  padding: 10px;
  border: 1px solid white;
  color: white;
  border-radius: 10px;
}
</style>