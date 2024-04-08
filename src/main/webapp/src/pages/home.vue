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

    <div class="card" v-for="stack in stacks" :key="stack.id" @click="learnStack(stack.id)">
      <div class="card-header">{{ stack.name }}</div>
      <div class="card-content card-content-padding">
        <p>{{ stack.description }}</p>
      </div>
      <div class="card-footer">
        <p style="border: 1px solid #333; color: #000; background-color: #eee;" class="button">{{ stack.cards }}
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
import {f7}                               from "framework7-vue";
import { computed, onMounted, inject, ref} from "vue";
import {cookieExists}                     from "../js/utils.js"

const router = f7.views.main.router;


const current_stack_id = ref(0);
const current_card_id = ref(1);
const current_card_question = computed(()=> {
  return cards.value.find(card => card.id === current_card_id.value)?.question;
});
const current_card_answer = computed(()=> {
  return cards.value.find(card => card.id === current_card_id.value)?.answer;
});
const current_card_state = ref(true);
const stacks = ref([
  {
    id: 1,
    name: "Some random Stack of cards",
    description: "A random description for your stack. Lorem Lorem Ipsumus Maximus34",
    cards: 64
  },
  {
    id: 2,
    name: "Another stack of cards",
    description: "A random description for your stack. Lorem Lorem Ipsumus Maximus56",
    cards: 64
  },
  {
    id: 3,
    name: "The third is the best",
    description: "A random description for your stack. Lorem Lorem Ipsumus Maximus78",
    cards: 64
  },
])

onMounted(async () => {
  if ( cookieExists("quarkus-credential") ) {
    await loadStacks();
  } else {
    //f7.loginScreen.open("#my-login-screen")
    router.navigate("/form/")
  }
})
  const cards = ref([
                      {
                        id: 1,
                        question: "What is the capital of France?",
                        answer: "Paris",
                        visible: true
                      },
                      {
                        id: 2,
                        question: "What is the capital of Germany?",
                        answer: "Berlin",
                        visible: false
                      },
                      {
                        id: 3,
                        question: "What is the capital of Italy?",
                        answer: "Rome",
                        visible: false
                      },
                    ])

  async function loadStacks ()
  {
    const response = await fetch('api/stack', {
      headers: {
        'Accept': 'application/json'
      }
    })
    if ( response.status === 401 ) {
      router.navigate("/form/")
    } else {
      response.json().then(data => {
        if ( data.length > 0 ) {
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

function openEditPopup() {
  f7.popup.create({
    el: "#edit-popup",
  }).open();
}

function learnStack(id: number) {
  f7.dialog.alert(`You clicked on stack with id ${id}`);
  current_card_id.value = 1;
  current_stack_id.value = id;
  f7.popup.create({
    el: "#learn-popup",
  }).open();
  loadCards(id);
}

function loadCards(stackid: number) {

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