import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

createApp(App).use(router).mount('#app')