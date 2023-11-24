<script setup>

import {ref, onBeforeMount} from 'vue'
import router               from "@/router";
import {useRoute}           from 'vue-router'
import ErrorBox             from "@/components/ErrorBox.vue";
import {restartAnimation}   from "@/utils";

const route              = useRoute()
const stackName          = ref('')
let oldStackName
const cards              = ref([])
const showNewCardForm    = ref(false)
const newCard            = ref({
                                 front      : '',
                                 back       : '',
                                 showOptions: false
                               })
const stackId            = route.params.stackId
const addFailed          = ref(false)
const errorMessage       = ref('')
const newCardInputError  = ref(false)
const editCardInputError = ref(false)
const editCardSaveError  = ref(false)
const deleteCardError    = ref(false)
const stackNameExists    = ref(false)
onBeforeMount(
    () => {
      getStack(stackId)
    }
)

async function getStack ( stackId ) {
  const response = await fetch('/api/stack/' + stackId)
  if ( response.ok )
    response.json().then(response => {
      stackName.value = response.name
      oldStackName    = response.name
      cards.value     = response.flashcards
    })
  else if ( response.status === 404 )
    document.querySelector('.stack h1').innerHTML = "Dieser Stapel wurde nicht gefunden!"
  else if ( response.status === 401 )
    router.push("/login")
}

async function removeStack () {
  const response = await fetch('/api/stack/' + stackId, {
    method: 'DELETE'
  })
  if ( response.status === 401 )
    router.push("/login")
  else
    router.push("/")
}

async function saveStack () {
  if ( oldStackName === stackName.value )
    return

  const response = await fetch('/api/stack', {
    method : 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body   : JSON.stringify({
                              id  : stackId,
                              name: stackName.value
                            })
  })
  switch ( response.status ) {
    case 200: {
      oldStackName = stackName.value
      stackNameExists.value = false
      break
    }
    case 401: {
      router.push('/login')
      stackNameExists.value = false
      break
    }
    case 400: {
      if(stackNameExists.value){
        const errorElement = document.querySelector('.error')
        restartAnimation(errorElement)
        break
      }
      stackNameExists.value = true
      errorMessage.value = "Ein Stapel mit dem Namen existiert bereits!"
      break
    }
  }

}

function toggleNewCardInput () {
  showNewCardForm.value = !showNewCardForm.value
  addFailed.value       = false;
}

async function addCard () {
  if ( newCard.value.front.length === 0 || newCard.value.back.length === 0 ) {
    newCardInputError.value = true;
    return;
  }
  const response = await fetch('/api/card/' + stackId, {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body   : JSON.stringify(newCard.value)
  })
  if ( addFailed.value ) {
    const errorElement = document.querySelector('.error')
    if ( errorElement )
      restartAnimation(errorElement);
  }
  if ( !response.ok ) {
    console.log(response.status)
    newCardInputError.value = true;
    addFailed.value         = true
    errorMessage.value      = 'Karte konnte nicht hinzugefügt werden.'
  } else {
    newCardInputError.value = false
    response.json().then(( res ) => {
      cards.value.push(res)
    })
    newCard.value.front = ''
    newCard.value.back  = ''
    addFailed.value     = false
  }
}

async function removeCard ( id ) {
  let deletedIndex
  let cardToDelete
  cards.value.forEach(( card, index ) => {
    if ( card.id === id ) {
      cardToDelete = {...cards.value[index]}
      cards.value.splice(index, 1)
      deletedIndex = index;
    }
  })
  const response = await fetch('/api/card/' + stackId, {
    method : 'DELETE',
    headers: {
      'Content-Type': 'text/plain'
    },
    body   : id
  })

  if ( !response.ok ) {
    if ( deletedIndex !== undefined && cardToDelete !== undefined ) {
      cards.value.splice(deletedIndex, 0, cardToDelete)
    }
    deleteCardError.value = true
    errorMessage.value    = "Karte konnte nicht gelöscht werden."
  }
}

async function editCard ( card, index ) {
  const response = await fetch('/api/card/' + stackId, {
    method : 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body   : JSON.stringify(card)
  })
  if ( response.ok ) {
    cards.value[index].showOptions = false;
  } else {
    editCardSaveError.value = true
    errorMessage.value      = "Änderungen konnten nicht gespeichert werden!"
  }
}
</script>

<template>
  <div class="stack">
    <h1>Optionen für "{{ stackName }}"</h1>
    <div class="options">
      <router-link :to="{path: '/study/' + stackId}">
        <button class="onlyoutlinebtn bordergreen" title="Lernen" :disabled="cards.length == 0"><img
            src="/study.svg" alt="trashcan"
            style="height: 20px"></button>
      </router-link>
      <button class="onlyoutlinebtn borderblue" title="Speichern" @click="saveStack"><img src="/save.svg" alt="trashcan"
                                                                                          style="height: 20px"></button>
      <button class="onlyoutlinebtn borderred" title="Löschen" @click="removeStack"><img src="/trash.svg" alt="trashcan"
                                                                                         style="height: 20px">
      </button>
    </div>
    <div id="i_stackname">
      <label for="stackname">Name:</label>
      <input name="stackname" type="text" v-model="stackName" placeholder="Name"
             :class="stackNameExists ? 'invalid': ''">
    </div>
    <error-box v-if="stackNameExists" :msg="errorMessage"></error-box>
    <h2>Karten</h2>
    <div id="newcardform" class="flexcol" v-if="showNewCardForm">
      <textarea name="front" placeholder="Vorderseite" v-model="newCard.front"
                :class="newCardInputError ? 'invalid' : ''"></textarea>
      <textarea name="back" placeholder="Rückseite" v-model="newCard.back"
                :class="newCardInputError ? 'invalid' : ''"></textarea>
      <div class="btnblock">
        <button class="onlyoutlinebtn bordergreen" @click="addCard">Bestätigen</button>
        <button class="onlyoutlinebtn borderred" @click="toggleNewCardInput">Abbrechen</button>
      </div>
    </div>
    <error-box v-if="deleteCardError" :msg="errorMessage"></error-box>
    <div class="cardlist" v-if="cards.length > 0">
      <error-box v-if="editCardSaveError" :msg="errorMessage"/>
      <ul>
        <li v-for="(card, index) in cards" :key="card.id" class="listshadow">
          <div class="cardfront">
            <p @click="card.showOptions = !card.showOptions">{{ card.front }}</p>
          </div>
          <div class="cardoptions" v-if="card.showOptions">
            <div class="flexcol ta">
              <textarea name="front" placeholder="Vorderseite" rows="4" v-model="card.front"
                        :class="editCardInputError ? 'invalid' : ''"></textarea>
              <textarea name="back" placeholder="Rückseite" rows="6" v-model="card.back"
                        :class="editCardInputError ? 'invalid': ''"></textarea>
            </div>
            <div class="flexcol">
              <button class="onlyoutlinebtn borderred" title="Löschen" @click="removeCard(card.id)">
                <img src="/trash.svg" alt="trashcan" style="height: 15px"></button>
              <button class="onlyoutlinebtn borderblue" title="Speichern" @click="editCard(card, index)"><img
                  src="/save.svg" alt="trashcan"
                  style="height: 15px"></button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Keine Karten vorhanden.</div>
    <error-box v-if="addFailed" :msg="errorMessage"/>
    <button class="onlyoutlinebtn borderblue" @click="toggleNewCardInput" style="margin: 10px auto">+</button>
  </div>
</template>

<style scoped>
.btnblock {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

#newcardform {
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #d7dee3;
  width: 33%;
  min-width: 300px;
  margin: 15px auto;
}

#newcardform textarea {
  width: 100%;
  height: 130px;
}

.ta {
  width: 50%;
  min-width: 130px;
}

label {
  font-weight: bold;
  margin: 10px;
}

.cardoptions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #d7dee3;
}

.cardoptions textarea {
  width: 100%;
}

input {
  max-width: 50%;
}

.flexcol {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flexcol button {
  margin: 2px 12px;
}

.cardlist li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 0;
  margin: 30px 10px;
  border-radius: 10px;
}

.cardfront {
  flex: 1 1 auto;
}

.cardfront p {
  padding: 5px;
  border-radius: 5px;
}

.cardfront p:hover {
  background-color: #d7dee3;
  cursor: pointer;
}

#i_stackname {
  width: 50%;
  margin: auto;
}

.options {
  display: flex;
  justify-content: center;
  margin: auto;
}


button {
  padding: 10px 30px;
  transform-origin: center;
  display: flex;
  margin: 10px;
}

.cardlist {
  border-radius: 10px;
  border: 1px solid #d7dee3;
  max-width: 800px;
  min-width: 300px;
  margin: auto;
  max-height: 750px;
  overflow: auto;
}

@media only screen and (max-width: 600px) {
  .cardoptions {
    width: 50%;
  }

  .cardoptions button {
    padding: 10px 10px;
  }
}
</style>
