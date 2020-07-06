<template>
  <div>
    <div class="profile">
      <p>{{ profile.id ? 'id: ' + profile.id : null}}</p>
      <p>{{ profile.nickName ? 'Nick: ' + profile.nickName : null}}</p>
      <p>{{ profile.email ? 'Email: ' + profile.email : null}}</p>
      <p>{{ profile.registrationDate ? 'Miembro desde: ' + profile.registrationDate.substr(0,10) : null}}</p>
      <p>{{ profile.role ? 'Rol: ' + profile.role : null}}</p>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileComponent",
  data() {
    return {
      //   path: "http://localhost:3001/uploads/defaultimg.png",
    };
  },
  props: {
    profile: Object
  },
  methods: {
    capitalize() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }
};
</script>

<style scoped>
.profile {
  padding: 10rem;
  background: gold;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
}
</style>