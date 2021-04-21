<template>
  <div class="container">
    <div class="row">
      <NavL />
      <div class="col-lg-12 pt-4">
        <div class="col-lg-12 pt-4">
          <h3 class="text-center pt-4 p-name">
            <span class="emoji-s">&#9996;</span>Hola, {{ name }}
          </h3>
        </div>
        <div class="col-lg-4 mx-auto my-auto ba-white">
          <img src="../assets/trivapp.png" class="mx-auto d-block pt-3" />
          <form class="pt-3">
            <div class="mb-3">
              <label for="name" class="visually-hidden">Nombre</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nombre"
                v-model="name"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="visually-hidden">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="visually-hidden">Contraseña</label>
              <input
                type="password"
                id="password"
                class="form-control"
                placeholder="Contraseña"
                v-model="password"
                @keyup.enter="addUser"
              />
            </div>
            <button
              class="w-100 btn btn-lg btn-trivapp"
              type="button"
              @click.prevent="addUser"
            >
              Confirmar
            </button>
            <p class="mt-1 mb-3 text-center text-muted">©2021</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { endpoint } from "../../backend/api";
import NavL from "../components/Layout/NavL";
export default {
  components: {
    NavL,
  },
  setup() {
    const state = reactive({
      name: "",
      email: "",
      password: "",
    });
    const route = useRoute();
    const $swal = inject("$swal");

    const addUser = async () => {
      const sendUserData = {
        name: state.name,
        email: state.email,
        password: state.password,
      };
      const sendUser = await fetch(endpoint + "sign-up", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendUserData),
      });
      const data = await sendUser.json();
      if (sendUser.status == 200) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: data.user.name,
              email: data.user.email,
              _id: data.user._id,
              rol: data.user.rol,
            })
          );
          $swal({
            icon: "success",
            title: "Buen trabajo.",
            text: "Has creado tu usuario correctamente.",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/dashboard");
            }
          });
        }
      } else if (sendUser.status == 409) {
        $swal({
          icon: "error",
          title: "Parece que algo ha ido mal.",
          text: data.message,
        });
      } else {
        $swal({
          icon: "error",
          title: "Parece que algo ha ido mal.",
          text: "Tu usuario o contraseña no es válida.",
        });
      }
    };
    return {
      ...toRefs(state),
      addUser,
      route,
    };
  },
};
</script>
<style scoped>
.p-name {
  color: white;
}
.emoji-s {
  font-size: 40px;
}
.ba-white {
  background-color: white;
  padding: 10px;
  border-radius: 30px;
}
.form-control {
  border-radius: 8px !important;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.btn-trivapp {
  color: #fff;
  background-color: #192841;
  border-color: #192841;
}
.btn-trivapp:hover {
  color: #192841;
  background-color: #fff;
  border-color: #192841;
}
.btn:hover {
  color: #192841;
}
</style>