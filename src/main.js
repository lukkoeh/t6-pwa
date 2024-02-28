import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Framework7 from "framework7";
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';
Framework7.use(Framework7Vue)

const app = createApp(App)

app.use(router)
registerComponents(app)
app.mount('#app')
