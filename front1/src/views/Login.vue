<template>
  <div>
    <div class="login">
      <div class="lug">
        <!-- MENU -->
        <div>
          <Menu></Menu>
        </div>

        <div class="loge">
          <h2>Haz login</h2>
          <!-- NOMBRE DE LA PAGINA -->
          <!-- <vue-headful title="Loging" description="Logging page" /> -->
          <!-- /NOMBRE DE LA PAGINA -->
          <div class="log">
            <input type="text" name="usuario" v-model="usuario" placeholder="email..." />
            <input type="password" name="password" v-model="password" placeholder="Password..." />
            <div class="botones">
              <button @click="login()">Login</button>
              <router-link :to="{ name: 'Registrer' }">Registro</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <FooterDos></FooterDos>
    </div>
  </div>
</template>

<script>
import { loginUser } from "../api/utils";
import Menu from "@/components/MenuCustom.vue";
import FooterDos from "@/components/FooterDos.vue";
export default {
  name: "Login",
  components: { Menu, FooterDos },
  data() {
    return {
      usuario: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        if (this.usuario === "" || this.password === "")
          throw Error("Datos vacios");
        await loginUser(this.usuario, this.password);
        //GUARDAR EL EMAIL EN LOCALSTORAGE
        localStorage.setItem("name", this.usuario);

        //LLEVAR A LA PAGINA DE PRODUCTOS
        this.$router.push("/challenges");
      } catch (error) {
        alert(` ${error.response.data.message}`);
      }
    }
  }
};
</script>

<style scoped>
.login {
  padding: 6.3rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/astronauta.jpg);
}
.loge {
  border-radius: 10%;
  display: flex;
  padding: 10rem;
  align-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.0333);
}
.lug {
  background-image: url(../assets/astronauta.jpg);
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.log {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  grid-area: box;
  margin: 0 auto;
}
.title {
  grid-area: head;
}
h2:first-letter {
  color: #5100ba;
  font-size: 3rem;
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
  background-color: #5100ba;
  color: white;
  border: 2px solid gray;
}
button:focus {
  outline: none;
}
a {
  background: rgba(0, 0, 0, 0.4);
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
a:hover {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.6);
}
input {
  width: 100%;
  text-align: center;
  align-self: center;
  margin: 1rem;
  font-size: 1rem;
  border: 1px solid rgb(185, 180, 180);
}
h2 {
  padding-bottom: 1rem;
  font-size: 2rem;
  letter-spacing: 3px;
  color: #d6cdb6;
}
</style>
