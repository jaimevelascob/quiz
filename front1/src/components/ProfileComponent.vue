<template>
  <div>
    <div class="profile">
      <div class="profi2">
        <p class="rol">{{ profile.id ? 'ℕ: ' + profile.id : null}}</p>
        <p>{{ profile.nickName ? 'Nick: ' + profile.nickName : null}}</p>
        <p>{{ profile.email ? 'Email: ' + profile.email : null}}</p>
        <p>{{ profile.registrationDate ? 'Miembro desde: ' + profile.registrationDate.substr(0,10) : null}}</p>
        <p>{{ profile.role ? 'Rol: ' + profile.role : null}}</p>
        <br />
      </div>
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
  padding-top: 5rem;

  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
  background-image: url(../assets/hand.jpg);
}
.profi2 {
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}
p {
  padding: 1rem;
  font-size: 30px;
}
.rol {
}
</style>