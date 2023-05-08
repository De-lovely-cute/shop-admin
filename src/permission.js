import router from "@/router";

import { getToken } from "@/componsables/auth.js";

import { notifc, showFullLoading, hideFullLoading } from "@/componsables/util.js"

import store from '@/store/index.js'

// 全局前置守卫路由
router.beforeEach( async (to, from, next) => {

  // 显示loading
  showFullLoading()

  const token = getToken();
  // console.log(token);

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

  // 设置页面标题
  // console.log(to.meta.title);
  const title = (to.meta.title ? to.meta.title : "") + '-商城后台'
  document.title = title

  next();
});

// 全局后置钩子

router.afterEach((to, from) => {
  // to and from are both route objects.
  hideFullLoading()

})