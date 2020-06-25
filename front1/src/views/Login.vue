<template>
  <div class="login">
    <h2>Haz login</h2>
    <!-- NOMBRE DE LA PAGINA -->
    <vue-headful title="Loging" description="Logging page" />
    <!-- /NOMBRE DE LA PAGINA -->
    <div class="log">
      <input
        type="text"
        name="usuario"
        v-model="email"
        placeholder="email..."
      />
      <br />

      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="Password..."
      />
      <br />

      <button @click="login()">Login</button>
      <router-link :to="{ name: 'Register' }">Registro</router-link>
    </div>
  </div>
</template>

<script>
import { loginUser } from "../api/utils";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        if (this.email === "" || this.password === "")
          throw Error("Datos vacios");
        await loginUser(this.email, this.password);
        //GUARDAR EL EMAIL EN LOCALSTORAGE
        localStorage.setItem("Usuario", this.email);
        //LLEVAR A LA PAGINA DE PRODUCTOS
        this.$router.push("/");
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
  },
};
</script>

<style scoped>
.login {
  padding: 1rem;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 1rem;
  grid-area: box;
  margin: 0 auto;
}
.title {
  grid-area: head;
}
button {
  width: 100px;
  cursor: pointer;
  text-align: center;
  color: white;
  background: #3faf28;
  border: 2px solid #d6cdb6;
  border-radius: 20px;
  padding: 0.5rem;
  margin: 0.667rem;
  font-weight: bold;
}
button:hover {
  background-color: #008cba;
  color: white;
  border: 2px solid gray;
}
button:focus {
  outline: none;
}
a {
  color: #42a7b9;
  text-decoration: none;
}
input {
  width: 100%;
  align-self: center;
  margin: 0.5rem;
  border: 2px solid white;
}
h2 {
  padding-bottom: 1rem;
  font-size: 2rem;
}
</style>
