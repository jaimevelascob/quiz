<template>
  <div>
    <!-- MENU-->
    <div>
      <Menu></Menu>
    </div>
    <!-- /MENU-->

    <div>
      <div>
        <p class="color1" v-show="required">Tienes datos sin completar</p>
        <p class="color2" v-show="match">Las contraseñas no coinciden</p>
        <div v-show="modal">
          <input type="text" id="title" v-model="time = this.challenges[0].time" />
        </div>
        <div v-show="modal">
          <input type="text" id="title" v-model="title = this.challenges[0].title" />
        </div>
        <div v-show="modal">
          <input type="text" id="title" v-model="challenge_id = this.challenges[0].id" />
        </div>
        <div v-show="modal">
          <input type="text" id="times" v-model=" user_id = this.userID" />
        </div>
        <div>
          <input type="text" name="text" v-model="text" placeholder="Pregunta..." />
        </div>
        <!-- PREGUNTA A-->
        <div>
          <ul>
            <li>
              <input type="answer" name="answer" v-model="answerA" placeholder="Question A..." />
            </li>
            <li>
              <img src />
            </li>
          </ul>
        </div>
        <!-- PREGUNTA B-->
        <div>
          <ul>
            <input type="answer" name="answer" v-model="answerB" placeholder="Question B..." />
            <li>
              <img src />
            </li>
          </ul>
        </div>
        <!-- PREGUNTA C-->
        <div>
          <ul>
            <input type="answer" name="answer" v-model="answerC" placeholder="Question C..." />
            <li>
              <img src />
            </li>
          </ul>
        </div>
        <!-- PREGUNTA D-->
        <div>
          <ul>
            <input type="answer" name="answer" v-model="answerD" placeholder="Question D..." />
          </ul>
        </div>
      </div>
      <div>
        <!-- CHECKBOX -->
        <h2>Selecciona la respuesta</h2>
        <div id="checkbox">
          <input type="radio" id="a" value="A" v-model="solution" @click="bottonFijar()" />
          <label for="A">A</label>
          <br />
          <input type="radio" id="b" value="B" v-model="solution" @click="bottonFijar()" />
          <label for="B">B</label>
          <br />
          <input @click="pulse()" type="radio" id="c" value="C" v-model="solution" />
          <label for="C">C</label>
          <br />
          <input @click="pulse()" type="radio" id="d" value="D" v-model="solution" />
          <label for="D">D</label>
          <br />
          <span>Eligió: {{ solution }}</span>
          <br />
        </div>
      </div>
      <div>
        <button @click="uploadEvent()">Crear</button>
        <button @click="push">Volver</button>

        <!-- <router-link :to="{ name: 'Login' }">Login</router-link> -->
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
// Importando funcion addChallenge
import { addChallengeQuestion } from "../api/utils";
//IMPORTANDO meetingS
import challengelist from "@/components/ChallengeList.vue";
export default {
  name: "ChallengeQuestions",
  components: { Menu, challengelist },
  data() {
    return {
      challenges: [],
      title: "",
      text: "",
      newtitle: "hola",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      correctData: false,
      required: false,
      match: false,
      time: "",
      file: "",
      solution: "",
      modal: "",
      user_id: "",
      challenge_id: ""
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
    // BOTON VOLVER
    push() {
      this.$router.push("/challenges");
    },
    //COMPROBAR QUE LOS DATOS NO ESTÁN VACIOS
    validatingData() {
      if (
        this.time === "" ||
        this.text === "" ||
        this.answerA === "" ||
        this.answerB === "" ||
        this.answerD === "" ||
        this.answerC === "" ||
        this.solution === ""
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
    async uploadEvent() {
      this.validatingData();
      if (this.correctData) {
        try {
          const photoFormData = new FormData();
          // dict of all elements
          photoFormData.append("title", this.title);
          photoFormData.append("text", this.text);
          photoFormData.append("answerA", this.answerA);
          photoFormData.append("answerB", this.answerB);
          photoFormData.append("answerC", this.answerC);
          photoFormData.append("answerD", this.answerD);
          photoFormData.append("time", this.time);
          photoFormData.append("solution", this.solution);
          photoFormData.append("user_id", this.user_id);
          photoFormData.append("challenge_id", this.challenge_id);
          if (this.file.length) {
            photoFormData.append("photo", this.file);
          }
          localStorage.removeItem("title");
          await addChallengeQuestion(photoFormData);
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
    // CONSEGUIR ANSWER
    async getChallenge() {
      let self = this;
      let data = localStorage.getItem("title", this.title);
      console.log(data);
      await axios
        .get("http://localhost:3000/challenge/" + self.$route.params.id)
        .then(function(response) {
          self.challenges = response.data.data;
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
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
    },
    bottonFijar() {
      this.pulse();

      // alert(this.solution);
      this.validatingData();
      if (this.correctData) {
        try {
          //GUARDAR LA SOLUCION EN LOCALSTORAGE
          localStorage.setItem("solucion", this.solution);
        } catch (error) {
          alert(error.response.data.message);
        }
      }
    },
    pulse() {
      let clear = document.getElementById("checkbox");
      if (
        this.solution == "A" ||
        this.solution == "B" ||
        this.solution == "C" ||
        this.solution == "D"
      )
        return this.solution;

      // COGER EL TITTLE PARA GUARDARLO
      let titulo = this.challenges[0].id;
    },
    // ESCONDER TITLE
    titleHind() {
      this.modal = false;
    }
  },
  created() {
    this.getChallenge();
    this.titleHind();
    this.getUserName();
    // this.validateQuestion();
  }
};
</script>

<style scoped>
</style>