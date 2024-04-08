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

    <div class="card" v-for="stack in stacks" :key="stack.id">
      <div class="card-header">{{ stack.name }}</div>
      <div class="card-content card-content-padding">
        <p>{{stack.description}}</p>
      </div>
      <div class="card-footer">
        <p style="border: 1px solid #333; color: #000; background-color: #eee;" class="button">{{stack.cards}} Cards</p>
        <div class="display-flex justify-content-flex-end flex-direction-row" style="width: 50%; gap: 10px;">
          <f7-button fill class="popup-open" data-popup=".edit-popup">Edit</f7-button>
          <f7-button fill class="color-red" @click="confirmDeletion">Delete</f7-button>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script setup lang="ts">
import {f7} from "framework7-vue";
import {ref} from "vue";

const stacks = ref([
  {id: 1, name: "Some random Stack of cards", description: "A random description for your stack. Lorem Lorem Ipsumus Maximus34", cards: 64},
  {id: 2, name: "Some random Stack of cards", description: "A random description for your stack. Lorem Lorem Ipsumus Maximus56", cards: 64},
  {id: 3, name: "Some random Stack of cards", description: "A random description for your stack. Lorem Lorem Ipsumus Maximus78", cards: 64},
])

const refreshData = () => {
  alert("reload")
}

function confirmDeletion() {
  f7.dialog.confirm("Do you want to delete this resource?", ()=> {
    // TODO: Implement deletion logic here
  })
}
</script>