<script setup>
import {ref, onBeforeMount} from 'vue'
import router               from "@/router";

onBeforeMount(
    () => {
      getStacks()
    }
)
let promptfocus = false;

const stacks = ref([])

let lastId = 0;

function showPrompt () {
  const prompt = document.querySelector('#stackprompt')
  if ( prompt.style.display === 'none' ) {
    prompt.style.display = 'flex'
  } else {
    prompt.style.display = 'none'
  }

  const input = prompt.firstChild
  if ( !promptfocus ) {
    input.focus()
    promptfocus = true
  } else {
    promptfocus = false
  }
}

function validate ( event ) {
  const element = event.target
  if ( element.value.length < 1 ) {
    element.classList.add('invalid')
  } else {
    element.classList.remove('invalid')
  }
}

async function addStack () {
  const prompt      = document.querySelector('#stackprompt')
  const nameelement = prompt.firstChild
  const name        = nameelement.value
  if ( name.length > 0 ) {
    const response = await fetch('/api/stack', {
      method : 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body   : JSON.stringify({name: name})
    })
    if ( response.status === 401 ) {
      router.push('/login')
      return
    }
    if ( response.status === 400 ) {
      nameelement.classList.add('invalid')
      return
    }
    nameelement.value = ''
    await getStacks()
    stacks.value.push(
        {
          id  : lastId,
          name: name,
        })
    prompt.style.display = 'none'
    promptfocus          = false;
  } else {
    nameelement.classList.add('invalid')
  }
}

async function getStacks () {
  const response = await fetch('/api/stack', {
    headers: {
      'Accept': 'application/json'
    }
  })
  if ( response.status === 401 )
    router.push('/login')
  else {
    response.json().then(data => {
      if ( data.length > 0 ) {
        stacks.value = data;
        lastId       = data[data.length - 1].id
      }
    })
  }

}

</script>

<template>
  <div class="stackoverview">
    <h1>Kartenstapel</h1>
    <button class="w50p onlyoutlinebtn borderblue" @click="showPrompt">Stapel erstellen</button>
    <div id="stackprompt" style="display: none">
      <input type="text" name="stackname" placeholder="Name" id="newstackname" @input="validate"
             @keydown.enter="addStack">
      <button class="onlyoutlinebtn borderred" @click="addStack">Hinzufügen</button>
    </div>
    <ul class="stacklist">
      <li v-for="cardStack in stacks" :key="cardStack.id" class="listshadow" @click="router.push('/stack/'+cardStack.id)">
        <div class="stackname">{{ cardStack.name }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#stackprompt {
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7dee3;
  width: 50%;
  height: 100px;
  margin: 0 auto;
  left: 25%;
  min-width: 300px;
}

#stackprompt button {
  margin: 10px;
}

#stackprompt input {
  margin: 0;
}

.stacklist {
  width: 50%;
  margin: 0 auto;
}


.stacklist li {
  display: grid;
  grid-template-columns: 30fr 40fr 30fr;
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
  padding: 25px 0;
  margin: 12px 0;
  border-radius: 10px;
}

.stacklist button {
  display: flex;
  width: 50%;
  padding: 15px 0;
  margin: 0 10px;
}

.options {
  display: flex;
  width: 50%;
  position: absolute;
}

.stacklist img {
  margin: auto;
}

.stackname {
  grid-column-start: 2;
  grid-column-end: 3;
}

.stacklist li:hover {
  background-color: #e8e8e8;
  transition: background-color .07s;
  border-radius: 10px;
  cursor: pointer;
}
</style>