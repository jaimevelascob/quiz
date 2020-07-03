<template>
  <div>
    <!-- MENU-->
    <div>
      <Menu></Menu>
    </div>
    <!-- /MENU-->

    <div class="pad">
      <div>
        <p class="color1" v-show="required">Tienes datos sin completar</p>
        <p class="color2" v-show="match">Las contraseñas no coinciden</p>
        <div v-show="modal">
          <input type="text" id="times" v-model=" user_id = this.userID" />
        </div>
        <div>
          <input type="title" name="title" v-model="title" placeholder="Nombre del reto..." />
        </div>
      </div>
      <div>
        <!-- TIME-DIFICULTY -->
        <div>
          <!-- DIFICULTAD -->

          <div>
            <h4>DIFICULTAD</h4>
            <select v-model="difficulty" multiple>
              <option value="facil">facil</option>
              <option value="medio">medio</option>
              <option value="dificl">dificl</option>
            </select>
            <br />
          </div>
        </div>
        <!-- TIME-DIFICULTY -->
        <div>
          <div>
            <h4>TIEMPO</h4>
            <!-- TIEMPO -->
            <select v-model="time">
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
              <option>60</option>
            </select>
            <br />
          </div>
        </div>
        <!-- SUBIR IMAGEN -->
        <div>
          <label for="image">Elije una imagen:</label>
          <input
            type="file"
            id="file"
            ref="file"
            accept="image/png, image/jpg"
            v-on:change="handleFileUpload()"
          />
        </div>
      </div>
      <div>
        <button @click="uploadEvent()">Crear</button>
        <!-- <router-link :to="{ name: 'Login' }">Login</router-link> -->
      </div>
    </div>
    <!-- Footer-->
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";
// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
// IMPORTANDO Footer
import Footer from "@/components/Footer.vue";
// Importando funcion addChallenge
import { addChallenge } from "../api/utils";
export default {
  name: "ChallengeQuestions",
  components: { Menu, Footer },
  data() {
    return {
      title: "",
      user_id: "",
      correctData: false,
      required: false,
      match: false,
      file: "",
      difficulty: [],
      modal: "",
      time: ""
    };
  },
  methods: {
    getUserName() {
      if (localStorage.getItem("id")) {
        this.userID = localStorage.getItem("id");
        this.modal = false;
      } else {
        this.userID = 0;
        this.modal = true;
      }
    },
    //COMPROBAR QUE LOS DATOS NO ESTÁN VACIOS
    validatingData() {
      if (this.title === "" || this.difficulty === "") {
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
    async uploadEvent() {
      console.log(this.file);
      this.validatingData();
      if (this.correctData) {
        try {
          const photoFormData = new FormData();
          // dict of all elements
          photoFormData.append("title", this.title);
          photoFormData.append("difficulty", this.difficulty);
          photoFormData.append("user_id", this.user_id);
          photoFormData.append("time", this.time);
          //GUARDAR LA SOLUCION EN LOCALSTORAGE
          localStorage.setItem("user_id", this.user_id);
          if (this.file.length) {
            photoFormData.append("photo", this.file);
            console.log(this.file);
          }
          //GUARDAR EL TITLE/TIME EN LOCALSTORAGE
          localStorage.setItem("title", this.title);
          await addChallenge(photoFormData);
          Swal.fire({
            icon: "success",
            title: "Has subido tu challenge!",
            text: "Buscalo en el home para jugarlo!"
          });
          this.$router.push("/challenges");
        } catch (error) {
          alert(error.response.data.message);
        }
      }
      return;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    //LIMPIAR CAMPOS INPUT
    emptyFields() {
      (this.answerA = ""),
        (this.answerB = ""),
        (this.answerC = ""),
        (this.answerD = ""),
        (this.time = ""),
        (this.text = "");
      //MENSAJE SWAL
      this.$router.push("/challenges");
    }
  },
  created() {
    this.getUserName();
  }
};
</script>

<style scoped>
.pad {
  padding: 10rem;
}
</style>