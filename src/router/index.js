import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // 这是默认路由，所有用户共享
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
    path: "/",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Admin/index.vue"),
    meta: {
      title: "后台首页",
    },
    // children: [
    //   {
    //     path: "/goods/list",
    //     name: "Goods",
    //     component: () =>
    //       import(/* webpackChunkName: "home"*/ "@/views/Admin/Goods/goods.vue"),
    //     meta: {
    //       title: "商品管理",
    //     },
    //   },
    //   {
    //     path: "/category/list",
    //     name: "Category",
    //     component: () => import(/* webpackChunkName: "home"*/ "@/views/Admin/Goods/category.vue"),
    //     meta: {
    //       title: "分类管理",
    //     },
    //   }
    // ],
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

const asyncRoutes = [
  {
    path: "/goods/list",
    name: "/goods/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Admin/Goods/goods.vue"),
    meta: {
      title: "商品管理",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Admin/Goods/category.vue"),
    meta: {
      title: "分类管理",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// export default router;

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false;
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach((e) => {
      let item = asyncRoutes.find((o) => o.path == e.frontpath);
      if (item && !router.hasRoute(item.path)) {
        router.addRoute("Admin", item);
        hasNewRoutes = true;
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child);
      }
    });
  };

  findAndAddRoutesByMenus(menus);

  return hasNewRoutes;
}
