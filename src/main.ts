import './style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 完整引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
