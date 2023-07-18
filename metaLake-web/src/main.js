import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';


const app = createApp(App)

app.use(router)
// app.use(ElementUI)

app.mount('#app')