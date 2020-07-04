<template>
  <div class="capauno">
    <div v-show="pulsarboton">
      <Menu></Menu>
    </div>
    <div class="aceptar" v-show="pulsarboton">
      <h1>ESTÁS SEGURO DE QUE QUIERES EMPEZAR EL RETO?</h1>
      <button @click="settime()" value="inicio">INCIAR</button>
    </div>
    <div v-show="capsula" class="awtestimonials">
      <div class="cronometro">
        <div class="timo">
          <div class="time">
            <img
              class="img"
              src="https://image.flaticon.com/icons/svg/66/66175.svg"
              alt="cronometro"
            />
            <p class="timing" id="times" v-model="questionTime">{{ this.questionTime[0].time }}</p>
            <div>
              <img class="pause" src="../assets/ulti.png" alt />
              <button class="buttoncito" @click="pausa()">Pausar</button>
              <p class="timingad" value>ultimate disponible</p>
            </div>
          </div>
        </div>
      </div>
      <ul class="roc">
        <li>
          <div id="awuserdata">
            <div>
              <h1 class="ult" v-show="ultimapregunta">Ultima Pregunta</h1>
            </div>

            <li>
              <h1>{{ challenges[q].text }}</h1>
            </li>

            <!-- CHALLENGE RESPUESTAS -->
            <div class="respuestas">
              <li>
                <p>{{ challenges[q].answerA }}</p>
                <input type="radio" id="a" value="A" v-model="answer" @click="bottonFijar()" />
                <label for="A">A</label>
              </li>
              <li>
                <p>{{ challenges[q].answerB }}</p>
                <input type="radio" id="b" value="B" v-model="answer" @click="bottonFijar()" />
                <label for="B">B</label>
              </li>
              <li>
                <p>{{ challenges[q].answerC }}</p>
                <input @click="pulse()" type="radio" id="c" value="C" v-model="answer" />
                <label for="C">C</label>
              </li>
              <li>
                <p>{{ challenges[q].answerD }}</p>
                <input @click="pulse()" type="radio" id="d" value="D" v-model="answer" />
                <label for="D">D</label>
              </li>

              <!-- <li>
                <p>solucion: {{ challenges[q].solution }}</p>
              </li>-->
            </div>
            <!-- /CHALLENGE RESPUESTAS -->
            <!-- BOTTON NEXT -->
            <div>
              <button v-show="next" @click="nextAnswers()">Siguiente</button>
            </div>
            <!-- /BOTTON NEXT -->
            <!-- BOTTON POSTEAR -->
            <div>
              <button v-show="finish" @click="postAnswers()">Terminar</button>
            </div>
            <!-- /BOTTON POSTEAR -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
//IMPORTANDO SWEETALERT
// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
import Swal from "sweetalert2";
import { shuffle } from "lodash";
export default {
  name: "Challenge",
  components: { Menu },
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
      pausaDis: 1
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
      } else {
        this.q--;
        this.answer = "";
        this.next = true;
      }
    },
    // vaciar
    emptyFields() {
      this.q = 0;
      Swal.fire({
        icon: "success",
        title: "has acabado el reto",
        text: "Gracias",
        confirmButtonText: "Ok"
      });
      setTimeout(function() {
        location.reload();
      }, 1500);
    },
    settime() {
      this.capsula = true;
      this.pulsarboton = false;
      this.crono();
    },

    crono() {
      // SI LLEGA A 0
      if (this.questionTime[0].time == 0) {
        Swal.fire({
          icon: "error",
          title: "U LOSE MAY FRIEND",
          text: "OTRA VEZ SERA 😈"
        });
        location.reload();
        // SI ES MAYOR QUE 0
      } else {
        this.questionTime[0].time = this.questionTime[0].time - 1;
        setTimeout(this.crono, 1000);
      }
    },
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
    pausa() {
      if (this.pausaDis == 1) {
        this.questionTime[0].time = this.questionTime[0].time + 10;
        this.pausaDis--;
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
.aceptar {
  padding: 4rem;
}
.ult {
  color: rebeccapurple;
}

.time {
  width: 500px;
  background: chocolate;
  display: flex;
  position: relative;
}
.timo {
  width: 100;
  display: flex;
  justify-content: center;
  align-items: center;
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
  right: 25rem;
}
.timingad {
  font-size: 2.2rem;
  position: absolute;
  bottom: 0;
  top: 2rem;
  left: 35rem;
}
.img {
  width: 10rem;
}

.roc {
  display: flex;
  padding: 0%;
  list-style-type: none;
  overflow: hidden;
}
.roc li {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.roc li p {
  display: block;
  margin: 15px 0;
  font-size: 35px;
}
/* pausa */
.pause {
  text-decoration: none;
  float: left;
  margin: auto;
  width: 3.5rem;
  height: 3.5rem;
  border: solid 2px #fff;
  border-radius: 10%;
}
</style>
