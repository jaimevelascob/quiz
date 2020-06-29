<template>
  <div>
    <div id="nav">
      <div class="capa">
        <div class="links">
          <router-link to="/CreateChallenge">Crear reto</router-link>|
          <router-link to="/challenges">Lista De Retos</router-link>|
          <router-link id="link" :to="{ name: 'Profile', params:{ id: this.userID }}">Mi perfil</router-link>|
          <router-link to="/about">About</router-link>|
        </div>
        <div class="users">
          <!-- NOMBRE USER -->
          <p>{{nombreUsuario}}</p>
          <button v-show="nomodal" id="link" class="myButton" @click="loginUser()">Login</button>
          <button v-show="modal" id="link" class="myButton" @click="logoutUser()">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// LIMPIAR LOG
import { clearLogin } from "../api/utils";
export default {
  name: "MenuCustom",
  data() {
    return {
      nombreUsuario: "",
      modal: true,
      nomodal: true
    };
  },
  methods: {
    logoutUser() {
      clearLogin();
      this.$router.push("/");
      return;
    },
    loginUser() {
      this.$router.push("/");
    },
    getUserName() {
      this.nombreUsuario = localStorage.getItem("name");
      if (localStorage.getItem("id")) {
        this.userID = localStorage.getItem("id");
        this.modal = true;
        this.nomodal = false;
      } else {
        this.userID = 0;
        this.modal = false;
        this.nomodal = true;
      }
    }
  },
  data() {
    return {
      adminroutes: false,
      nombreUsuario: "",
      userID: 0
    };
  },
  created() {
    this.getUserName();
  }
};
</script>

<style scoped>
</style>
