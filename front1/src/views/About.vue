<template>
  <div class="about">
    <div>
      <Menu></Menu>
    </div>
    <div class="pro">
      <li>
        <p>Buenas!!! Soy el creador de esta plataforma 🧟‍♂️.</p>
        <p>Me siento muy halagado si no has clickado esto sin querer 🤔</p>
        <p>y si de verdad estas interesad@ en saber más acerca de mí 🥳.</p>
        <br />
        <p>Para ello te dejo aquí enlaces para que puedas conocerme (un poco mejor)</p>
      </li>
    </div>
    <div class="preenlaces">
      <li>
        <p>👇 👇 👇</p>
      </li>
      <li>
        <p>👇 👇 👇</p>
      </li>
      <li>
        <p>👇 👇 👇</p>
      </li>
    </div>
    <div class="enlaces">
      <ul id="aw-gallery">
        <li>
          <a href="https://github.com/jaimevelascob">github</a>
        </li>
        <li>
          <a href="https://soundcloud.com/cold-tear-170992565">soundcloud</a>
        </li>
        <li>
          <p>Y si quieres contactar conmigo jaimevelasco680@gmail.com</p>
        </li>
      </ul>
    </div>
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
<style scoped>
* {
}
/* perfil */
.pro {
  padding: 5rem;
}
.enlaces {
}
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.preenlaces {
  display: flex;
  flex-direction: column;
  background: chartreuse;
}
.preenlaces li {
  display: flex;
  justify-content: center;
  background: chocolate;
}
/* Gallery */
#aw-gallery {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  padding: 1rem;
}

#aw-gallery li {
  padding: 5rem;
  width: 20%;
  position: relative;
  overflow-x: hidden;
}

#aw-gallery li img {
  display: block;
  width: 100%;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#aw-gallery li:hover img {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
.hola {
  background: rgb(235, 235, 243);
}
#aw-gallery li:after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#aw-gallery li:hover:after {
  width: 0;
  height: 50%;
}
</style>