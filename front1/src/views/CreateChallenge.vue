<template>
  <div>
    <!-- MENU-->
    <div>
      <Menu></Menu>
    </div>
    <!-- /MENU-->

    <div class="pad">
      <div class="primero">
        <div class="capa">
          <div class="title">
            <div v-show="modal">
              <input type="text" id="times" v-model=" user_id = this.userID" />
            </div>
            <div class="titlep">
              <input
                class="input"
                type="title"
                name="title"
                v-model="title"
                placeholder="Nombre del reto..."
              />
            </div>
          </div>
          <div>
            <!-- TIME-DIFICULTY -->
            <div class="dificultad">
              <!-- DIFICULTAD -->
              <h4>DIFICULTAD</h4>
              <select class="dif" v-model="difficulty" multiple>
                <option value="fácil">fácil</option>
                <option value="medio">medio</option>
                <option value="difícil">difícil</option>
              </select>
              <br />
            </div>
            <!-- TIME-DIFICULTY -->
            <div>
              <div class="tiempo">
                <h4>TIEMPO</h4>
                <!-- TIEMPO -->
                <select class="caja" v-model="time">
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
            <div class="image">
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
          <div class="button">
            <button @click="uploadEvent()">Crear</button>
            <p class="color1" v-show="required">Tienes datos sin completar</p>
          </div>
        </div>
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
.input {
  border-radius: 4px;
  box-shadow: 1px 1px 2px #333333;
  background: #ffffff;
  border: 1px solid #000000;
  width: 150px;
  height: 30px;
  align-items: center;
  text-align: center;
}
.pad {
  padding: 10rem;
  background-image: url(../assets/fondo.jpg);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.capa {
  background: rgb(255, 255, 255);
  border-radius: 5%;
  box-shadow: 4px 3px 15px rgb(238, 164, 130);
}
.primero {
  width: 50%;
  background: rgb(238, 164, 130);
  box-shadow: 4px 3px 15px #7dc965;
}
.title {
  padding: 1.5rem;
  margin-bottom: auto;
}
.dificultad h4 {
  letter-spacing: 3px;
  margin: 20px auto 40px auto;
  border: 1px solid #d9d9d9;
  height: 30px;
  overflow: hidden;
  width: 230px;
  position: relative;
}
.tiempo h4 {
  letter-spacing: 3px;
  height: 25px;
  overflow: hidden;
  position: relative;
}
.caja {
  margin: 20px auto 40px auto;
  border: 1px solid #d9d9d9;
  height: 30px;
  overflow: hidden;
  width: 230px;
  display: flex;
  align-items: center;
}
.caja::after {
  content: "\025be";
  display: table-cell;
  padding-top: 7px;
  text-align: center;
  width: 30px;
  height: 30px;
  background-color: #d9d9d9;
  position: absolute;
  top: 0;
  right: 0px;
  pointer-events: none;
}

.dificultad select {
  letter-spacing: 2.5px;
  text-align: center;
  background: #edf1e0;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  height: 80px;
  padding: 5px;
  width: 250px;
  box-shadow: 1px 1px 2px #333333;
}

select:focus {
  outline: none;
}
.image {
  padding-bottom: 25px;
}
.button {
  padding-bottom: 102px;
}
.color1 {
  color: rgb(51, 150, 5);
  -webkit-animation: pulsate 3s ease-in-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0.3;
}
@-webkit-keyframes pulsate {
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.9;
  }
}
</style>