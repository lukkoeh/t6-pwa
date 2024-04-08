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
        <div class="padding list list-strong-ios list-outline-ios media-list menu-list display-flex flex-direction-column justify-content-space-between align-items-center">
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
        <f7-button fill style="position: absolute; bottom: 20px; width: calc(100% - 40px); left: 20px;" @click="logout">
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
                        <input type="text" name="name" placeholder="Stack name" />
                      </div>
                    </div>
                  </div>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Description</div>
                      <div class="item-input-wrap">
                        <input type="text" name="description" placeholder="Description" />
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
                        <input type="text" name="name" placeholder="Stack name" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <f7-button fill @click="openCardCreatePopUp">Create new card</f7-button>
            <div class="card" v-for="card in cards" :key="card.id">
              <div class="card-header">Card: {{ card.id }}</div>
              <div class="card-content card-content-padding">
                <p><b>Question: </b>{{ card.question }}</p>
                <p><b>Answer: </b>{{card.answer}}</p>
              </div>
              <div class="card-footer">
                <div class="display-flex justify-content-flex-end flex-direction-row" style="width: 100%; gap: 10px;">
                  <f7-button fill class="button" @click.stop="openCardEditPopUp">Edit</f7-button>
                  <f7-button fill class="color-red" @click.stop="deleteCard">Delete</f7-button>
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
                        <input type="text" name="Question" placeholder="What is 2+2?" />
                      </div>
                    </div>
                  </div>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Answer</div>
                      <div class="item-input-wrap">
                        <input type="text" name="Answer" placeholder="42" />
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
                        <input type="text" name="Question" placeholder="What is 2+2?" />
                      </div>
                    </div>
                  </div>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Answer</div>
                      <div class="item-input-wrap">
                        <input type="text" name="Answer" placeholder="42" />
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
                        <input v-model="name" type="text" name="name" placeholder="Max Patternman" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Old Password</div>
                      <div class="item-input-wrap">
                        <input v-model="oldPassword" type="password" name="name" placeholder="1234" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">New Password</div>
                      <div class="item-input-wrap">
                        <input v-model="newPassword" type="password" name="name" placeholder="Please not 1234" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">New Password repeat</div>
                      <div class="item-input-wrap">
                        <input v-model="newPasswordRepeat" type="password" name="name" placeholder="I mean it" />
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
  import { ref, onMounted, provide } from 'vue';
  import { f7, f7ready } from 'framework7-vue';


  import routes from '../js/routes.js';
  import store from '../js/store';

  export default {
    methods: {
      createStack() {
        // TODO: Implement create Routine
        alert("create")
        f7.popup.close();
      },
      editStack() {
        // TODO: Implement edit Routine
        alert("edit")
        f7.popup.close();
      },
      openProfilePopup() {
        f7.popup.open('#profile-popup');
        // TODO: Prefill existing name from API in profile edit
      },
      editProfile() {
        // TODO: Implement edit Profile Routine with data provided in this.name, this.oldPassword, this.newPassword, this.newPasswordRepeat
      },
      editCard() {
        // TODO: Implement Card Editing
      },
      deleteCard() {
        // TODO: Implement Card Deletion
      },
      createCard() {
        // TODO: Implement Card Creation
        f7.popup.close("#create-card-popup");
      },
      openCardEditPopUp() {
        f7.popup.open("#edit-card-popup");
      },
      openCardCreatePopUp() {
        f7.popup.open("#create-card-popup");
      },
      logout() {
        // TODO: Implement logout logic to remove cookie
      },
      async performLogin() {
        const searchParams = [["login_username", this.username],["login_password", this.password]];

        const urlFormData = new URLSearchParams(searchParams);
        console.log(urlFormData);

        const res = await fetch( this.apiHost + 'auth', {
          method: 'POST',
          body: urlFormData
        });

        f7.loginScreen.close();
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
        serviceWorker: process.env.NODE_ENV ==='production' ? {
          path: '/service-worker.js',
        } : {},
      };
      // Login screen data
      const username = ref('');
      const password = ref('');
      const apiHost = "http://localhost:8080/"
      provide('apiHost', apiHost);

      // Edit Profile popup data
      const name = ref('');
      const oldPassword = ref('');
      const newPassword = ref('');
      const newPasswordRepeat = ref('');

      onMounted(() => {
        f7ready(() => {
          // Call F7 APIs here
          f7.loginScreen.open("#my-login-screen")
        });
      });
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
      return {
        f7params,
        username,
        password,
        apiHost,
        name,
        oldPassword,
        newPassword,
        newPasswordRepeat,
        cards
      }
    }
  }
</script>