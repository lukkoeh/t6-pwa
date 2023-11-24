<script setup>
import router               from "@/router";
import {ref, onBeforeMount} from 'vue'
import {sendLoginRequest} from "@/user";
import LoginError         from "@/components/ErrorBox.vue";
import {restartAnimation} from "@/utils";

const oldUsername = ref('')
const newUsername = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const loginFail   = ref(false)
onBeforeMount(
    () => {
      getUsername();
    }
);
const getUsername       = async function () {
  const response = await fetch("/api/user", {
    method: 'GET'
  });
  if ( response.status === 401 ) {
    router.push('/login');
    return '';
  }
  if ( response.status === 403 ) {
    alert("You don't have the permission to access this resource!");
    router.push('/login');
    return '';
  }
  response.text().then(text => {
    oldUsername.value = text;
    newUsername.value = text;
  });
}
const sendProfileUpdate = async function () {
  const formElement = document.querySelector('#profileForm');
  const formData    = new URLSearchParams(new FormData(formElement));
  if ( await sendLoginRequest(formData) ) {
    loginFail.value = false;
    const r_changeUser  = await fetch('/api/user', {
      method : 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body   : JSON.stringify({
                                oldUsername: oldUsername.value,
                                newUsername: newUsername.value,
                                newPassword: newPassword.value
                              })
    })
    if ( !r_changeUser.ok ) {
      console.log('nooo')
    }
  } else {
    loginFail.value    = true;
    const errorElement = document.querySelector('.error')
    if ( errorElement ) {
      restartAnimation(errorElement)
    }

  }

}

</script>

<template>
  <div class="profile">
    <h1>Profileinstellungen</h1>
    <form id="profileForm" @submit.prevent="sendProfileUpdate">
      <input type="text" name="username" placeholder="Benutzername" :value="newUsername"/>
      <input type="hidden" name="login_username" :value="oldUsername"/>
      <input type="password" name="login_password" placeholder="Altes Passwort" v-model="oldPassword"/>
      <input type="password" name="newpassword" placeholder="Neues Passwort" v-model="newPassword"/>
      <button type="submit" class="onlyoutlinebtn borderblue w50p">Profil aktualisieren</button>
    </form>
    <login-error v-if="loginFail" msg="Aktuelles Passwort falsch!"/>
  </div>
</template>
