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
        <button @click="openModal('edit')">Editar</button>
        <button @click="openModal('pass')">Cambiar Contraseña</button>
        <button @click="eliminar()">Borrar Perfil</button>
      </section>
    </div>
    <!-- /BUTTONS -->
    <!-- CONTRASEÑA -->
    <div class="modal" v-show="modalPass">
      <div class="modalBox">
        <label for="password">Passwords:</label>
        <input
          name="oldpassword"
          required
          type="password"
          minlength="6"
          maxlength="100"
          placeholder="Introduce tu contraseña"
          v-model="old_user_password"
        />
        <input
          name="password"
          required
          type="password"
          minlength="6"
          maxlength="100"
          placeholder="Introduce tu contraseña"
          v-model="password"
        />
        <input
          name="password2"
          required
          type="password"
          minlength="6"
          maxlength="100"
          placeholder="Repite tu contraseña"
          v-model="password2"
        />
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
      role: ""
    };
  },
  methods: {
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
      if (this.user_password !== this.user_password2) {
        alert("Las contraseñas no coinciden");
        return;
      }
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
          setTimeout(function() {
            self.profile = response.data.data;
            console.log(self.profile);
          }, 1000);
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

<style>
</style>