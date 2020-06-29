<template>
  <div class="about">
    <div>
      <Menu></Menu>
    </div>
    <h1>This is an about page</h1>
  </div>
</template>
<script>
// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
export default {
  name: "about",
  components: { Menu }
};
</script>