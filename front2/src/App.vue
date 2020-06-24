<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/registrer">registrer</router-link>|
      <router-link to="/login">login</router-link>|
      <router-link to="/challengeQuestions">Crear reto</router-link>|
      <router-link to="/challenges">Lista De Retos</router-link>|
      <router-link to="/challengeid">Retos</router-link>|
      <router-link to="/probando">probando</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
