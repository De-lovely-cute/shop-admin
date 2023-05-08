import router from "@/router";

import { getToken } from "@/componsables/auth.js";

import { notifc } from "@/componsables/util.js"

import store from '@/store/index.js'

// 全局前置守卫路由
router.beforeEach( async (to, from, next) => {
  const token = getToken();
  console.log(token);

  // 没有登录强制跳转登陆页面
  if( !token && to.path != "/login") {
    notifc("请先登录", "error")
    return next({ path: "/login" });
  }

  // 防止重复登录
  if(token && to.path == '/login') {
    notifc("请勿重复登录", "warning")
    return next({ path: from.path ? from.path: '/home' })
  }

  // 如果用户登录了，自动获取用户信息，并存储在vuex当中
  if(token) {
    await store.dispatch("getinfo")
  }

  next();
});
