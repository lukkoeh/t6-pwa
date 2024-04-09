<template>
  <f7-app v-bind="f7params" @stack-confirmed-deletion="()=>{
    alert('your mum')
  }">

    <!-- Left panel with cover effect-->
    <f7-panel left cover auto>
      <f7-view>
        <f7-page>
          <f7-navbar title="Menu"></f7-navbar>
          <f7-block>
            <h2 class="text-align-center">Welcome!</h2>
          </f7-block>
          <div
              class="padding list list-strong-ios list-outline-ios media-list menu-list display-flex flex-direction-column justify-content-space-between align-items-center">
            <ul>
              <li class="display-flex justify-content-center align-items-center">
                <div class="item-media">
                  <i class="icon material-icons if-md">home</i>
                  <i class="icon f7-icons if-not-md">house</i>
                </div>
                <div class="item-inner">
                  <div class="item-title-wrap">
                    <div class="item-title">Home</div>
                  </div>
                  <div class="item-subtitle">Train your mind</div>
                </div>
              </li>
              <li class="display-flex justify-content-center align-items-center" @click="openProfilePopup()">
                <div class="item-media">
                  <i class="icon material-icons if-md">person</i>
                  <i class="icon f7-icons if-not-md">person_fill</i>
                </div>
                <div class="item-inner">
                  <div class="item-title-wrap">
                    <div class="item-title">Profile</div>
                  </div>
                  <div class="item-subtitle">Edit your data</div>
                </div>
              </li>
            </ul>
          </div>
          <f7-button fill style="position: absolute; bottom: 20px; width: calc(100% - 40px); left: 20px;"
                     @click="logout">
            Log out
          </f7-button>
        </f7-page>
      </f7-view>
    </f7-panel>


    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/"></f7-view>


    <!-- Popup -->
    <f7-popup id="my-popup" class="create-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Create new stack">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <form class="list list-strong-ios list-dividers-ios list-outline-ios" id="my-form1">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Name</div>
                      <div class="item-input-wrap">
                        <input v-model="createStackName" type="text" name="name" placeholder="Stack name"/>
                      </div>
                    </div>
                  </div>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Name</div>
                      <div class="item-input-wrap">
                        <input v-model="createStackDescription.value" type="text" name="description"
                               placeholder="Stack description"/>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <f7-button @click="createStack" fill>Create</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- Popup -->
    <f7-popup id="edit-popup" class="edit-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Edit stack">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <form class="list list-strong-ios list-dividers-ios list-outline-ios" id="my-form">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Name</div>
                      <div class="item-input-wrap">
                        <input v-model="editStackName.value" type="text" name="name" placeholder="Stack name"/>
                      </div>
                    </div>
                  </div><div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Description</div>
                      <div class="item-input-wrap">
                        <input v-model="editStackDescription.value" type="text" name="name" placeholder="Stack description"/>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <f7-button fill @click="openCardCreatePopUp">Create new card</f7-button>
            <div class="card" v-for="(card, index) in cards.value" :key="card.id">
              <div class="card-header">Card: {{ card.id }}</div>
              <div class="card-content card-content-padding">
                <p><b>Question: </b>{{ card.front }}</p>
                <p><b>Answer: </b>{{card.back}}</p>
              </div>
              <div class="card-footer">
                <div class="display-flex justify-content-flex-end flex-direction-row" style="width: 100%; gap: 10px;">
                  <f7-button fill class="button" @click.stop="openCardEditPopUp(index)">Edit</f7-button>
                  <f7-button fill class="color-red" @click.stop="deleteCard(index)">Delete</f7-button>
                </div>
              </div>
            </div>
            <f7-button @click="editStack" fill>Save edits</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- Popup -->
    <f7-popup id="edit-card-popup" class="edit-card-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Edit Card">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <form class="list list-strong-ios list-dividers-ios list-outline-ios" id="my-form">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Question</div>
                      <div class="item-input-wrap">
                        <input v-model="editCardFront" type="text" name="Question" placeholder="What is 2+2?" />
                        <p>DEBUG: {{editCardFront}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Answer</div>
                      <div class="item-input-wrap">
                        <input v-model="editCardBack" type="text" name="Answer" placeholder="42" />
                        <p>DEBUG: {{editCardBack}}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <f7-button @click="editCard" fill>Save edits</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- Popup -->
    <f7-popup id="create-card-popup" class="create-card-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Create Card">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <form class="list list-strong-ios list-dividers-ios list-outline-ios" id="my-form">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Question</div>
                      <div class="item-input-wrap">
                        <input v-model="createCardFront" type="text" name="Question" placeholder="What is 2+2?" />
                      </div>
                    </div>
                  </div>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Answer</div>
                      <div class="item-input-wrap">
                        <input v-model="createCardBack" type="text" name="Answer" placeholder="42" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <f7-button @click="createCard" fill>Save new card</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- Popup -->
    <f7-popup id="profile-popup" class="profile-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Edit profile">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <form class="list list-strong-ios list-dividers-ios list-outline-ios" id="my-form">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Name</div>
                      <div class="item-input-wrap">
                        <input v-model="name" type="text" name="name" placeholder="Max Patternman"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Old Password</div>
                      <div class="item-input-wrap">
                        <input v-model="oldPassword" type="password" name="name" placeholder="1234"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">New Password</div>
                      <div class="item-input-wrap">
                        <input v-model="newPassword" type="password" name="name" placeholder="Please not 1234"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">New Password repeat</div>
                      <div class="item-input-wrap">
                        <input v-model="newPasswordRepeat" type="password" name="name" placeholder="I mean it"/>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <f7-button @click="saveEditedProfile" fill>Save edits</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
                type="text"
                name="username"
                placeholder="Your username"
                v-model:value="username"
            ></f7-list-input>
            <f7-list-input
                type="password"
                name="password"
                placeholder="Your password"
                v-model:value="password"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" @click="performLogin"></f7-list-button>
            <f7-block-footer>
              Some text about login information.<br>Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
import {ref, onMounted, provide} from 'vue';
import {f7} from 'framework7-vue';
import {fetchStacks} from "@/js/api-client";
import {
  stacks,
  editStackName,
  current_stack_index,
  createStackDescription,
  editStackDescription,
  cards
} from "../js/state.js"


import routes from '../js/routes.js';
import store from '../js/store';

export default {
  computed: {
    cards() {
      return cards
    },
    editStackDescription() {
      return editStackDescription
    },
    createStackDescription() {
      return createStackDescription
    },
    editStackName() {
      return editStackName
    },
  },
  methods: {
    async createStack() {
      const res = await fetch('api/stack', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.createStackName,
          description: "Default Description [TODO]"
        })
      }).then(async (r) => {
        if (r.ok) {
          const response = await fetchStacks()
          if (response.status === 401) {
            f7.loginScreen.open("my-login-screen")
          } else {
            response.json().then(data => {
              if (data.length > 0) {
                stacks.value = data;
                this.createStackName = ""
              }
            })
          }
        } else {
          //f7.loginScreen.open("my-login-screen")

          alert("sth went wrong")
        }
      })

      f7.popup.close();
    },
    async editStack() {
      const response = await fetch("/api/stack", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: stacks.value[current_stack_index.value].id,
          name: editStackName.value,
          description: editStackDescription.value
        })
      })
      if (response.ok) {
        stacks.value[current_stack_index.value].name = editStackName.value
        stacks.value[current_stack_index.value].description = editStackDescription.value
      }
      },
    async editCard() {
      const card = {
        id: cards.value[this.editCardIndex].id,
        front: this.editCardFront,
        back: this.editCardBack
      }
      const response = await fetch('/api/card/'+stacks.value[current_stack_index.value].id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card)
      })
      if (response.ok) {
        cards.value[this.editCardIndex] = await response.json()
        f7.popup.close("#edit-card-popup")
      }

    },
    async createCard() {
      const card = {
        front: this.createCardFront,
        back: this.createCardBack,
      }
      const response = await fetch('/api/card/'+stacks.value[current_stack_index.value].id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
      })
      if (response.ok) {
        cards.value.push(await response.json())
      }

      f7.popup.close("#create-card-popup");
    },
    openCardEditPopUp(index) {
      this.editCardIndex = index;
      this.editCardFront = stacks.value[index].front
      this.editCardBack = stacks.value[index].back
      f7.popup.open("#edit-card-popup");
    },
    deleteCard(index) {
      // TODO: Implement card deletion
      f7.dialog.confirm("Do you want to delete this card?", async () => {
        const response = await fetch('/api/card/'+stacks.value[current_stack_index.value].id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: cards.value[index].id,

        })
        if (response.ok) {
          cards.value.splice(index, 1)
        }
      })
    },
    async openCardCreatePopUp() {
      f7.popup.open("#create-card-popup");
    },
    logout() {
      document.cookie = 'quarkus-credential=; Max-Age=-99999999;';
      f7.loginScreen.open("#my-login-screen")
    },
    async openProfilePopup() {
      const response = await fetch('/api/user')
      if (response.ok) {
        this.name = await response.text()
      } else {
        f7.dialog.alert("There was an error while fetching user data.")
      }
      f7.popup.open('#profile-popup');
    },
    async saveEditedProfile() {
      const response = await fetch("/api/user", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newUsername: this.name,
          newPassword: this.newPassword
        })
      })
      if (response.ok) {
        f7.dialog.alert("Profil erfolgreich aktualisiert!")
      }
      else {
        f7.dialog.alert("Es ist ein Fehler aufgetreten.")
      }
    },
    async performLogin() {
      const searchParams = [["login_username", this.username], ["login_password", this.password]];
//
      const urlFormData = new URLSearchParams(searchParams);
      console.log(urlFormData);
      const router = f7.views.main.router;

        const res = await fetch('/auth', {
          method: 'POST',
          body: urlFormData
        });

      if (!res.ok) {
        f7.loginScreen.open("#my-login-screen");
      } else {
        f7.loginScreen.close();
        const response = await fetchStacks();
        if (response.ok) {
          stacks.value = await response.json();
        }
      }

    }
  },
  setup() {

    // Framework7 Parameters
    const f7params = {
      name: 'Smart-Flashcards', // App name
      theme: 'auto', // Automatic theme detection,


      // App store
      store: store,
      // App routes
      routes: routes,

      // Register service worker (only on production build)
      serviceWorker: process.env.NODE_ENV === 'production' ? {
        path: '/service-worker.js',
      } : {},
    };
    // Login screen data
    const username = ref('');
    const password = ref('');

    const createStackName = ref('')

    const createCardFront = ref("")
    const createCardBack = ref("")

    // Edit Profile popup data
    const name = ref('');
    const oldPassword = ref('');
    const newPassword = ref('');
    const newPasswordRepeat = ref('');

    const editCardFront = ref('');
    const editCardBack = ref('');
    const editCardIndex = ref(0);

    onMounted(async () => {
    });
    return {
      f7params,
      username,
      password,
      name,
      oldPassword,
      newPassword,
      newPasswordRepeat,
      createStackName,
      createCardFront,
      createCardBack,
      editCardFront,
      editCardBack,
      editCardIndex
    }
  }
}
</script>