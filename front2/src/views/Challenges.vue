<template>
  <div class="capauno">
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
    <challengelist :challenges="challenges"></challengelist>
    <!-- NO RESULTS -->
    <p v-show="noResults" style="color:red">No results</p>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
//IMPORTANDO meetingS
import challengelist from "@/components/ChallengeList.vue";
export default {
  name: "Challenges",
  components: { challengelist },
  props: ["id"],
  data() {
    return {
      challenges: [],
      loading: true,
      search: "",
      filter: "",
      dateInput: false,
      noResults: false,
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
    clearInput() {
      (this.search = ""), (this.filter = "");
      this.getChallenge();
    },
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
    },
  },
  created() {
    this.getChallenge();
  },
};
</script>

<style scoped>
button {
  padding: 1rem;
  width: 10%;
}
</style>
