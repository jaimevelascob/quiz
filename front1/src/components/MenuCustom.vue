<template>
  <div>
    <div class="nav">
      <img class="log" src="../assets/Logo.jpeg" alt />
      <nav class="links">
        <ul>
          <li>
            <router-link to="/CreateChallenge">Crear reto</router-link>|
          </li>
          <li>
            <router-link to="/challenges">Lista De Retos</router-link>|
          </li>
          <li>
            <router-link id="link" :to="{ name: 'Profile', params:{ id: this.userID }}">Mi perfil</router-link>|
          </li>
          <li>
            <router-link to="/instrucciones">Instrucciones</router-link>|
          </li>
          <li>
            <router-link to="/about">About</router-link>|
          </li>
        </ul>
      </nav>
      <div class="users">
        <!-- NOMBRE USER -->

        <p>{{nombreUsuario}}</p>

        <button v-show="nomodal" id="link" class="myButton" @click="loginUser()">Login</button>
        <button v-show="modal" id="link" class="myButton" @click="logoutUser()">Logout</button>
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
.nav {
  background: #333;
  color: rgb(248, 229, 229);
  height: 80px;

  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
}
.nav a {
  color: rgb(255, 255, 255);
}
.log {
  text-decoration: none;
  float: left;
  background: rgb(123, 173, 73);
  margin: auto;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0.5rem;
  border: solid 2px #fff;
  border-radius: 10%;
}
.log:hover {
  color: #0b76a6;
}
nav {
  float: right;
}
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
  padding-right: 20px;
}

nav ul li {
  display: inline-block;
  line-height: 80px;
}

nav ul li a {
  letter-spacing: 3px;
  display: block;
  padding: 0 60px;
  text-decoration: none;
}

nav ul li a:hover {
  background: #0b76a6;
}
</style>
