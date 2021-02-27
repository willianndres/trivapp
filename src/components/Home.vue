<template>
  <div class="container">
    <div class="row">
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
                @input="$emit('update:name', $event.target.value)"
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
                @input="$emit('update:email', $event.target.value)"
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
                @input="$emit('update:password', $event.target.value)"
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
import { ref } from "vue";
import router from "@/router";
import { endpoint } from "../../backend/api";
export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const addUser = async () => {
      const sendUserData = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      const sendUser = await fetch(endpoint + "register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendUserData),
      });

      if (sendUser.status == 200) {
        const data = await sendUser.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          router.push("/dashboard");
        } else {
          alert("Mala respuesta 2");
        }
      } else {
        alert("Mala respuesta");
      }
    };
    return {
      name,
      email,
      password,
      addUser,
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