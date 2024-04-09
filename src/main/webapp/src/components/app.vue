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
          <f7-button fill style="position: absolute; bottom: 10px; width: calc(100% - 20px); left: 10px;">
            <p>Log out</p>
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
                  </div><div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Name</div>
                    <div class="item-input-wrap">
                      <input v-model="createStackDescription.value" type="text" name="description" placeholder="Stack description"/>
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
            <f7-button @click="editStack" fill>Save edits</f7-button>
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
            <f7-button @click="editProfile" fill>Save edits</f7-button>
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
import {stacks, editStackName, current_stack_index, createStackDescription, editStackDescription} from "../js/state.js"


import routes from '../js/routes.js';
import store from '../js/store';

export default {
  computed: {
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
      f7.popup.close();
    },
    openProfilePopup() {
      f7.popup.open('#profile-popup');
      // TODO: Prefill existing name from API
    },
    editProfile() {
      // TODO: Implement edit Profile Routine with data provided in this.name, this.oldPassword, this.newPassword, this.newPasswordRepeat
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
        f7.loginScreen.open("my-login-screen");
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

    // Edit Profile popup data
    const name = ref('');
    const oldPassword = ref('');
    const newPassword = ref('');
    const newPasswordRepeat = ref('');

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
    }
  }
}
</script>