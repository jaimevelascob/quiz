<template>
  <div>
    <div class="meeting" v-for="challenge in challenges" :key="challenge.id">
      <p>id: {{ challenge.id }}</p>
      <img :src="challenge.image ? path + challenge.image : ''" alt />
      <p>Nombre: {{ challenge.title }}</p>
      <p>difficulty: {{ challenge.difficulty }}</p>
      <router-link :to="{ name: 'challenge', params: { id: challenge.id } }"
        >Juega</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengeList",
  data() {
    return {
      path: "http://localhost:3000/uploads/",
    };
  },
  props: {
    challenges: Array,
  },
};
</script>
