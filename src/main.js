import { createApp } from 'vue'
// import './style.css'
import './assets/css/rest.css'

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'virtual:windi.css'

import router from './router/index.js'


import store from './store/index.js'

// 引入全局路由守卫
import './permission.js'

// 全局loading进度条
import 'nprogress/nprogress.css'
import 'nprogress/nprogress.js'

const app = createApp(App)

app.use(ElementPlus)

app.use(router)

app.use(store)


app.mount('#app')
