<template>
  <div>
    <!-- MENU-->
    <div>
      <Menu></Menu>
    </div>
    <!-- /MENU-->

    <div class="pad">
      <div class="primero">
        <div class="capauno">
          <div class="pregunta">
            <h1>Pregunta</h1>
            <input class="input" type="text" name="text" v-model="text" placeholder="Pregunta..." />
          </div>

          <div class="capa">
            <!-- PREGUNTA A-->
            <div class="preguntaA">
              <h2>Respuesta</h2>
              <input
                class="prega"
                type="answer"
                name="answer"
                v-model="answerA"
                placeholder="Respuesta A..."
              />
              <input
                class="prego"
                type="radio"
                id="a"
                value="A"
                v-model="solution"
                @click="pulse()"
              />
              <label class="labela" for="A">A</label>
            </div>
            <!-- PREGUNTA B-->
            <div class="preguntaB">
              <h2>
                Respuesta
                <B></B>
              </h2>
              <input
                class="prega"
                type="answer"
                name="answer"
                v-model="answerB"
                placeholder="Respuesta B..."
              />
              <input
                class="prego"
                type="radio"
                id="b"
                value="B"
                v-model="solution"
                @click="pulse()"
              />
              <label class="labelb" for="B">B</label>
            </div>
            <!-- PREGUNTA C-->
            <div class="preguntaC">
              <h2>Respuesta</h2>
              <input
                class="prega"
                type="answer"
                name="answer"
                v-model="answerC"
                placeholder="Respuesta C..."
              />
              <input
                class="prego"
                @click="pulse()"
                type="radio"
                id="c"
                value="C"
                v-model="solution"
              />
              <label class="labelc" for="C">C</label>
            </div>
            <!-- PREGUNTA D-->
            <div class="preguntaD">
              <h2>Respuesta</h2>
              <input
                class="prega"
                type="answer"
                name="answer"
                v-model="answerD"
                placeholder="Respuesta D..."
              />
              <input
                class="prego"
                @click="pulse()"
                type="radio"
                id="d"
                value="D"
                v-model="solution"
              />
              <label class="labeld" for="D">D</label>
            </div>
          </div>
        </div>
      </div>
      <div class="botones">
        <button class="botoncitos" @click="push">Volver</button>
        <button class="botoncitos" @click="uploadEvent()">Crear</button>
        <button class="but" @click="deleteCha()">DELETE</button>
        <p class="color1" v-show="required">Tienes datos sin completar</p>
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
import Footer from "@/components/FooterDos.vue";
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
          location.reload();
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
      if (
        this.solution == "A" ||
        this.solution == "B" ||
        this.solution == "C" ||
        this.solution == "D"
      )
        return this.solution;
    },
    // ELIMINAR CHALLENGE
    deleteChallenge() {
      let self = this;
      axios
        .delete("http://localhost:3000/challenge/" + self.$route.params.id)
        .then(function(response) {
          Swal.fire({
            icon: "success",
            title: "challenge eliminado",
            text: "Este challenge ha sido eliminado existe",
            confirmButtonText: "Ok"
          });
          this.$router.push("/challenges");
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    deleteCha() {
      Swal.fire({
        title: "Estás seguro?",
        text: "No prodras recuperar tus datos una vez eliminados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,eliminar!"
      }).then(result => {
        if (result.value) {
          this.deleteChallenge();
          Swal.fire(
            "Borrado!",
            "El challenge fue eliminado con éxito",
            "success"
          );
          this.$router.push("/challenges");
        }
      });
    }
  },
  created() {
    this.getChallenge();
    this.getUserName();
  }
};
</script>

<style scoped>
/* card */
.pad {
  padding: 9.8rem;
  background-image: url(../assets/quest.jpg);
}
.capa {
  display: flex;
  flex-direction: row;
  background: rgba(0, 0, 0, 0.1);
  justify-content: space-around;
}
.input {
  background: rgba(0, 0, 0, 0.255);
}

.capados {
  background: rgb(255, 255, 255);
}
.primero {
  display: flex;
  flex-direction: column;
}
/* pregunta */

.pregunta h1 {
  font-size: 50px;
  letter-spacing: 2.5px;
}
.pregunta input {
  width: 100%;
  font-size: 30px;
  letter-spacing: 3.5px;
  color: white;
}
.preguntaA {
  box-shadow: rgb(33, 196, 187) 0px -4px inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.255);
  margin-top: 3rem;
  color: white;
}
.preguntaB {
  box-shadow: rgb(107, 184, 35) 0px -4px inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.255);
  margin-top: 3rem;
  color: white;
}
.preguntaC {
  box-shadow: rgb(194, 170, 34) 0px -4px inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.255);
  margin-top: 3rem;
  color: white;
}
.preguntaD {
  color: white;
  box-shadow: rgb(243, 58, 33) 0px -4px inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.255);
  margin-top: 3rem;
}
.capa h2 {
  font-size: 25px;
  letter-spacing: 2.5px;
}
.preguntaA h2::first-letter {
  color: rgb(33, 196, 187);
}
.preguntaB h2::first-letter {
  color: rgb(107, 184, 35);
}
.preguntaC h2::first-letter {
  color: rgb(194, 170, 34);
}
.preguntaD h2::first-letter {
  color: rgb(243, 58, 33);
}
.prega {
  padding: 1rem;
  width: 100%;
  font-size: 20px;
  letter-spacing: 3.5px;
  background: rgba(0, 0, 0, 0.255);
  color: white;
}
.prego {
  color: white;
  margin-top: 1rem;
}
.labela {
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: rgb(0, 255, 242);
  font-size: 40px;
}
.labelb {
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: rgb(107, 184, 35);
  font-size: 40px;
}
.labelc {
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: rgb(194, 170, 34);
  font-size: 40px;
}
.labeld {
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: rgb(243, 58, 33);
  font-size: 40px;
}

/* respuesta correcta */

.botones {
  padding: 1.5rem;
  display: flex;
  justify-content: space-around;
}
.botoncitos {
  cursor: pointer;
  box-shadow: rgba(224, 73, 73, 0.25) 0px -4px inset;
  color: rgb(51, 51, 51);
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  min-width: 42px;
  min-height: 52px;
  line-height: 0.875rem;
  background: rgb(255, 255, 255);
  border-radius: 40px;
  text-decoration: none;
  padding: 0px 16px 4px;
}
.but {
  cursor: pointer;
  box-shadow: rgba(192, 13, 13, 0.25) 0px -4px inset;
  color: rgb(192, 39, 39, 0.85);
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  min-width: 42px;
  min-height: 22px;
  line-height: 0.875rem;
  background: rgb(255, 255, 255);
  border-radius: 40px;
  text-decoration: none;
  padding: 0px 16px 4px;
}
.color1 {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(22, 65, 160);
  letter-spacing: 3px;
}
</style>