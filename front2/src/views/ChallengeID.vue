<template>
  <div class="capauno">
    <div class="awtestimonials" v-for="answer in answers" :key="answer.id">
      <ul class="roc">
        <li>
          <div class="awuserdata">
            <li>{{answer.text}}</li>
            <p>answerA: {{answer.answerA}}</p>
            <p>answerB: {{answer.answerB}}</p>
            <p>answerC: {{answer.answerC}}</p>
            <p>answerD: {{answer.answerD}}</p>
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
export default {
  name: "Challenges",
  props: ["id"],
  data() {
    return {
      answers: []
    };
  },
  methods: {
    // CONSEGUIR ANSWER
    getAnswers() {
      let self = this;
      axios
        .get("http://localhost:3000/challengelist")
        .then(function(response) {
          self.answers = response.data.data;
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
    }
  },
  created() {
    this.getAnswers();
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