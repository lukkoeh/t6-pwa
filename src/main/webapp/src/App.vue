<template>
  <div :class="(menuVisible ? 'wrapper': 'wrapper-nomenu')">
    <div class="nav">
      <ul>
        <li>
          <button id="logoutBtn" class="darkbtn" @click="loggedIn ? logout() : router.push('/login')">
            {{ loggedIn ? 'Abmelden' : 'Anmelden' }}
          </button>
        </li>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/profile">Profileinstellungen</router-link>
        </li>
      </ul>
    </div>
    <main class="site">
      <div id="menuToggle">
        <img alt="arrow" @click="toggleMenu" :style="(menuVisible ? {'transform': 'rotate(180deg)'}: '')"
             src="/right-arrow.svg">
      </div>
      <div class="content">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #232b40;
}

ul {
  list-style-type: none;
  padding: 0;
}

#menuToggle {
  float: left;
  position: fixed;
  transform-origin: center;
}

#menuToggle:hover {
  cursor: pointer;
}

#menuToggle img {
  width: 35px;
  margin: 5px 0;
  transition: 200ms;
}

body {
  margin: 0;
}

.wrapper {
  display: grid;
  position: relative;
  grid-template-columns: 30% auto;
  transition: 200ms;
}

.wrapper-nomenu {
  display: grid;
  position: relative;
  grid-template-columns: 0 auto;
  transition: 200ms;
}

.wrapper-nomenu .nav ul {
  translate: -100%;
  transition: 200ms ease-out;
}

.wrapper-nomenu .nav li {
  opacity: 0;
  transition: 200ms linear;
}

.wrapper .nav {
  transition: 200ms ease-out;
}

.nav ul {
  position: fixed;
  list-style-type: none;
  width: 30%;
  padding: 0;
  transition: 200ms;
}

.wrapper .nav li {
  opacity: 100%;
  transition: 200ms ease-out;
}

.wrapper .nav li:nth-child(1) {
  transition-delay: 20ms;
}

.wrapper .nav li:nth-child(2) {
  transition-delay: 80ms;
}

.wrapper .nav li:nth-child(3) {
  transition-delay: 140ms;
}

button {
  border-radius: 12px;
  border: none;
  color: white;
  transition: 100ms;
  padding: 10px;
  font-weight: bold;
}

.darkbtn {
  background-color: #465b9a;
}

button:hover {
  cursor: pointer;
  transition: 100ms;
}

.darkbtn:hover {
  background-color: #232b40;
  transition: 200ms;
}

.darkbtn:active {
  background-color: #000;
  transition: 200ms;
}

#logoutBtn {
  padding: 12px;
  font-size: 18px;
}

.nav {
  background: #e8e8e8;
  min-height: 100vh;
  height: 100%;
  font-size: 18px;
}

.nav li {
  padding: 20px 0;
}

a {
  color: #2c3e50;
}

.nav a {
  text-decoration: none;
  width: 100%;
}

.nav a.router-link-exact-active {
  font-weight: bold;
}

.nav ul {
  margin: 0 auto;
}

::selection {
  background: #ffa676;
}

::-moz-selection {
  background: #ffa676;
}

.login, .profile, .register {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  min-height: 100vh;
}

#loginForm, #profileForm, #registerForm {
  display: flex;
  flex-flow: column;
  min-width: 400px;
  width: 50%;
}

input {
  border-radius: 4px;
  height: 20pt;
  padding: 5px;
  width: 50%;
  border: 1px solid #e8e8e8;
  margin: 10px auto;
}

input:focus {
  outline: 2px solid #465b9a;
}

textarea {
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  resize: none;
}

textarea:focus {
  outline: 2px solid #465b9a;
}
@keyframes errorWiggle {
  0% {
    translate: -20px
  }
  25% {
    translate: 20px;
  }
  50% {
    translate: -10px;
  }
  75% {
    translate: 10px;
  }
  100% {
    translate: 0;
  }
}

.error {
  width: 50%;
  background-color: rgba(255, 101, 101, 0.7);
  color: white;
  margin: 10px auto;
  border-radius: 15px;
  border: 2px solid #ff6565;
}

.errorAnim {
  animation: errorWiggle .2s;
}

.invalid {
  box-shadow: 0 0 4px red;
}

.onlyoutlinebtn {
  background-color: white;
  border: 1px solid;
  color: #232b40;
  transition: 60ms;
}

.borderblue {
  border-color: #d7dee3;
}

.borderred {
  border-color: #ff8c8c;
}


.bordergreen {
  border-color: #c8e0ce;
}

.onlyoutlinebtn:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  translate: 0 -3px;
  background-color: white;
}

.onlyoutlinebtn:active {
  box-shadow: none;
  translate: 0;
}

button:disabled {
  color: grey;
  border-color: #EEE;
  cursor: not-allowed;
}

button:disabled:hover {
  box-shadow: none;
  border-color: #EEE;
  translate: 0;
}
.w50p {
  width: 50%;
  margin: auto;
}

.listshadow {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}

@media only screen and (max-width: 600px) {
  .nav ul {
    margin: 0 auto;
    width: auto;
    position: static;
  }

  .nav {
    z-index: 1;
    width: 200px;
    position: fixed;
    display: block;
    float: left;
  }

  .wrapper {
    display: block;
    overflow: hidden;
    width: 100%;
  }

  .wrapper #menuToggle {
    translate: 200px;
    transition: 200ms;
  }

  .wrapper-nomenu {
    display: block;
    overflow: hidden;
    width: 100%;
  }

  #menuToggle {
    float: none;
    display: block;
    position: fixed;
    top: 0;
    background-color: white;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
  }

  #menuToggle img {
    margin: 0 auto;
    display: block;
  }

  .wrapper-nomenu .nav {
    display: block;
    translate: -100%;
    transition: 200ms;
  }


  /* TODO ONLY ADD IF NECESSARY
    .content {
     margin-top: 50px;
   }*/
}
</style>
<script setup>
import {ref, provide} from 'vue'
import router         from "@/router";
import {cookieExists} from "@/utils";

const loggedIn = ref(cookieExists('quarkus-credential'));

provide('loggedIn', loggedIn)
const logout      = function () {
  document.cookie = "quarkus-credential=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
  loggedIn.value  = false;
  router.push('/');
}
const menuVisible = ref(false);
const toggleMenu  = function () {
  menuVisible.value = !menuVisible.value;
}
</script>
