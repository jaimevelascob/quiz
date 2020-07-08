<template>
  <div>
    <div class="profile">
      <div class="profi2">
        <ul id="aw-gallery">
          <li>
            <p class="rol">{{ profile.id ? ' 🐻‍ ' + profile.id : null}}</p>
          </li>
          <li>
            <p>{{ profile.nickName ? profile.nickName : null}}</p>
          </li>
          <li>
            <p>{{ profile.email ? profile.email : null}}</p>
          </li>
          <li>
            <p>{{ profile.registrationDate ? 'Miembro desde: ' + profile.registrationDate.substr(0,10) : null}}</p>
          </li>
          <li>
            <p>{{ profile.role ? profile.role : null}}</p>
          </li>
        </ul>

        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileComponent",
  data() {
    return {
      //   path: "http://localhost:3001/uploads/defaultimg.png",
    };
  },
  props: {
    profile: Object
  },
  methods: {
    capitalize() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@400;600&display=swap");
* {
  font-family: "Dosis", sans-serif;
}
.profile {
  padding-top: 5rem;

  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
}
.profi2 {
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  background-image: url(../assets/hand.jpg);
  border-image-repeat: space;
  opacity: 0.9;
}
p {
  padding: 1rem;
  margin-left: 5rem;
  margin-right: 5rem;
  font-size: 25px;
  color: white;
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