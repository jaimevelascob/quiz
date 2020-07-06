<template>
  <div>
    <div>
      <!-- MENU -->
      <menucustom></menucustom>
      <!-- /MENU -->
    </div>
    <div>
      <!-- PROFILE COMPONENT -->
      <ProfileComponent :profile="profile"></ProfileComponent>
    </div>
    <!-- /PROFILE COMPONENT -->
    <!-- BUTTONS -->
    <div>
      <section v-show="getIds()">
        <button @click="openModal('pass')">Cambiar Contraseña</button>
        <button @click="eliminar()">Borrar Perfil</button>
      </section>
    </div>
    <!-- /BUTTONS -->
    <!-- CONTRASEÑA -->
    <div class="modal" v-show="modalPass">
      <div class="modalBox">
        <p class="color1" v-show="required">Tienes datos sin completar</p>
        <p class="color2" v-show="match">Las contraseñas no coinciden</p>
        <p>Contraseña antigua</p>
        <input
          name="oldpassword"
          required
          type="password"
          minlength="6"
          maxlength="100"
          placeholder="antigua contraseña"
          v-model="old_user_password"
        />
        <br />
        <p>Contraseña Nueva</p>
        <input
          name="password"
          required
          type="password"
          minlength="6"
          maxlength="100"
          placeholder="nueva contraseña"
          v-model="password"
        />
        <p>Repite la contraseña</p>
        <input
          name="password2"
          required
          type="password"
          minlength="6"
          maxlength="100"
          placeholder="Repite la contraseña"
          v-model="password2"
        />
        <br />
        <button @click="closeModal()">Cancelar</button>
        <button @click="changePassword()">Cambiar Contraseña</button>
      </div>
    </div>
    <!-- /CONTRASEÑA -->
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import { clearLogin } from "../api/utils";

import axios from "axios";
import Swal from "sweetalert2";
import ProfileComponent from "@/components/ProfileComponent.vue";
export default {
  name: "Profile",
  components: {
    menucustom,
    ProfileComponent
  },
  data() {
    return {
      old_user_password: "",
      password: "",
      password2: "",
      profile: {},
      modalEdit: false,
      modalPass: false,
      email: "",
      role: "",
      correctData: false,
      required: false,
      match: false
    };
  },
  methods: {
    validatingData() {
      if (
        this.old_user_password === "" ||
        this.password === "" ||
        this.password2 === ""
      ) {
        this.correctData = false;
        this.required = true;
        // SI LA PASS NO ES =
      } else if (this.password != this.password2) {
        this.match = true;
        // SI LA PASS ES =
      } else {
        this.correctData = true;
        this.required = false;
        this.match = false;
      }
    },
    logoutUser() {
      clearLogin();
      this.$router.push("/");
      return;
    },
    eliminar() {
      Swal.fire({
        title: "Estas seguro de que quieres borrar tu perfil?",
        text: "Despues de hacerlo no podras volver atrás!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borra mi perfil!"
      }).then(result => {
        if (result.value) {
          Swal.fire(
            "Has borrado tu perfil!",
            "Seras redirigido al Landing.",
            "success"
          );
          this.deleteUser();
          clearLogin();
          this.$router.push("/");
        }
      });
    },
    deleteUser() {
      let self = this;
      axios
        .delete("http://localhost:3000/users/" + this.profile.id)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    changePassword() {
      this.validatingData();
      if (this.correctData == true) {
        let self = this;
        axios
          .post(`http://localhost:3000/users/${self.profile.id}/password`, {
            oldPassword: self.old_user_password,
            newPassword: self.password
          })
          .then(function(response) {
            console.log(response);
            Swal.fire(
              "Has cambiado tu contraseña!",
              "Seras redirigido al Login.",
              "success"
            );
            self.logoutUser();
          })
          .catch(function(error) {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      } else {
        console.log("No has rellenado todos los campos");
      }
    },
    edite() {
      let self = this;
      axios
        .put("http://localhost:3000/users/" + this.profile.id, {
          email: this.email
        })
        .then(function(response) {
          console.log(response);
          location.reload();
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    closeModal() {
      this.modalEdit = false;
      this.modalPass = false;
    },
    getIds() {
      return true;
    },
    saveDataToModal() {
      this.email = this.profile.email;
      this.role = this.profile.role;
    },
    getProfile() {
      let self = this;
      axios
        .get("http://localhost:3000/users/" + self.$route.params.id)
        .then(function(response) {
          //TIEMPO DE CARGA

          self.profile = response.data.data;
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
            /*   self.$router.push({ path: "/error" }); */
          }
        });
    },
    openModal(param) {
      if (param === "edit") {
        this.saveDataToModal();
        this.modalEdit = true;
      } else {
        this.modalPass = true;
      }
    }
  },
  created() {
    this.getProfile();
  }
};
</script>

<style scoped>
button {
  position: absolute;
  margin-top: 25px;
  margin-bottom: 50px;
  width: initial;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(20, 1, 1, 0.65) 0px -4px inset;
  color: rgb(51, 51, 51);
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  min-width: 42px;
  min-height: 42px;
  position: relative;
  line-height: 0.875rem;
  word-wrap: break-word;
  background: rgb(255, 255, 255);
  border-radius: 40px;
  text-decoration: none;
  padding: 0px 20px 4px;
  letter-spacing: 1px;
}
.modal {
  position: fixed;
  top: 300px;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255);
  width: 100%;
}
</style>
