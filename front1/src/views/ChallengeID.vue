<template>
  <div class="capauno">
    <!-- MENU -->
    <div v-show="pulsarboton">
      <Menu></Menu>
    </div>
    <!-- /MENU -->
    <!-- ACEPTAR BUTTON -->

    <div class="aceptar" v-show="pulsarboton">
      <div class="rep">
        <h1>ESTÁS SEGURO DE QUE QUIERES EMPEZAR EL RETO?</h1>
        <button class="inicioButton" @click="settime()" value="inicio">INCIAR</button>
      </div>
      <!-- Footer-->
    </div>
    <div class="ruu">
      <Footer></Footer>
    </div>
    <!-- /ACEPTAR BUTTON -->
    <div v-show="capsula" class="awtestimonials">
      <!-- CRONOMETRO -->
      <div class="cronometro">
        <div class="timo">
          <div class="time">
            <div class="fulltime">
              <img
                class="img"
                src="https://image.flaticon.com/icons/svg/66/66175.svg"
                alt="cronometro"
              />
              <p class="timing" id="times">{{ this.questionTime[0].time }}</p>
              <!-- ULTIMATE -->
              <div v-show="ulti" class="ultimate">
                <img class="pause" src="../assets/cerebro4.jpeg" alt />
                <button class="buttoncito" @click="pausa()">Pausar</button>
                <p
                  :class="{ green: estado=== 'Ultimate disponible', red: estado=== 'Ultimate no disponible'}"
                >{{estado}}</p>
              </div>
            </div>
            <!-- /ULTIMATE -->
          </div>
        </div>
      </div>
      <!-- /CRONOMETRO -->

      <div>
        <h1 class="ult" v-show="ultimapregunta">Ultima Pregunta</h1>
      </div>
      <div class="text">
        <li>
          <h1>{{ challenges[q].text }}</h1>
        </li>
      </div>
      <!-- CHALLENGE RESPUESTAS -->
      <div class="pri">
        <div class="primerapregunta">
          <li class="liprimera">
            <p>{{ challenges[q].answerA }}</p>
            <input type="radio" id="a" value="A" v-model="answer" @click="bottonFijar()" />
          </li>
          <li class="lisegunda">
            <p>{{ challenges[q].answerB }}</p>
            <input type="radio" id="a" value="B" v-model="answer" @click="bottonFijar()" />
          </li>
        </div>

        <div class="segundapregunta">
          <div id="awuserdata">
            <div class="respuestas">
              <li class="litercera">
                <p>{{ challenges[q].answerC }}</p>
                <input @click="pulse()" type="radio" id="a" value="C" v-model="answer" />
              </li>
              <li class="licuarta">
                <p>{{ challenges[q].answerD }}</p>
                <input @click="pulse()" type="radio" id="a" value="D" v-model="answer" />
              </li>
            </div>
          </div>
        </div>
      </div>
      <!-- /CHALLENGE RESPUESTAS -->

      <!-- BOTTON NEXT -->
      <div>
        <button class="rer" v-show="next" @click="nextAnswers()">Siguiente</button>
      </div>
      <!-- /BOTTON NEXT -->
      <!-- BOTTON POSTEAR -->
      <div>
        <button class="rer" v-show="finish" @click="postAnswers()">Terminar</button>
      </div>
      <!-- /BOTTON POSTEAR -->
      <div class="footer">
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
//IMPORTANDO SWEETALERT
// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
// IMPORTANDO Footer
import Footer from "@/components/FooterDos.vue";
import Swal from "sweetalert2";
import { shuffle } from "lodash";
export default {
  name: "Challenge",
  components: { Menu, Footer },
  props: ["id"],
  data() {
    return {
      challenges: {},
      questionTime: {},
      q: 0,
      answer: "",
      correctData: false,
      challenge_questions_id: "",
      modal: "",
      capsula: "",
      pulsarboton: true,
      ultimapregunta: "",
      next: true,
      challenge_questions_id: "",
      finish: false,
      pausaDis: 1,
      estado: "Ultimate disponible",
      ulti: false
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
      if (this.answer == challenge[q].solution) {
        this.correctData = false;
        this.required = true;
      } else {
        this.correctData = true;
        this.required = false;
      }
    },

    // CONSEGUIR ANSWER
    async getAnswers() {
      let self = this;
      await axios
        .get(
          "http://localhost:3000/challenge/questions/" + self.$route.params.id
        )
        .then(function(response) {
          self.challenges = shuffle(response.data.data);
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },

    // CONSEGUIR ANSWER-TIME
    async getAnswerTime() {
      let self = this;
      await axios
        .get(
          "http://localhost:3000/challengelistquestions/" +
            self.$route.params.id
        )
        .then(function(response) {
          self.questionTime = response.data.data;
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    // POSTEAR ANSWER
    async postAnswers() {
      if (
        this.answer != "" &&
        this.answer == this.challenges[this.q].solution
      ) {
        let self = this;
        axios
          .post("http://localhost:3000/challenge/answers", {
            answer: self.q,
            challenge_id: this.questionTime[0].id
          })
          .then(function(response) {
            console.log(response);
            self.emptyFields();
          })
          .catch(function(error) {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      } else if (this.answer == "") {
        this.answer = "";
      } else {
        this.next = true;
        this.q--;
      }
    },
    // vaciar
    emptyFields() {
      this.q = 0;
      Swal.fire({
        icon: "success",
        title: "has acabado el reto",
        text: "Gracias"
      });
      this.$router.push("/");
    },
    settime() {
      if (
        this.questionTime[0].difficulty == "fácil" ||
        this.questionTime[0].difficulty == "medio"
      ) {
        this.ulti = false;
        this.capsula = true;
        this.pulsarboton = false;
        this.crono();
      } else if (this.questionTime[0].difficulty == "difícil") {
        this.ulti = true;
        this.capsula = true;
        this.pulsarboton = false;

        this.crono();
      }
    },

    // crono() {
    //   // SI LLEGA A 0
    //   if (this.questionTime[0].time == 0) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "U LOSE MAY FRIEND",
    //       text: "OTRA VEZ SERA 😈"
    //     });
    //     location.reload();
    //     // SI ES MAYOR QUE 0
    //   } else {
    //     this.questionTime[0].time = this.questionTime[0].time - 1;
    //     setTimeout(this.crono, 1000);
    //   }
    // },
    bottonFijar() {
      this.pulse();
    },

    pulse() {
      if (
        this.answer == "A" ||
        this.answer == "B" ||
        this.answer == "C" ||
        this.answer == "D"
      )
        return this.answer;
    },
    // BUSCAR LA SOLUCION = array = 0 o > 1;
    nextAnswers() {
      if (this.q == 0 && this.answer != this.challenges[this.q].solution) {
        this.answer = "";
        this.next = true;
      } else if (
        this.q > 0 &&
        this.answer != this.challenges[this.q].solution
      ) {
        this.answer = "";
        this.q--;
        this.next = true;
      } else {
        if (this.q != this.challenges.length - 2) {
          this.q++;
          this.answer = "";
          this.next = true;
        } else {
          this.q++;
          this.ultimapregunta = true;
          this.answer = "";
          this.next = false;
          this.finish = true;
        }
      }
    },
    // ULTIMATE
    pausa() {
      if (this.pausaDis == 1) {
        this.questionTime[0].time = this.questionTime[0].time + 10;
        this.pausaDis--;
        this.estado = "Ultimate no disponible";
      } else {
        this.pausaDis = 0;
      }
    }
  },

  created() {
    this.getAnswers();
    this.getUserName();
    this.getAnswerTime();
  }
};
</script>

<style scoped>
/* inicio */
.inicioButton {
  margin-top: 25px;
  width: initial;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(224, 73, 73, 0.25) 0px -4px inset;
  color: rgb(51, 51, 51);
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  min-width: 42px;
  min-height: 42px;
  position: relative;
  line-height: 0.875rem;

  background: rgb(255, 255, 255);
  border-radius: 40px;
  text-decoration: none;
  padding: 0px 16px 4px;
}
.inicioButton:hover {
  width: initial;
  cursor: pointer;
  display: inline-block;
  padding: 0.6rem;
  color: rgba(0, 0, 0, 0.75);
}

.aceptar {
  background-image: url(../assets/fondo3.jpg);
}
.rep {
  background: rgb(255, 255, 255);
  padding-top: 20rem;
  padding-bottom: 22rem;
}

.aceptar {
  padding: 2rem;
}
.ult {
  color: rebeccapurple;
}

.time {
  width: 500px;
  background: rgb(147, 210, 30);
  position: relative;
}
.timo {
  width: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/fondo3.jpg);
}
.fulltime {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.cronometro {
  display: block;
  flex-direction: column;
  align-items: center;
}
.timing {
  font-size: 2.2rem;
  position: absolute;
  bottom: 0;
  top: 2rem;
  right: 14.5rem;
}
.ultimate {
  display: flex;
  flex-direction: column;
}
.timingad {
  font-size: 2.2rem;
  position: absolute;
  bottom: 0;
  top: 2rem;
  left: 31rem;
}
.img {
  width: 10rem;
}

/* pregunta */
.text {
  list-style-type: none;
}
/* respuestas */
.liprimera {
  color: rgb(0, 0, 0);
  border-top: 10px solid #ced9f0;
}
.lisegunda {
  color: rgb(0, 0, 0);
  border-bottom: 10px solid #cef0d1;
  border-top-style: ridge;
}
.litercera {
  color: rgb(0, 0, 0);

  border-top: 10px solid #ddcef0;
}
.licuarta {
  color: rgb(0, 0, 0);
  border-bottom: 10px solid #eccef0;
  border-top-style: ridge;
}
.pri {
  display: flex;
  background-image: url(../assets/fondo3.jpg);
  list-style-type: none;
}
.primerapregunta {
  margin: auto;
  display: inline-block;
  background: olive;
  width: 49%;
}
.primerapregunta li {
  word-wrap: break-word;

  align-items: center;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
}
.primerapregunta li p {
  font-size: 3rem;
}
.segundapregunta {
  background-color: rgb(255, 255, 255);
  width: 49%;
}
.segundapregunta li {
  word-wrap: break-word;
  align-items: center;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
}
.segundapregunta li p {
  font-size: 3rem;
}

/* pausa */
.pause {
  text-decoration: none;
  float: left;
  margin: auto;
  width: 6em;
  height: 6rem;
  border: solid 2px #fff;
  border-radius: 10%;
}
.green {
  color: blueviolet;
}
.red {
  color: red;
}

.rer {
  margin-top: 25px;
  width: initial;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(224, 73, 73, 0.25) 0px -4px inset;
  color: rgb(51, 51, 51);
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  min-width: 42px;
  min-height: 42px;
  position: relative;
  line-height: 0.875rem;

  background: rgb(255, 255, 255);
  border-radius: 40px;
  text-decoration: none;
  padding: 0px 16px 4px;
}
.rer:hover {
  width: initial;
  cursor: pointer;
  display: inline-block;
  padding: 0.6rem;
  color: rgba(0, 0, 0, 0.75);
}
#a {
  width: 20px;
  height: 20px;
}
#a:checked {
  -webkit-animation: pulsate 3s ease-in-out;
  -webkit-animation-iteration-count: infinite;
  box-shadow: 4px 7px 20px #000200;
  opacity: 0.7;
  width: 3%;
}
@-webkit-keyframes pulsate {
  0% {
    opacity: 34;
  }
  50% {
    opacity: 10;
  }
  100% {
    opacity: 34;
  }
}
/* footer */
.footer {
  background-image: url(../assets/fondo3.jpg);
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 45px;
  margin-top: 20px;
}
.footer p {
  margin: 0;
}
.footer p a {
  margin: 0;
  color: rgb(0, 0, 0);
}
</style>
