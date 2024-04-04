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
      <f7-button fill>Create new stack</f7-button>
    </f7-block>
    <f7-block-title>Your Stacks</f7-block-title>

    <div class="card">
      <div class="card-header">Some random Stack of cards</div>
      <div class="card-content card-content-padding">
        <p>A random description for your stack. Lorem Lorem Ipsumus Maximus.</p>
      </div>
      <div class="card-footer">
        <p style="border: 1px solid #333; color: #000; background-color: #eee;" class="button">64 Cards</p>
        <div class="display-flex justify-content-flex-end flex-direction-row" style="width: 50%; gap: 10px;">
          <f7-button fill>Edit</f7-button>
          <f7-button fill class="color-red">Delete</f7-button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">Some random Stack of cards</div>
      <div class="card-content card-content-padding">
        <p>A random description for your stack. Lorem Lorem Ipsumus Maximus.</p>
      </div>
      <div class="card-footer">
        <p style="border: 1px solid #333; color: #000; background-color: #efefef;" class="button">64 Cards</p>
        <div class="display-flex justify-content-flex-end flex-direction-row" style="width: 50%; gap: 10px;">
          <f7-button fill>Edit</f7-button>
          <f7-button fill class="color-red">Delete</f7-button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">Some random Stack of cards</div>
      <div class="card-content card-content-padding">
        <p>A random description for your stack. Lorem Lorem Ipsumus Maximus.</p>
      </div>
      <div class="card-footer">
        <p style="border: 1px solid #333; color: #000; background-color: #eee;" class="button">64 Cards</p>
        <div class="display-flex justify-content-flex-end flex-direction-row" style="width: 50%; gap: 10px;">
          <f7-button fill>Edit</f7-button>
          <f7-button fill class="color-red">Delete</f7-button>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script setup lang="ts">
</script>