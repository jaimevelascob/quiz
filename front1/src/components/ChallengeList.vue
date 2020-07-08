<template>
  <div class="imagen">
    <div class="segundaimagen">
      <div class="capauno">
        <div class="ulti">
          <div class="capados">
            <ul class="mood">
              <div class="meeting" v-for="challenge in challenges" :key="challenge.id">
                <nav class="pac">
                  <ul id="aw-gallery">
                    <li class="imag">
                      <img class="log" src="../assets/mingo.jpg" alt />
                    </li>
                  </ul>
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
      // path: "http://localhost:3000/uploads/",
      // defaultAvatar: "http://localhost:3000/uploads/default.png",
      modal: "",
      nomodal: ""
    };
  },
  props: {
    challenges: Array
  },
  methods: {
    // MIRAR SI EL ID ES EL MISMO QUE EL USER_ID
    // ESCONDER BOTON AÑADIR PREGUNTAS
    getUserName() {
      if (
        this.challenges &&
        this.challenges[0] &&
        localStorage.getItem("id") === this.challenges[0].user_id
      ) {
        this.modal = true;
      } else {
        this.modal = false;
      }
    },
    //pillar foto
    // getPhoto(id, image) {
    //   if (image) {
    //     return this.path + image;
    //   }
    //   let lastNumber = id
    //     .toString()
    //     .split("")
    //     .pop();
    //   return `http://localhost:3000/uploads/${lastNumber}.jpg`;
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
    this.getUserName();
  }
};
</script>
<style scoped>
/* priemra capa */
.capauno {
  background: rgba(223, 14, 14, 0);
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  align-items: center;
  padding: 9rem;
  margin-bottom: 2.5rem;
}
.segundaimagen {
  background-image: url(../assets/quest.jpg);
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 0.5px solid black;
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
  box-shadow: 4px 3px 50px #000000;
}
.ulti {
  background: rgb(0, 0, 0, 0.2);
  box-shadow: 4px 3px 8px #0b0c0b;
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
  box-shadow: 4px 3px 15px #504955;
  cursor: pointer;
  list-style-type: none;
}
.imag {
  border-radius: 100%;
  position: absolute;
  top: 12.125vw;
  width: 2045px;
  overflow-x: hidden;
  flex-wrap: wrap;
}
.log {
  border-radius: 50%;
  width: 600px;
  height: 480px;
  box-shadow: 1px 1px 8px #272c28;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  display: block;
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
  color: white;
  position: absolute;
  margin-top: 10px;
  width: initial;
  cursor: pointer;
  display: flex;
  vertical-align: bottom;
  box-shadow: rgba(20, 1, 1, 0.65) 0px -4px inset;
  font-weight: bold;
  text-align: center;
  min-width: 42px;
  min-height: 42px;
  position: relative;
  line-height: 0.875rem;
  word-wrap: break-word;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 40px;
  text-decoration: none;
  justify-content: center;
  letter-spacing: 1px;
  align-items: center;
}
.botones:hover {
  color: white;
  width: initial;
  cursor: pointer;
  display: flex;
  background: rgba(0, 0, 0, 0.7);
  letter-spacing: normal;
}
.botoncitos {
  padding: 1rem;
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
  background-image: url(../assets/quest.jpg);
  padding: 2rem;
  font-size: 30px;
  border-top: 2px solid rgb(0, 0, 0);
  border-right: 1px solid rgb(0, 0, 0);
  border-left: 2px solid rgb(255, 255, 255, 0.4);
}
.liseg {
  background-image: url(../assets/quest.jpg);
  padding: 2rem;
  font-size: 30px;
  box-shadow: rgba(20, 10, 10, 0.65) 0px -4px inset;
  border-top: 2px solid rgb(0, 0, 0);
  border-right: 1px solid rgb(0, 0, 0);
  border-left: 2px solid rgb(255, 255, 255, 0.4);
}
.id {
  font-size: 30px;
}
.pro {
  background-image: url(../assets/quest.jpg);
  box-shadow: rgba(20, 1, 1, 0.65) 0px -4px inset;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
/* mover */

.awarrow {
  position: absolute;
  top: 50%;
  display: inline-block;
  border: solid rgb(255, 250, 250);
  padding: 20px;
  border-width: 0 3px 3px 0;
  cursor: pointer;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
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
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}

.awarrow:after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.awarrow:hover {
  border-color: #dca453;
  box-shadow: 4px 3px 15px #a8fa8f;
}
.awuserdata {
  display: block;
}
/* Gallery */

#aw-gallery li img {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#aw-gallery li:hover img {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}
</style>
