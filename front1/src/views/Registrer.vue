<template>
  <div class="register">
    <div class="registerBox">
      <Menu></Menu>
      <h2>Registrate</h2>
      <p class="color1" v-show="required">Tienes datos sin completar</p>
      <p class="color2" v-show="match">Las contraseñas no coinciden</p>
      <input type="email" name="email" v-model="email" placeholder="Email..." />
      <br />
      <input type="nickName" name="nickName" v-model="nickName" placeholder="nickName..." />
      <br />
      <input type="password" name="password" v-model="password" placeholder="Password..." />
      <br />
      <input
        type="password"
        name="password"
        v-model="repeatpassword"
        placeholder="Repeat password..."
      />
      <br />
      <div>
        <button @click="addUser(email, password, nickName)">Registro</button>
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";

// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
export default {
  name: "Registrer",
  components: { Menu },
  data() {
    return {
      email: "",
      nickName: "",
      password: "",
      repeatpassword: "",
      correctData: false,
      required: false,
      match: false
    };
  },
  methods: {
    //COMPROBAR QUE LOS DATOS NO ESTÁN VACIOS
    validatingData() {
      if (
        this.email === "" ||
        this.password === "" ||
        this.repeatpassword === "" ||
        this.nickName === ""
      ) {
        this.correctData = false;
        this.required = true;
        // SI LA PASS NO ES =
      } else if (this.password != this.repeatpassword) {
        this.match = true;
        // SI LA PASS ES =
      } else {
        this.correctData = true;
        this.required = false;
        this.match = false;
      }
    },
    //AÑADIR NUEVO USUARIO A LA BBDD
    addUser(email, password, nickName) {
      this.validatingData();
      if (this.correctData == true) {
        let self = this;
        axios
          .post("http://localhost:3000/clients", {
            email: self.email,
            password: self.password,
            nickName: self.nickName
          })
          .then(function(response) {
            self.emptyFields();
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500
            }).then(result => location.reload());
          })
          .catch(function(error) {
            alert(`Error: ${error.response.data.message}`);
          });
      } else {
        console.log("No has rellenado todos los campos");
      }
    },
    //LIMPIAR CAMPOS INPUT
    emptyFields() {
      (this.email = ""), (this.password = ""), (this.nickName = "");
      //MENSAJE SWAL
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.register {
  padding: 1rem;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.registerBox {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 0 auto;
}
img {
  height: 500px;
  width: 500px;
  border-radius: 20px;
}
input {
  width: 80%;
  align-self: center;
  margin: 0.5rem;
  border: 2px solid white;
  border-radius: 20px;
}
input:focus {
  outline: none;
}
button {
  width: 80px;
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
  color: #42b983;
  text-decoration: none;
}
.color1 {
  color: #ff0000;
}
.color2 {
  color: rebeccapurple;
}
h2 {
  padding-bottom: 1rem;
  font-size: 2rem;
}
</style>
