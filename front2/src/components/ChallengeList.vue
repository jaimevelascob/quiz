<template>
  <div>
    <div class="meeting" v-for="challenge in challenges" :key="challenge.id">
      <!-- <img :src="path + meeting.photo1" alt /> -->
      <p>id: {{ challenge.id }}</p>
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
  props: {
    challenges: Array,
  },
};
</script>
