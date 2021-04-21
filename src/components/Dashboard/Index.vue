<template>
  <div class="container container-cats">
    <div class="row">
      <div class="col-lg-12 pt-4 text-center">
        <p class="p-ques">Selecciona la categoría</p>
      </div>
    </div>
  </div>
</template>

<script>
/* import { endpoint, bearerHeader } from "../../../backend/api"; */
export default {
  setup() {
    /*    const getAllCats = async () => {
      const allCats = await fetch(endpoint + "get_all_category", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: bearerHeader,
        },
      });
      console.log(allCats);
    };
    getAllCats(); */

    return {};
  },
};
</script>

<style>
.p-ques {
  color: white;
  font-size: 30px;
  font-weight: bold;
}

</style>