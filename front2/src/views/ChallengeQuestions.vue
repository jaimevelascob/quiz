<template>
  <div>
    <div>
      <div>
        <p class="color1" v-show="required">Tienes datos sin completar</p>
        <p class="color2" v-show="match">Las contraseñas no coinciden</p>
        <div>
          <input type="title" name="title" v-model="title" placeholder="Nombre del reto..." />
        </div>
        <div>
          <input type="text" name="text" v-model="text" placeholder="Pregunta..." />
        </div>
        <!-- PREGUNTA A-->
        <div>
          <ul>
            <li>
              <input type="answer" name="answer" v-model="answerA" placeholder="Question A..." />
            </li>
            <li>
              <img src />
            </li>
          </ul>
        </div>
        <!-- PREGUNTA B-->
        <div>
          <ul>
            <input type="answer" name="answer" v-model="answerB" placeholder="Question B..." />
            <li>
              <img src />
            </li>
          </ul>
        </div>
        <!-- PREGUNTA C-->
        <div>
          <ul>
            <input type="answer" name="answer" v-model="answerC" placeholder="Question C..." />
            <li>
              <img src />
            </li>
          </ul>
        </div>
        <!-- PREGUNTA D-->
        <div>
          <ul>
            <input type="answer" name="answer" v-model="answerD" placeholder="Question D..." />
          </ul>
          <div>
            <input type="text" name="time" v-model="time" placeholder="Tiempo..." />
          </div>
        </div>
        <!-- SUBIR IMAGEN -->
        <label for="imgmeeting">Elije una imagen del lugar donde se va a realizar el evento:</label>
        <input
          type="file"
          id="file"
          ref="file"
          accept="image/png, image/jpg"
          v-on:change="handleFileUpload()"
        />
      </div>
      <div>
        <button @click="uploadEvent()">Crear</button>
        <!-- <router-link :to="{ name: 'Login' }">Login</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Importando AXIOS
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";

// Importando funcion addChallenge
import { addChallenge } from "../api/utils";
export default {
  name: "ChallengeQuestions",
  data() {
    return {
      title: "",
      text: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      correctData: false,
      required: false,
      match: false,
      time: "",
      file: ""
    };
  },
  methods: {
    //COMPROBAR QUE LOS DATOS NO ESTÁN VACIOS
    validatingData() {
      if (
        this.title === "" ||
        this.time === "" ||
        this.text === "" ||
        this.answerA === "" ||
        this.answerB === "" ||
        this.answerD === "" ||
        this.answerC === ""
      ) {
        this.correctData = false;
        this.required = true;
        // SI LA PASS NO ES =
      } else if (this.password != this.repeatpassword) {
        this.match = true;
        // SI LA PASS ES =
      } else {
        this.correctData = true;
        this.required = false;
        this.match = false;
      }
    },
    //AÑADIR NUEVO USUARIO A LA BBDD
    async uploadEvent() {
      console.log(this.file);
      this.validatingData();
      if (this.correctData) {
        try {
          const photoFormData = new FormData();
          // dict of all elements
          photoFormData.append("title", this.title);
          photoFormData.append("text", this.text);
          photoFormData.append("answerA", this.answerA);
          photoFormData.append("answerB", this.answerB);
          photoFormData.append("answerC", this.answerC);
          photoFormData.append("answerD", this.answerD);
          photoFormData.append("time", this.time);
          if (this.file.length) {
            photoFormData.append("photo", this.file);
            console.log(this.file);
          }
          await addChallenge(photoFormData);
          Swal.fire({
            icon: "success",
            title: "Has subido tu evento!",
            text: "Estate atent@ por si alguien se apunta!"
          });
          this.$router.push("/challenges");
        } catch (error) {
          alert(error.response.data.message);
        }
      }
      return;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    //LIMPIAR CAMPOS INPUT
    emptyFields() {
      (this.answerA = ""),
        (this.answerB = ""),
        (this.answerC = ""),
        (this.answerD = ""),
        (this.time = ""),
        (this.text = "");
      //MENSAJE SWAL
      this.$router.push("/challenges");
    }
  }
};
</script>

<style>
</style>