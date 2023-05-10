import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login"*/ "@/views/Login/index.vue"),
    meta: {
      title: "登录页面",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Admin/index.vue"),
      meta: {
        title: "后台首页"
      },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home"*/ "@/views/Home/index.vue"),
        meta: {
          title: "后台首页",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "" */ "@/views/404page/index.vue"),
    meta: {
      title: "404页面",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
