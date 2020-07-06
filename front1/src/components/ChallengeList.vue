<template>
  <div class="imagen">
    <div class="segundaimagen">
      <div class="capauno">
        <div class="ulti">
          <div class="capados">
            <ul class="mood">
              <div class="meeting" v-for="challenge in challenges" :key="challenge.id">
                <nav class="pac">
                  <li class="imag">
                    <img class="log" src="../assets/Logo.jpeg" alt />
                  </li>
                </nav>
                <nav class="pro">
                  <li class="lipri">
                    <!-- id-->

                    <p class="title">{{ challenge.title }}</p>
                  </li>
                  <!-- /id-->

                  <!-- Nombre difficulty-->
                  <li class="liseg">
                    <p class="difficulty">{{ challenge.difficulty }}</p>
                  </li>

                  <!-- /Nombre difficulty-->
                  <!-- ROUTER LINKS-->

                  <!-- /ROUTER LINKS-->
                </nav>
                <div class="botoncitos">
                  <div class="otrosbots">
                    <div class="bots">
                      <router-link
                        class="botones"
                        v-show="nomodal"
                        :to="{ name: 'challenge', params: { id: challenge.title } }"
                      >Juega</router-link>

                      <router-link
                        class="botones"
                        v-show="modal"
                        :to="{ name: 'ChallengeQuestions', params: { id: challenge.id } }"
                      >Añadir Preguntas</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="utl">
      <i id="prev" class="awarrow awarrowleft" @click="AnswerChange()"></i>
      <br />

      <i id="next" class="awarrow awarrowright" @click="AnswerChange()"></i>
    </div>
  </div>
</template>

<script>
//IMPORTANDO FUNCION DE UTILS
import { isLoggedIn } from "../api/utils";
export default {
  name: "ChallengeList",
  data() {
    return {
      path: "http://localhost:3000/uploads/",
      modal: true,
      nomodal: ""
    };
  },
  props: {
    challenges: Array
  },
  methods: {
    // MIRAR SI EL ID ES EL MISMO QUE EL USER_ID
    // ESCONDER BOTON AÑADIR PREGUNTAS
    // getUserName() {
    //   if (localStorage.getItem("id") == this.challenges[0].user_id) {
    //     this.modal = true;
    //   } else {
    //     this.modal = false;
    //   }
    // },
    // MIRAR SI EL USER ESTA LOG
    // ESCONDER JUGAR
    UserLog() {
      if (localStorage.getItem("authToken")) {
        this.nomodal = true;
      } else {
        this.nomodal = false;
      }
    },
    // MOVER LAS PREGUNTAS
    AnswerChange() {
      let firstChild, lastChild;
      const prevArrow = document.querySelector("#prev");
      const nextArrow = document.querySelector("#next");
      const testimonials = document.querySelector(".mood");
      document.addEventListener("click", () => {
        if (event.target === prevArrow) {
          lastChild = testimonials.lastElementChild;
          console.log(lastChild);
          testimonials.insertAdjacentElement("afterbegin", lastChild);
        } else if (event.target === nextArrow) {
          firstChild = testimonials.firstElementChild;
          testimonials.insertAdjacentElement("beforeend", firstChild);
        }
      });
    }

    // NOS ASEGURAMOS DE QUE EXISTE TITTLE EN EL LOCAL STORAGE
  },
  created() {
    this.UserLog();
    // this.getUserName();
  }
};
</script>
<style scoped>
/* priemra capa */
.capauno {
  background: rgb(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  align-items: center;
  padding: 9rem;
}
.segundaimagen {
  padding: 0.5rem;
  background: rgb(0, 0, 0, 0.8);
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nose {
  background: chartreuse;
}
.wtf {
  position: absolute;
  top: 3.125vw;
  width: 53.90625vw;
  height: 30.3125vw;
  display: block;
}
.capados {
  display: block;
  background: rgba(119, 119, 118, 0.3);
}
.utl {
  padding: 0.5rem;
  box-shadow: 4px 3px 50px #ffc163;
}
.ulti {
  background: rgb(0, 0, 0, 0.2);
  box-shadow: 4px 3px 8px #63ff7d;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
}
.meeting {
  width: 200px;
  padding: 0.5rem;
}

.mood {
  display: flex;
  background: rgb(0, 0, 0, 0.2);
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: 500px;
  height: 350px;
  overflow: hidden;
  box-shadow: 4px 3px 15px #b963ff;
}
.imag {
  position: absolute;
  top: 12.125vw;
  width: 2045px;
}
.log {
  width: 600px;
  height: 480px;
  box-shadow: 1px 1px 8px #63ff7d;
}
ul li {
  text-decoration: none;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  text-align: center;
}
ul li p {
  /* padding-top: 3rem; */
  color: white;
}
li.imag {
  width: 1470px;
  height: 480px;
}
.botones {
  position: absolute;
  margin-top: 25px;
  width: initial;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(20, 1, 1, 0.65) 0px -4px inset;
  color: rgb(51, 51, 51);
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  min-width: 42px;
  min-height: 42px;
  position: relative;
  line-height: 0.875rem;
  word-wrap: break-word;
  background: rgb(255, 255, 255);
  border-radius: 40px;
  text-decoration: none;
  padding: 0px 20px 4px;
  letter-spacing: 1px;
}
.botones:hover {
  width: initial;
  cursor: pointer;
  display: inline-block;
  padding: 0.3rem;
  color: rgba(0, 0, 0, 0.75);
  letter-spacing: normal;
}
.botoncitos {
  padding: 1rem;
  word-wrap: break-word;
}
.otrosbots {
  position: fixed;
  padding: 0.5rem;
  text-align: center;
}
.bots {
  width: 125px;
}
/* contenido */
#id {
  letter-spacing: 2px;
  margin: 1rem;
}
.nombre {
  letter-spacing: 1.5px;
}
.lipri {
  background: rgb(50, 51, 49);
  padding: 2rem;
  font-size: 30px;
}
.liseg {
  background: rgb(50, 51, 49);
  padding: 2rem;
  font-size: 30px;
}
.id {
  font-size: 30px;
}
.pro {
  background-image: url(../assets/fondo.jpg);
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
/* mover */

.awarrow {
  position: absolute;
  top: 50%;
  display: inline-block;
  border: solid rgb(131, 128, 128);
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
  color: white;
}
.awarrow.awarrowright {
  left: 200px;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  color: white;
}
.awarrow:hover {
  border-color: #dca453;
  box-shadow: 4px 3px 15px #a8fa8f;
}
.awuserdata {
  display: block;
}
</style>
