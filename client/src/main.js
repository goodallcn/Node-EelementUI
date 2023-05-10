import { createApp } from 'vue'
import App from './App.vue'
import axios from './http'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import qs from 'qs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(qs)
app.use(store)
app.use(router)
app.use(ElementPlus)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://localhost:5000'
app.config.globalProperties.$axios = axios
app.mount('#app')
