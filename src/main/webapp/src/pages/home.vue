<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Smart-Flashcards</f7-nav-title>
      <f7-nav-title-large>Smart-Flashcards</f7-nav-title-large>
    </f7-navbar>
    <!-- Page content-->
    <f7-block>
      <p>Welcome to smart-flashcards. Please login to see your personal stacks of flashcards.</p>
      <f7-button fill class="popup-open" data-popup=".create-popup">Create new stack</f7-button>
    </f7-block>
    <f7-block-title>Your Stacks</f7-block-title>

    <div class="card" v-for="(stack, index) in stacks" :key="stack.id" @click="learnStack(stack.id)">
      <div class="card-header">{{ stack.name }}</div>
      <div class="card-content card-content-padding">
        <p>{{ stack.description }}</p>
      </div>
      <div class="card-footer">
        <p style="border: 1px solid #333; color: #000; background-color: #eee;" class="button">{{ stack.card_count }}
          Cards</p>
        <div class="display-flex justify-content-flex-end flex-direction-row" style="width: 50%; gap: 10px;">
          <f7-button fill class="button" @click.stop="openEditPopup">Edit</f7-button>
          <f7-button fill class="color-red" @click.stop="confirmDeletion">Delete</f7-button>
        </div>
      </div>
    </div>
  </f7-page>
  <f7-popup id="learn-popup" class="learn-popup-cl">
    <f7-view>
      <f7-page>
        <f7-navbar title="Learn Stack">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
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
import {f7} from "framework7-vue";
import {computed, onMounted, inject, ref, nextTick} from "vue";
import {cookieExists} from "../js/utils.js"
import {fetchStacks} from "../js/api-client"
import {fetchCards} from "../js/api-client"
import {stacks, cards, current_stack_id, current_card_id, current_stack_index, editStackName, editStackDescription} from '../js/state'


const router = f7.views.main.router;


const current_card_question = computed(() => {
  return cards.value.find(card => card.id === current_card_id.value)?.front;
});
const current_card_answer = computed(() => {
  return cards.value.find(card => card.id === current_card_id.value)?.back;
});
const current_card_state = ref(true);

onMounted(async () => {
  if (cookieExists("quarkus-credential")) {
    await loadStacks();
  } else {
    //f7.loginScreen.open("#my-login-screen")
    f7.loginScreen.open("my-login-screen");
  }
})

async function loadStacks() {
  const response = await fetchStacks()
  if (response.status === 401) {
    f7.loginScreen.open("#my-login-screen")
  } else {
    response.json().then(data => {
      if (data.length > 0) {
        stacks.value = data;
      }
    })
  }
}

function confirmDeletion() {
  f7.dialog.confirm("Do you want to delete this resource?", () => {
    // TODO: Implement deletion logic here
  })
}

async function openEditPopup(index: number) {
  current_stack_index.value = index;
  editStackName.value = stacks.value[index].name;
  editStackDescription.value = stacks.value[index].description
  f7.popup.create({
    el: "#edit-popup",
  }).open();
  await loadCards(stacks.value[index].id)
}

async function learnStack(id: number) {
  f7.dialog.alert(`You clicked on stack with id ${id}`);
  current_card_id.value = 1;
  current_stack_id.value = id;
  f7.popup.create({
    el: "#learn-popup",
  }).open();
  await loadCards(id);
}

async function loadCards(stackid: number) {
  const response = await fetchCards(stackid);
  if (response.ok) {
    cards.value = await response.json()
  } else {
    f7.loginScreen.open("my-login-screen")
  }
}

function incrementCard(known: boolean) {
  if (known) {
    f7.dialog.alert("Correct!");
  } else {
    f7.dialog.alert("Incorrect!");
  }
  current_card_id.value++;
  if (current_card_id.value > cards.value.length) {
    f7.dialog.alert("You have finished the stack!");
    f7.popup.close();
  }
}
</script>