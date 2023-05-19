import { createApp } from "vue";
// import './style.css'
import "./assets/css/rest.css";

import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "virtual:windi.css";

import { router } from "./router/index.js";

import store from "./store/index.js";

// 引入全局路由守卫
import "./permission.js";

// 全局loading进度条
import "nprogress/nprogress.css";
import "nprogress/nprogress.js";

// 注册所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

import permission from "@/directives/permission";

app.use(permission)
app.use(ElementPlus);

app.use(router);

app.use(store);

app.mount("#app");
