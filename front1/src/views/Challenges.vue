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
    <!-- COMPONENTE MEETINGS -->

    <challengelist :challenges="challenges"></challengelist>

    <div class="pagination"></div>
    <!-- Footer-->
    <div>
      <Footer></Footer>
    </div>
    <!-- NO RESULTS -->
    <p v-show="noResults" style="color:red">No results</p>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
import Swal from "sweetalert2";
// IMPORTANDO Footer
import Footer from "@/components/FooterDos.vue";
//IMPORTANDO meetingS
import challengelist from "@/components/ChallengeList.vue";
export default {
  name: "Challenges",
  components: { challengelist, Menu, Footer },
  props: ["id"],
  data() {
    return {
      challenges: [],
      search: "",
      filter: "",
      dateInput: false,
      noResults: false
    };
  },
  methods: {
    getChallenge() {
      let self = this;
      axios
        .get(
          `http://localhost:3000/challengelist?search=${self.search}&filter=${self.filter}`
        )
        .then(function(response) {
          self.challenges = response.data.data;
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
  cursor: pointer;
  box-shadow: rgba(224, 73, 73, 0.25) 0px -4px inset;
  color: rgb(51, 51, 51);
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
select {
  font-size: 14px;
  width: 15%;
  background: white;
}
/* buscador */
.searchProduct {
  padding-top: 7rem;
  border: 1px solid #e5e5e5;
}
input {
  width: 15%;
  padding: 1px 22px;
  margin: 10px 5px;
  box-sizing: border-box;
}
/* cargando */
</style>
