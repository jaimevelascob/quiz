<template>
  <div>
    <div class="login">
      <div class="lug">
        <!-- MENU -->
        <div>
          <Menu></Menu>
        </div>

        <div class="loge">
          <div class="reg">
            <h2>Registrate</h2>
          </div>
          <!-- NOMBRE DE LA PAGINA -->
          <!-- <vue-headful title="Loging" description="Logging page" /> -->
          <!-- /NOMBRE DE LA PAGINA -->
          <div class="log">
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
            <div class="botones">
              <button @click="addUser(email, password, nickName)">Registro</button>
              <router-link :to="{ name: 'Login' }">Login</router-link>
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
import axios from "axios"; // Importando AXIOS
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";

// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
import FooterDos from "@/components/FooterDos.vue";
export default {
  name: "Registrer",
  components: { Menu, FooterDos },
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
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.login {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/astronautados.jpg);
}
.loge {
  border-radius: 10%;
  display: flex;
  padding: 10rem;
  align-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.0333);
  margin-bottom: 0.5rem;
}
.lug {
  background-image: url(../assets/astronauta.jpg);
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.077);
}
.reg {
  background: rgba(0, 0, 0, 0.077);
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
  background-color: #5100ba;
  border: 2px solid #d6cdb6;
  border-radius: 20px;
  padding: 0.5rem;
  margin: 0.667rem;
  font-weight: bold;
}
button:hover {
  background: #3faf28;
  color: white;
  border: 2px solid #d6cdb6;
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
.color1 {
  color: #ffffff;
}
.color2 {
  font-size: 15px;
  color: rgb(255, 255, 255);
}
</style>
