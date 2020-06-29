<template>
  <div class="capauno">
    <div class="awtestimonials">
      <ul class="roc">
        <li>
          <div id="awuserdata">
            <!-- <div>
              <li>{{ q }} {{ time }}</li>
              <input type="text" id="times" v-model="challenges[q].time" />
              <button @click="settime()" value="inicio">Iniciar</button>
            </div>-->
            <div>
              <li>{{ challenges[q].text }}</li>
            </div>
            <!-- CHALLENGE RESPUESTAS -->
            <div>
              <li>
                <p>answerA: {{ challenges[q].answerA }}</p>
                <input type="radio" id="a" value="A" v-model="answer" @click="bottonFijar()" />
                <label for="A">A</label>
              </li>
              <li>
                <p>answerB: {{ challenges[q].answerB }}</p>
                <input type="radio" id="b" value="B" v-model="answer" @click="bottonFijar()" />
                <label for="B">B</label>
              </li>
              <li>
                <p>answerC: {{ challenges[q].answerC }}</p>
                <input @click="pulse()" type="radio" id="c" value="C" v-model="answer" />
                <label for="C">C</label>
              </li>
              <li>
                <p>answerD: {{ challenges[q].answerD }}</p>
                <input @click="pulse()" type="radio" id="d" value="D" v-model="answer" />
                <label for="D">D</label>
              </li>
              <li>
                <p>solucion: {{ challenges[q].solution }}</p>
              </li>
            </div>
            <!-- /CHALLENGE RESPUESTAS -->
            <!-- BOTTON NEXT -->
            <div>
              <button @click="nextAnswers()">Siguiente</button>
            </div>
            <!-- /BOTTON NEXT -->
            <!-- BOTTON POSTEAR -->
            <div>
              <button @click="postAnswers()">Terminar</button>
            </div>
            <!-- /BOTTON POSTEAR -->
            <!-- CHALLENGE QUESTIONS -->
            <div v-show="modal">
              <input type="text" id="title" v-model="challenge_questions_id = challenges[q].id" />
            </div>
          </div>
        </li>
      </ul>
      <div>
        <i id="awtestimonialsprev" class="awarrow awarrowleft" @click="AnswerChange()">a</i>
        <br />
        <i id="awtestimonialsnext" class="awarrow awarrowright" @click="AnswerChange()">a</i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";
export default {
  name: "Challenge",
  props: ["id"],
  data() {
    return {
      challenges: {},
      time: 1,
      q: 0,
      answer: "",
      correctData: false,
      challenge_questions_id: "",
      modal: ""
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
          self.challenges = response.data.data;
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    // POSTEAR ANSWER
    async postAnswers(answer) {
      let self = this;
      await axios
        .post(
          "http://localhost:3000/challenge/answers/" + self.$route.params.id
        )
        .then(function(response) {
          answer = self.answer;
          Swal.fire({
            icon: "success",
            title: "Has acabado el challenge!",
            text: "Se guardarán tus datos"
          });
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    // MOVER LAS PREGUNTAS
    AnswerChange() {
      let firstChild, lastChild;
      const prevArrow = document.querySelector("#awtestimonialsprev");
      const nextArrow = document.querySelector("#awtestimonialsnext");
      const testimonials = document.querySelector(".awtestimonials ul");

      document.addEventListener("click", () => {
        if (event.target === prevArrow) {
          lastChild = testimonials.lastElementChild;
          console.log(event.target);
          testimonials.insertAdjacentElement("afterbegin", lastChild);
        } else if (event.target === nextArrow) {
          firstChild = testimonials.firstElementChild;
          testimonials.insertAdjacentElement("beforeend", firstChild);
        }
      });
    },

    // settime() {
    //   let time = document.getElementById("times");
    //   this.crono();
    //   // alert(time.value);
    // },

    // crono() {
    //   if (this.time == 0) {
    //     this.q = 1;
    //     this.time = "end";
    //     console.log(time);
    //   } else {
    //     this.time = this.time - 1;
    //     setTimeout(this.crono, 1000);
    //   }
    // },
    bottonFijar() {
      this.pulse();
      // this.validatingData();

      // alert(this.answer);
    },

    pulse() {
      if (
        this.answer == "A" ||
        this.answer == "B" ||
        this.answer == "C" ||
        this.answer == "D"
      ) {
        return this.answer;
      } else {
        alert(error.response.data.message);
      }
    },
    // BUSCAR LA SOLUCION = array = 0 o > 1;
    nextAnswers() {
      if (this.q == 0 && this.answer != this.challenges[this.q].solution) {
        this.answer = "";
      } else if (
        this.q > 0 &&
        this.answer != this.challenges[this.q].solution
      ) {
        this.answer = "";
        this.q--;
      } else {
        this.q++;
        this.answer = "";
      }
    }
  },

  created() {
    this.getAnswers();
    this.getUserName();
  }
};
</script>

<style scoped>
.capauno {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.awtestimonials {
  max-width: 500%;
  position: relative;
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
.awarrow {
  position: absolute;
  top: 50%;
  display: inline-block;
  border: solid #eee;
  padding: 20px;
  border-width: 0 3px 3px 0;
  cursor: pointer;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
.awarrow.awarrowleft {
  right: 200px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.awarrow.awarrowright {
  left: 200px;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}
.awarrow:hover {
  border-color: #dca453;
  box-shadow: 4px 3px 15px #a8fa8f;
}
.awuserdata {
  display: block;
}
</style>
