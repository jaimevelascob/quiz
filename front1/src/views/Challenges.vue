<template>
  <div class="capauno">
    <div>
      <Menu></Menu>
    </div>
    <!-- BUSQUEDA -->
    <div class="searchProduct">
      <select v-model="filter">
        <option disabled value>Filtrado por...</option>
        <option value="difficulty">difficulty</option>
        <option value="title">Nombre</option>
      </select>
      <input
        v-model.trim="search"
        id="search"
        name="bySearch"
        type="search"
        placeholder="Búsqueda..."
        v-show="!dateInput"
      />
      <input
        v-model.trim="search"
        id="search"
        name="bySearch"
        type="date"
        placeholder="Write..."
        v-show="dateInput"
      />
      <button @click="getChallenge()">Buscar</button>
      <button @click="clearInput()">Clean</button>
    </div>

    <!--  SIMBOLO DE CARGA  -->
    <div v-show="loading" class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- COMPONENTE MEETINGS -->
    <div class="awtestimonials">
      <challengelist :challenges="challenges" v-on:delete="deleteChallenge"></challengelist>
    </div>
    <div class="pagination">
      <!-- <i id="prev" class="awarrow awarrowleft" @click="AnswerChange()">a</i>
      <br />
      <i id="next" class="awarrow awarrowright" @click="AnswerChange()">a</i>-->
    </div>
    <!-- NO RESULTS -->
    <p v-show="noResults" style="color:red">No results</p>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
//IMPORTANDO meetingS
import challengelist from "@/components/ChallengeList.vue";
export default {
  name: "Challenges",
  components: { challengelist, Menu },
  props: ["id"],
  data() {
    return {
      challenges: [],
      loading: true,
      search: "",
      filter: "",
      dateInput: false,
      noResults: false
    };
  },
  methods: {
    // MOVER LAS PREGUNTAS
    // AnswerChange() {
    //   let firstChild, lastChild;
    //   const prevArrow = document.querySelector("#prev");
    //   const nextArrow = document.querySelector("#next");
    //   const testimonials = document.querySelector(".awtestimonials");

    //   document.addEventListener("click", () => {
    //     if (event.target === prevArrow) {
    //       lastChild = testimonials.lastElementChild;
    //       console.log(lastChild);
    //       testimonials.insertAdjacentElement("afterbegin", lastChild);
    //     } else if (event.target === nextArrow) {
    //       firstChild = testimonials.firstElementChild;
    //       testimonials.insertAdjacentElement("beforeend", firstChild);
    //     }
    //   });
    // },
    getChallenge() {
      let self = this;
      axios
        .get(
          `http://localhost:3000/challengelist?search=${self.search}&filter=${self.filter}`
        )
        .then(function(response) {
          //TIEMPO DE CARGA
          setTimeout(function() {
            self.loading = false;
            self.challenges = response.data.data;
          }, 1000);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // ELIMINAR CHALLENGE
    deleteChallenge(data) {
      let self = this;
      this.id = data;
      axios
        .delete("http://localhost:3000/challenge/" + this.id, {
          id: this.id
        })
        .then(function(response) {
          console.log(response);
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clearInput() {
      (this.search = ""), (this.filter = "");
      this.getChallenge();
    }
  },
  watch: {
    // cada vez que la pregunta cambie, esta función será ejecutada
    filter: function() {
      if (this.filter === "date") {
        this.dateInput = true;
      } else {
        this.dateInput = false;
      }
    },
    challenges: function() {
      if (this.challenges.length < 1) {
        this.noResults = true;
      } else {
        this.noResults = false;
      }
    }
  },
  created() {
    this.getChallenge();
  }
};
</script>

<style scoped>
button {
  padding: 1rem;
  width: 10%;
}
.awtestimonials {
  padding: 5rem;
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
