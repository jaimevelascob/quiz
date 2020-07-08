<template>
  <div class="about">
    <div>
      <Menu></Menu>
    </div>
    <div class="pro">
      <li>
        <p>Buenas!!! Soy el creador de esta plataforma 🧟‍♂️.</p>
      </li>
      <li>
        <p>Me siento muy halagado si no has llegado hasta aquí de casualidad...🤔...</p>
      </li>
      <li>
        <p>...y si de verdad estas interesad@ en saber más acerca de mí 🥳.</p>
      </li>

      <br />
      <li>
        <p>Para ello te dejo un par de enlaces y asi podrás conocerme (un poco mejor)</p>
      </li>
    </div>
    <nav class="preenlaces">
      <li>
        <p>👇</p>
      </li>
      <li>
        <p>👇</p>
      </li>
      <li>
        <p>👇</p>
      </li>
    </nav>
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
  components: { Menu, FooterDos }
};
</script>
<style scoped>
/* perfil */
.pro {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: url(../assets/astro.jpg);
}
.pro li {
  list-style-type: none;
  align-items: center;
  margin-top: 50px;
  letter-spacing: 2.5px;
  text-align: center;
  background: #edf1e0;
  border: 0.5px solid #615656;
  font-size: 14px;
  height: 171px;
  width: 750px;
  box-shadow: 1px 1px 15px #333333;
}
:first-letter {
  color: rgb(50, 97, 81);
}
.pro li p {
  margin: 2rem;
  font-size: 30px;
}
.enlaces {
  background-image: url(../assets/quest.jpg);
}
.enlaces ul li a {
  color: white;
  font-size: 35px;
  text-decoration: none;
}
.enlaces ul li p {
  color: white;
  font-size: 20px;
}
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.preenlaces {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-image: url(../assets/quest.jpg);
}
.preenlaces li {
  border-radius: 55%;
  display: flex;
  background-image: url(../assets/quest.jpg);
  box-shadow: 1px 1px 15px #333333;
  padding: 1rem;
  font-size: 40px;
}
/* Gallery */
#aw-gallery {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
  cursor: pointer;
  margin-left: 0;
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