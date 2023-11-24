<script setup>
import {ref, inject}      from 'vue'
import ErrorBox           from "@/components/ErrorBox.vue";
import {sendLoginRequest} from "@/user";
import router             from "@/router";
import {restartAnimation} from "@/utils";


const loggedIn         = inject('loggedIn')
const password         = ref('')
const repeatPassword   = ref('')
const userExists       = ref(false)
const passwordEmpty    = ref(false)
const passwordMismatch = ref(false)

async function addUser () {
  const formData         = Object.fromEntries(new FormData(document.querySelector('#registerForm')).entries())
  passwordMismatch.value = formData.password !== formData.repeatpw
  passwordEmpty.value    = formData.password == ''
  if ( !passwordMismatch.value && !passwordEmpty.value ) {
    const response = await fetch('/api/user', {
      method : 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body   : JSON.stringify(formData)
    })

    if ( !response.ok ) {
      userExists.value   = true;
      const errorElement = document.querySelector(".error")
      if ( errorElement ) {
        restartAnimation(errorElement)
      }
    } else {
      userExists.value    = false;
      const loginFormData = new FormData
      loginFormData.append('login_username', formData.username)
      loginFormData.append('login_password', formData.password)
      if ( await sendLoginRequest(new URLSearchParams(loginFormData)) ) {
        loggedIn.value = true;
        router.push('/')
      }
    }
  }
}
</script>
<template>
  <div class="register">
    <h1>Registrieren</h1>
    <form id="registerForm" @submit.prevent="addUser">
      <input type="text" name="username" placeholder="Benutzername"
             :class="userExists ? 'invalid' : '' "/>
      <input type="password" name="password" placeholder="Passwort" v-model="password"
             :class="passwordEmpty ? 'invalid' : '' "/>
      <input type="password" name="repeatpw" placeholder="Passwort wiederholen" v-model="repeatPassword"
             :class="passwordMismatch ? 'invalid' : '' "/>
      <button type="submit" class="darkbtn w50p">Registrieren</button>
    </form>
    <error-box v-if="userExists" msg="Dieser Benutzername ist bereits vergeben!"/>
  </div>
</template>

<style scoped>

</style>
