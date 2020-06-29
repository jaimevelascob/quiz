<template>
  <div>
    <div>
      <div class="meeting" v-for="challenge in challenges" :key="challenge.id">
        <!-- id-->
        <div id="id">
          <p>id: {{ challenge.id }}</p>
        </div>
        <!-- /id-->
        <!-- imagen-->
        <div>
          <img :src="challenge.image ? path + challenge.image : ''" alt />
        </div>
        <!-- /imagen-->
        <!-- Nombre difficulty-->
        <div>
          <p>Nombre: {{ challenge.title }}</p>
          <p>dificultad: {{ challenge.difficulty }}</p>
        </div>
        <!-- /Nombre difficulty-->
        <!-- ROUTER LINKS-->
        <div>
          <router-link
            v-show="nomodal"
            :to="{ name: 'challenge', params: { id: challenge.title } }"
          >Juega</router-link>
          <br />
          <router-link
            v-show="modal"
            :to="{ name: 'ChallengeQuestions', params: { id: challenge.id } }"
          >Añadir Preguntas</router-link>
        </div>
        <!-- /ROUTER LINKS-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengeList",
  data() {
    return {
      path: "http://localhost:3000/uploads/",
      modal: true,
      nomodal: true
    };
  },
  props: {
    challenges: Array
  },
  methods: {
    listen() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    // MIRAR SI EL ID ES EL MISMO QUE EL USER_ID
    // ESCONDER BOTON AÑADIR PREGUNTAS
    getUserName() {
      if (localStorage.getItem("id") == localStorage.getItem("user_id")) {
        this.modal = true;
      } else {
        this.modal = false;
      }
    },
    // MIRAR SI EL USER ESTA LOG
    // ESCONDER JUGAR
    UserLog() {
      if (localStorage.getItem("authToken") && !localStorage.getItem("title")) {
        this.nomodal = true;
      } else {
        this.nomodal = false;
      }
    }
    // NOS ASEGURAMOS DE QUE EXISTE TITTLE EN EL LOCAL STORAGE
  },
  created() {
    this.getUserName();
    this.UserLog();
  }
};
</script>
