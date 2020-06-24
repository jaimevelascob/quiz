<template>
  <div>
    <h1>hola</h1>
    <div class="meeting" v-for="challenge in challenges" :key="challenge.id">
      <!-- <img :src="path + meeting.photo1" alt /> -->
      <p>fotoaqui arreglar</p>
      <p>id: {{ challenge.id }}</p>
      <p>Nombre: {{ challenge.title }}</p>
      <router-link :to=" {name:'challenge', params:{id:challenge.id}} ">Juega</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengeList",
  props: {
    challenges: Array
  }
};
</script>