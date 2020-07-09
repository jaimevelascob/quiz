<template>
  <div class="capauno" v-if="this.questionTime && this.questionTime[0]">
    <!-- MENU -->
    <div v-show="pulsarboton">
      <Menu></Menu>
    </div>
    <!-- /MENU -->
    <!-- ACEPTAR BUTTON -->

    <div class="aceptar" v-show="pulsarboton">
      <div class="rep">
        <h1 class="dedo">👇</h1>
        <button class="inicioButton" @click="settime()" value="inicio">
          INCIAR
        </button>
        <h1 class="dedo">🖕</h1>
      </div>
      <!-- Footer-->
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
            </div>
            <!-- /ULTIMATE -->
          </div>
        </div>
      </div>
      <!-- /CRONOMETRO -->

      <!-- <div>
       
      </div>-->
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
            <input
              type="radio"
              id="a"
              value="A"
              v-model="answer"
              @click="bottonFijar()"
            />
          </li>
          <li class="lisegunda">
            <p>{{ challenges[q].answerB }}</p>
            <input
              type="radio"
              id="a"
              value="B"
              v-model="answer"
              @click="bottonFijar()"
            />
          </li>
        </div>

        <div class="segundapregunta">
          <div id="awuserdata">
            <div class="respuestas">
              <li class="litercera">
                <p>{{ challenges[q].answerC }}</p>
                <input
                  @click="pulse()"
                  type="radio"
                  id="a"
                  value="D"
                  v-model="answer"
                />
              </li>
              <li class="licuarta">
                <p>{{ challenges[q].answerD }}</p>
                <input
                  @click="pulse()"
                  type="radio"
                  id="a"
                  value="C"
                  v-model="answer"
                />
              </li>
            </div>
          </div>
        </div>
      </div>
      <!-- /CHALLENGE RESPUESTAS -->

      <!-- BOTTON NEXT -->
      <div>
        <button class="rer" v-show="next" @click="nextAnswers()">
          Siguiente
        </button>
      </div>
      <!-- /BOTTON NEXT -->
      <!-- BOTTON POSTEAR -->
      <div>
        <button class="rero" v-show="finish" @click="postAnswers()">
          Terminar
        </button>
      </div>
      <!-- /BOTTON POSTEAR -->
      <div class="footer">
        <!-- ULTIMATE -->
        <div v-show="ulti" class="ultimate">
          <button class="buttoncito" @click="pausa()">Pausar</button>
          <h1 class="ult" v-show="ultimapregunta">Ultima Pregunta</h1>
          <p
            :class="{
              green: estado === 'Ultimate disponible',
              red: estado === 'Ultimate no disponible',
            }"
          >
            {{ estado }}
          </p>
        </div>
      </div>
      <!-- Footer-->
      <div>
        <Footer></Footer>
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
      ulti: false,
      bar: "",
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
            challenge_id: this.questionTime[0].id,
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
        this.finish = false;
        this.answer = "";
      }
    },
    // vaciar
    emptyFields() {
      this.questionTime[0].time = 70;
      Swal.fire({
        icon: "success",
        title: "has logrado acabar el reto justo a tiempo!! 🏆",
        text: "Felicidades!!!",
      });
      this.$router.push("/challenges");
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
    iniciarCrono(bar) {
      if (this.questionTime[0].time == 70) {
        clearInterval(this.bar);
      } else {
        bar = setTimeout(this.crono, 1000);
        return this.bar;
      }
    },
    crono(bar) {
      this.iniciarCrono();
      // SI LLEGA A 0
      if (this.questionTime[0].time == 0) {
        clearInterval(bar);
        Swal.fire({
          icon: "error",
          title: "Qué pena!!! Por qué poco!!",
          text: "Otra ver será...<3",
        });
        location.reload();
        // SI ES MAYOR QUE 0
      } else {
        this.questionTime[0].time = this.questionTime[0].time - 1;
      }
    },

    // difficultad time

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
    },
  },

  created() {
    this.getAnswers();
    this.getUserName();
    this.getAnswerTime();
  },
};
</script>

<style scoped>
/* inicio */
.inicioButton {
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
  box-shadow: rgba(255, 255, 255, 0.35) 0px -4px inset;
  padding: 0.8rem;
  color: rgba(0, 0, 0, 0.75);
}

.aceptar {
  background-image: url(../assets/mong.jpg);
}
.rep {
  background-image: url(../assets/quiz.jpg);
  padding-top: 20rem;
  padding-bottom: 17rem;
}
.rep h1 {
  font-size: 50px;
}
.aceptar {
  padding: 2rem;
}
.ult {
  color: rgb(196, 152, 58);
}

.time {
  width: 500px;
  background: rgb(255, 255, 255);
  position: relative;
}

.timo {
  width: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/rt.jpg);
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
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  align-items: center;
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
  text-transform: uppercase;
}
/* respuestas */
.liprimera {
  flex-wrap: wrap;
  word-wrap: break-word;
  color: rgb(255, 255, 255);
  border-top: 10px solid #ffffff;
  background-image: url(../assets/rtt.jpg);
}
.lisegunda {
  color: rgb(255, 255, 255);
  border-bottom: 10px solid #ffffff;
  border-top-style: ridge;
  background-image: url(../assets/rtt.jpg);
}
.litercera {
  color: rgb(255, 255, 255);
  background-image: url(../assets/rtt.jpg);
  border-top: 10px solid #ffffff;
}
.licuarta {
  color: rgb(255, 255, 255);
  border-bottom: 10px solid #f8f8f8;
  border-top-style: ridge;
  background-image: url(../assets/rtt.jpg);
}
.pri {
  display: flex;
  background-image: url(../assets/rtt.jpg);
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
  justify-content: space-around;
  width: 6em;
  height: 6rem;
  text-align: center;
  align-items: center;
}
.buttoncito {
  width: initial;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(255, 148, 148, 0.25) 0px -4px inset;
  color: rgb(155, 17, 167);
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  letter-spacing: 5px;
  min-width: 420px;
  min-height: 42px;
  position: relative;
  line-height: 0.875rem;
  background: rgb(255, 255, 255);
  border-radius: 40px;
  text-decoration: none;
  padding: 0px 16px 4px;
}
.green {
  color: blueviolet;
  font-size: 30px;
}
.red {
  color: red;
  font-size: 30px;
}

.rer {
  margin-top: 15px;
  margin-bottom: 15px;
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
.rero {
  margin-top: 15px;
  margin-bottom: 15px;
  width: initial;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(95, 0, 0, 0.75) 0px -4px inset;
  color: rgb(219, 11, 11);
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
.rero:hover {
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
  box-shadow: 4px 7px 20px #ffffff;
  opacity: 0.6;
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
  background-image: url(../assets/rt.jpg);
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 25px;
  margin-top: 0px;
}
.footer p {
  margin: 0;
}
.footer p a {
  margin: 0;
  color: rgb(0, 0, 0);
}
</style>
