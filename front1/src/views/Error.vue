<template>
  <div class="error">
    <menucustom id="menuLanding"></menucustom>
    <section class="flexlanding">
      <h1>ERROR:</h1>
      <p>404 - NOT FOUND</p>
    </section>
    <FooterCustom id="footerLanding"></FooterCustom>
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterDos.vue";
export default {
  name: "Error",
  components: {
    menucustom,
    FooterCustom
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;1,300&display=swap");
.error h1 {
  margin-right: 2rem;
}
.error section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: white;
  min-width: 60vh;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.125);
  border-radius: 30px;

  padding: 2rem;
}
.error {
  color: rebeccapurple;
  margin-top: 20rem;
  font-family: "Merriweather", serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error #menuLanding {
  min-width: 100vw;
}
.error #footerLanding {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  padding: 1.5rem;
  font-size: 300;
}
.error #link {
  text-decoration: none;
}
</style>