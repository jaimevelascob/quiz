<template>
  <div>
    <!-- Importando menu -->
    <div>
      <Menu></Menu>
    </div>
    <!-- /Importando menu -->
    <div class="primeracapa">
      <h1>Entendiendo el juego:</h1>
      <h2>1. Crear Reto</h2>
      <p>Añadir título, dificultad y tiempo</p>
      <h2>2. Ir a lista de retos y añadir preguntas</h2>
      <h2>3. Darle a jugar y aceptar el reto</h2>
      <p>El boton de jugar solo aparecerá una vez que añadas preguntas.</p>
      <p>Una vez pulsado aparecerá un boton para confirmar el reto</p>
      <h2>4. Acabar el reto antes de que termine el tiempo</h2>
      <p>Si aciertas la respuesta, pasas a la siguiente pregunta.</p>
      <p>Pero si fallas vuelves a la anterior</p>
      <h3>El juego está pensado para que añadas tú la dificultad que creas conveniente</h3>
      <h3>conforme a las preguntas y el tiempo dado</h3>
      <div class="rock">
        <h1>Good luck</h1>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORTANDO MENU
import Menu from "@/components/MenuCustom.vue";
export default {
  name: "Instrucciones",
  components: { Menu }
};
</script>

<style scoped>
.primeracapa {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.rock {
  -webkit-animation: pulsate 3s ease-in-out;
  -webkit-animation-iteration-count: infinite;
  box-shadow: 4px 3px 15px #b963ff;
  color: rgb(81, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}
@-webkit-keyframes pulsate {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.6;
  }
}
</style>

