<template>
  <div>
    <!-- COMPONENTE MEETINGS -->
    <p>ID: {{ challenges.id }}</p>
  </div>
</template>

<script>
import challengelist from "@/components/ChallengeList.vue";
import axios from "axios"; // Importando AXIOS
export default {
  name: "Probando",
  components: { challengelist },
  props: ["id"],
  data() {
    return {
      challenges: {}
    };
  },
  methods: {
    // CONSEGUIR ANSWER
    getAnswers() {
      console.log(self.$route.params.id);
      let self = this;
      axios
        .get("http://localhost:3000/challenge/" + self.$route.params.id)
        .then(function(response) {
          self.challenges = response.data.data;
          console.log(self.challenges);
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    }
  },
  created() {
    this.getAnswers();
  }
};
</script>

<style>
</style>