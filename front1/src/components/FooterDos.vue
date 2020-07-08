<template>
  <div>
    <div class="footer">
      <!-- <p>&copy; L o g & Q u i z</p> -->
      <ul>
        <li>
          <a href class="uno">&copy</a>
          <a href class="dos">L</a>
          <a href class="tres">o</a>
          <a href class="cuatro">g</a>
          <a href class="cinco">&</a>
          <a href class="seis">Q</a>
          <a href class="siete">u</a>
          <a href class="ocho">i</a>
          <a href class="nueve">z</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  background: rgba(0, 0, 0, 0.8);

  color: white;
  text-align: center;
  padding: 13px;
  margin-top: 3px;
}

/* .footer p {
  margin: 0;
  letter-spacing: 10px;
}
p::first-letter {
  color: aqua;
} */
li {
  list-style-type: none;
  text-decoration: none;
}
li a {
  color: white;
  text-decoration: none;
  letter-spacing: 10px;
}
.uno {
  color: rgb(0, 255, 242);
}
.dos {
  color: rgb(131, 226, 43);
}
.tres {
  color: rgb(226, 198, 43);
}
.cuatro {
  color: rgb(43, 226, 186);
}
.cinco {
  color: rgb(131, 226, 43);
}
.seis {
  color: rgb(226, 198, 43);
}
.siete {
  color: rgb(43, 226, 186);
}
.ocho {
  color: rgb(131, 226, 43);
}
.nueve {
  color: rgb(226, 198, 43);
}
</style>