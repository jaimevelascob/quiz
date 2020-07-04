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
          <div>
            <div class="pregunta">
              <input class="input" type="text" name="text" v-model="text" placeholder="Pregunta..." />
            </div>
            <!-- PREGUNTA A-->
            <div class="respuestas">
              <div class="preguntaA">
                <input type="answer" name="answer" v-model="answerA" placeholder="Respuesta A..." />
              </div>
              <!-- PREGUNTA B-->
              <div class="preguntaB">
                <input type="answer" name="answer" v-model="answerB" placeholder="Respuesta B..." />
              </div>
              <!-- PREGUNTA C-->
              <div class="preguntaC">
                <input type="answer" name="answer" v-model="answerC" placeholder="Respuesta C..." />
              </div>
              <!-- PREGUNTA D-->
              <div class="preguntaD">
                <input type="answer" name="answer" v-model="answerD" placeholder="Respuesta D..." />
              </div>
            </div>
          </div>
          <div>
            <!-- CHECKBOX -->
            <h2>Selecciona la respuesta</h2>
            <div id="checkbox">
              <input type="radio" id="a" value="A" v-model="solution" @click="pulse()" />
              <label for="A">A</label>
              <br />
              <input type="radio" id="b" value="B" v-model="solution" @click="pulse()" />
              <label for="B">B</label>
              <br />
              <input @click="pulse()" type="radio" id="c" value="C" v-model="solution" />
              <label for="C">C</label>
              <br />
              <input @click="pulse()" type="radio" id="d" value="D" v-model="solution" />
              <label for="D">D</label>
              <br />
            </div>
          </div>
          <div class="botones">
            <button @click="uploadEvent()">Crear</button>
            <button @click="push">Volver</button>
            <p class="color1" v-show="required">Tienes datos sin completar</p>
            <!-- <router-link :to="{ name: 'Login' }">Login</router-link> -->
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
import { addChallengeQuestion } from "../api/utils";
//IMPORTANDO meetingS
import challengelist from "@/components/ChallengeList.vue";
export default {
  name: "ChallengeQuestions",
  components: { Menu, challengelist, Footer },
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
        this.text === "" ||
        this.answerA === "" ||
        this.answerB === "" ||
        this.answerD === "" ||
        this.answerC === ""
      ) {
        this.correctData = false;
        this.required = true;
        // SI LA PASS NO ES =
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
          photoFormData.append("title", this.challenges[0].title);
          photoFormData.append("text", this.text);
          photoFormData.append("answerA", this.answerA);
          photoFormData.append("answerB", this.answerB);
          photoFormData.append("answerC", this.answerC);
          photoFormData.append("answerD", this.answerD);
          photoFormData.append("solution", this.solution);
          photoFormData.append("user_id", this.userID);
          photoFormData.append("challenge_id", this.challenges[0].id);
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
        (this.text = "");
      //MENSAJE SWAL
      this.$router.push("/challenges");
    },
    pulse() {
      this.validatingData();
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
/* card */
.pad {
  padding: 9rem;
  background-image: url(../assets/fondo3.jpg);
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
  background: rgb(238, 161, 130);
  box-shadow: 4px 3px 15px #7dc965;
}
/* pregunta */
.input {
  border-radius: 4px;
  box-shadow: 1px 1px 2px #333333;
  background: #ffffff;
  border: 1px solid #000000;
  width: 700px;
  height: 30px;
  align-items: center;
  text-align: center;
}
.pregunta {
  padding: 1.5rem;
  margin-bottom: auto;
}
/* respuestas */
.respuestas {
  background: #7dc965;
  display: block;
  margin: auto;
}
.respuestas div {
  padding: 1.5rem;
  margin-bottom: auto;
}
/* respuestas*/
.respuestas input {
  border-radius: 4px;
  box-shadow: 1px 1px 2px #333333;
  background: #ffffff;
  border: 1px solid #000000;
  width: 700px;
  height: 30px;
  align-items: center;
  text-align: center;
}
/* respuesta correcta */
#checkbox {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.botones {
  padding-bottom: 1.2rem;
}
.color1 {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(150, 46, 5);
  letter-spacing: 3px;
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