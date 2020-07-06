<template>
  <div>
    <!-- Importando menu -->
    <div>
      <Menu></Menu>
    </div>
    <!-- /Importando menu -->
    <div class="primeracapa">
      <h1>Entender el juego:</h1>
      <h2>1. Crear Reto</h2>
      <p>Añadir título, dificultad y tiempo (imagen opcional)</p>
      <h2>2. Ir a lista de retos y añadir preguntas</h2>
      <h2>3. Una vez terminado de crear las preguntas, pulsar el de jugar y aceptar el reto</h2>
      <h2>4. Acabar el reto antes de que termine el tiempo</h2>
      <p>Si aciertas la pregunta pasas a la siguiente,</p>
      <p>pero si fallas, vuelves a la anterior.</p>
      <h3>El juego está pensado para que añadas tú la dificultad que creas conveniente</h3>
      <h3>conforme a las preguntas y el tiempo dado</h3>
      <h2>
        Si el reto es de dificultad difícil,
        habrá un botón con una habilidad especial que te dará +10 seg en el cronometro.
      </h2>
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
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border-radius: 100%;
}
.primeracapa:hover {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
}
p {
  font-size: 30px;
}
h3 {
  letter-spacing: 3px;
}
h2::first-letter {
  color: #ff6363;
}
</style>

