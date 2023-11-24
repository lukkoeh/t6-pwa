<script setup>
import {ref, onBeforeMount} from 'vue'
import router               from "@/router";
import {useRoute}           from 'vue-router'

const route            = useRoute()
const stackId          = route.params.stackId
const cards            = ref([])
const stackName        = ref("")
const isFrontDisplayed = ref(true)
const currentCard      = ref({})
const isFinished       = ref(false)
const currentStack     = ref()

onBeforeMount(
    () => {
      getCards()
    }
)

function getNextCard () {
  for ( let card of cards.value ) {
    if ( card.probability > 0 ) {
      isFinished.value = false
      break
    }
    isFinished.value = true
  }
  if ( isFinished.value )
    return {
      front      : "Du hast alle Karten in diesem Stapel gelernt.",
      back       : "",
      probability: 0
    }

  let viableCards = []
  while ( viableCards.length === 0 ) {
    const seed = Math.random();
    cards.value.forEach(( c ) => {
      if ( seed <= c.probability && seed > 0 ) {
        viableCards.push(c)
      }
    })
    console.log(viableCards.length)
  }
  return viableCards[Math.floor(Math.random() * (viableCards.length))]
}

async function getCards () {
  const response = await fetch('/api/stack/' + stackId)
  if ( response.ok ) {
    response.json().then(resp => {
      currentStack.value = resp
      stackName.value    = resp.name
      cards.value        = resp.flashcards
      currentCard.value  = getNextCard()
    })
  } else if ( response.status === 401 )
    router.push('/login')
  else
    stackName.value = "Dieser Stapel wurde nicht gefunden."
}

function showBack () {
  isFrontDisplayed.value = false
}

function showNextCard () {
  currentCard.value      = getNextCard()
  isFrontDisplayed.value = true
}

function decProb () {
  if ( currentCard.value.probability > 0 ) {
    currentCard.value.probability = Math.round((currentCard.value.probability - 0.05)*100)/100
  }
  if ( currentCard.value.probability < 0.05 ) {
    currentCard.value.probability = 0
  }
  showNextCard()
}

function incprob () {
  if ( currentCard.value.probability < 1 ) {
    currentCard.value.probability = Math.round((currentCard.value.probability + 0.05)*100)/100
  }
  if ( currentCard.value.probability > 1 ) {
    currentCard.value.probability = 1
  }
  showNextCard()
}

//SAVES CURRENT STACK (currentStack)
async function saveStack () {
  const response = await fetch("/api/stack/", {
    method : "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body   : JSON.stringify(currentStack.value)
  })
  if ( response.ok ){
    router.push("/stack/" + stackId)
    return
  }
  console.log(response)
}

async function pushProb () {
  currentStack.value.flashcards = cards.value
  await saveStack()
}

async function finishStudy () {
  currentStack.value.flashcards.forEach(card => {
    card.probability = 0.1
  })
  await saveStack()
}
</script>

<template>
  <div class="study">
    <h2>{{ stackName }}</h2>
    <div class="card listshadow">
      {{ isFrontDisplayed ? currentCard.front : currentCard.back }}
    </div>
    <div class="controls">
      <div>
        <button class="onlyoutlinebtn borderblue" @click="showBack()" :disabled="!isFrontDisplayed || isFinished">
          Antwort zeigen
        </button>
      </div>
      <div>
        <button class="onlyoutlinebtn bordergreen" @click="decProb" :disabled="isFrontDisplayed || isFinished">Gewusst</button>
      </div>
      <div>
        <button class="onlyoutlinebtn borderred" @click="incprob" :disabled="isFrontDisplayed || isFinished">Nicht Gewusst</button>
      </div>
      <div>
        <button @click="isFinished ? finishStudy() : pushProb()"
                :class="!isFinished ? 'onlyoutlinebtn borderred' : 'onlyoutlinebtn bordergreen'">
          {{ isFinished ? 'Zurück zur Übersicht' : 'Beenden' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 50%;
  min-height: 200px;
  border-radius: 5px;
  margin: 60px auto auto;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}


.controls {
  margin: 0 auto;
  display: flex;
  width: 50%;
  justify-content: space-between;
}

.controls div {
  width: 25%;
}

@media only screen and (max-width: 600px) {
  .controls {
    flex-direction: column;
  }
  .controls div {
    width: auto;
    margin: 8px 0;
  }
  .card {
    min-height: 50px;
  }
}
</style>