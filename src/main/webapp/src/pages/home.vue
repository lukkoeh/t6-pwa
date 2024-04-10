<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link v-if="!is_offline" icon-ios="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Smart-Flashcards</f7-nav-title>
      <f7-nav-title-large>Smart-Flashcards</f7-nav-title-large>
    </f7-navbar>
    <!-- Page content-->
    <f7-block>
      <p>Welcome to smart-flashcards. Please login to see your personal stacks of flashcards.</p>

      <div v-if="is_offline" style="margin-bottom: 10px;">
        <p>The app is offline, progress is only saved <b>on device</b></p>
        <f7-button fill class="color-red" @click="updateOfflineStatus">Recheck connection</f7-button>
      </div>
      <f7-button v-if="!is_offline" fill class="popup-open" data-popup=".create-popup">Create new stack</f7-button>
    </f7-block>
    <f7-block-title>Your Stacks</f7-block-title>
    <div class="card" v-for="(stack, index) in stacks" :key="stack.id" @click="learnStack(index)">
      <div class="card-header">{{ stack.name }}</div>
      <div class="card-content card-content-padding">
        <p>{{ stack.description }}</p>
      </div>
      <div class="card-footer">
        <p style="border: 1px solid #333; color: #000; background-color: #eee;" class="button">{{ stack.card_count }}
          Cards</p>
        <div class="display-flex justify-content-flex-end flex-direction-row" style="width: 50%; gap: 10px;">
          <f7-button fill class="button" @click.stop="openEditPopup(index)">Edit</f7-button>
          <f7-button v-if="!is_offline" fill class="color-red" @click.stop="confirmStackDeletion(index)">Delete</f7-button>
        </div>
      </div>
    </div>
  </f7-page>

  <f7-popup id="learn-popup" class="learn-popup-cl">
    <f7-view>
      <f7-page>
        <f7-navbar title="Learn Stack">
          <f7-nav-right>
            <f7-link @click="cancelLearnSession">Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <div class="card" @click="()=> {current_card_state = !current_card_state}">
            <div class="card-header">Card {{ current_card_id }}</div>
            <div class="card-content card-content-padding">
              <p v-if="current_card_state">{{ current_card_question }}</p>
              <p v-else>{{ current_card_answer }}</p>
            </div>
          </div>
          <div class="padding display-flex justify-content-space-between">
            <f7-button fill @click="incrementCard(false)">Did not know</f7-button>
            <f7-button fill @click="incrementCard(true)">Did know</f7-button>
          </div>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup>
</template>
<script setup lang="ts">
import {f7, f7ready} from "framework7-vue";
import {computed, onMounted, inject, ref, nextTick} from "vue";
import {cookieExists, updateOfflineStatus, loadStacks} from "../js/utils.js"
import {fetchStacks} from "../js/api-client"
import {is_offline} from "../js/state"

import {
  stacks,
  cards,
  current_stack_id,
  current_card_id,
  current_stack_index,
  editStackName,
  editStackDescription
} from '../js/state'


const router = f7.views.main.router;


const current_card_index = ref(0)

const current_card_question = ref("")
const current_card_answer = ref("")

const current_card_state = ref(true);

onMounted(async () => {
  f7ready(async () => {
    await updateOfflineStatus()
  })
})

async function cancelLearnSession() {
  if(is_offline.value){
    stacks.value[current_stack_index.value].flashcards = cards.value;
    localStorage.setItem(`stack_${stacks.value[current_stack_index.value].id}`, JSON.stringify(stacks.value[current_stack_index.value]))
  } else {
    const response = await fetch("api/stack/", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: stacks.value[current_stack_index.value].id,
        name: stacks.value[current_stack_index.value].name,
        flashcards: cards.value,
      })
    })
  }
  f7.dialog.alert("Progress was saved!")
  f7.popup.close();
}



async function confirmStackDeletion(index: number) {
  f7.dialog.confirm("Do you want to delete this resource?", async () => {
    const res = await fetch(`api/stack/${stacks.value[index].id}`, {
      method: 'DELETE',
    }).then(async (r) => {
      if (r.ok) {
        const response = await fetchStacks()
        if (response.status === 401) {
          f7.loginScreen.open("my-login-screen")
        } else {
          response.json().then(data => {
            stacks.value = data;
          })
        }
      }
    })
  })
}

  async function openEditPopup(index: number) {
    current_stack_index.value = index;
    editStackName.value = stacks.value[index].name;
    editStackDescription.value = stacks.value[index].description
    f7.popup.create({
      el: "#edit-popup",
    }).open();
    await loadCards(index)
  }

  async function learnStack(index: number) {
    await loadCards(index);
    current_card_index.value = getNextCardIndex()

    current_card_id.value = cards.value[current_card_index.value].id;

    current_card_question.value = cards.value[current_card_index.value].front
    current_card_answer.value = cards.value[current_card_index.value].back
    current_stack_id.value = stacks.value[index].id;
    f7.popup.create({
      el: "#learn-popup",
    }).open();
  }

  function getNextCardIndex() {
    let isFinished = true;

    for (let card of cards.value) {
      if (card.probability > 0) {
        isFinished = false;
      }
    }

    if (isFinished) {
      return -1;
    }
    let viableCards = []
    while (viableCards.length === 0) {
      const seed = Math.random()
      cards.value.forEach(c => {
        if (seed <= c.probability && seed > 0) {
          viableCards.push(c)
        }
      })
    }
    const retCard  = viableCards[Math.floor(Math.random() * (viableCards.length))]

    for (let i = 0; i < cards.value.length; i++) {
      if (cards.value[i].id == retCard.id) {
        return i
      }
    }

    return -1
  }

  async function loadCards(stackIndex: number) {
      cards.value = stacks.value[stackIndex].flashcards
  }

  async function incrementCard(known: boolean) {
    if (known) {
      decProb()
    } else {
      incProb()
    }
    current_card_index.value = getNextCardIndex()

    if (current_card_index.value < 0) {
      cards.value.forEach(c => {
        c.probability = 0.1;
      })
      f7.dialog.alert("You have finished the stack!")
      if (is_offline.value) {
        stacks.value[current_stack_index.value].flashcards = cards.value
        localStorage.setItem(`stack_${stacks.value[current_stack_index.value].id}`, JSON.stringify(stacks.value[current_stack_index.value]))
      } else {
        const response = await fetch("/api/stack/", {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: stacks.value[current_stack_index.value].id,
            name: stacks.value[current_stack_index.value].name,
            flashcards: cards.value,
          })
        })
      }
      f7.dialog.alert("Progress was reset!")
      f7.popup.close();
      return;
    }

    current_card_question.value = cards.value[current_card_index.value].front
    current_card_answer.value = cards.value[current_card_index.value].back

  }

  function incProb() {
    if(cards.value[current_card_index.value].probability < 1) {
      cards.value[current_card_index.value].probability =
        Math.round((cards.value[current_card_index.value].probability + 0.05)*100)/100
    }
    if(cards.value[current_card_index.value].probability > 1) {
      cards.value[current_card_index.value].probability = 1
    }
  }
function decProb() {
  if(cards.value[current_card_index.value].probability > 0) {
    cards.value[current_card_index.value].probability =
      Math.round((cards.value[current_card_index.value].probability - 0.05)*100)/100
  }

  if(cards.value[current_card_index.value].probability < 0.05) {
    cards.value[current_card_index.value].probability = 0
  }
}
</script>