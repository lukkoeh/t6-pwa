<script setup>

import {sendLoginRequest} from '@/user'
import router        from '@/router'
import ErrorBox      from "@/components/ErrorBox.vue";
import {ref, inject} from 'vue'
import {restartAnimation} from "@/utils";

const loginFail = ref(false)
const loggedIn  = inject('loggedIn')

async function login () {
  const formElement = document.querySelector('#loginForm');
  const formData    = new URLSearchParams(new FormData(formElement));
  if ( await sendLoginRequest(formData) ) {
    router.go(-1)
    loginFail.value = false;
    loggedIn.value  = true;
  } else {
    loginFail.value    = true
    const errorElement = document.querySelector(".error")
    if ( errorElement ) {
      restartAnimation(errorElement)
    }
  }
}
</script>
<template>
  <div class="login">
    <h1>Anmelden</h1>

    <form id="loginForm" @submit.prevent="login">
      <input type="text" name="login_username" placeholder="Benutzername"/>
      <input type="password" name="login_password" placeholder="Passwort"/>
      <button type="submit" class="darkbtn w50p">Anmelden</button>
    </form>
    <p>Noch kein Konto?
      <router-link to="/register">Hier registrieren</router-link>
    </p>
    <error-box v-if="loginFail" msg="Anmeldung fehlgeschlagen. Überprüfe deine Benutzerdaten!"/>
  </div>
</template>

<style scoped>

</style>