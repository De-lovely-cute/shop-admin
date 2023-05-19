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
    name: "Background",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Background/index.vue"),
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
    path: "/",
    name: "/",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Background/Home.vue"),
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Goods/goods.vue"),
    meta: {
      title: "商品管理",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Goods/category.vue"),
    meta: {
      title: "分类管理",
    },
  },
  {
    path: "/skus/list",
    name: "/skus/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Goods/specification.vue"),
    meta: {
      title: "规格管理",
    },
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Goods/coupon.vue"),
    meta: {
      title: "优惠券管理",
    },
  },
  
  {
    path: "/user/list",
    name: "/user/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/User/user.vue"),
    meta: {
      title: "用户管理",
    },
  },
  {
    path: "/level/list",
    name: "/level/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/User/vip.vue"),
    meta: {
      title: "会员等级",
    },
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Order/order.vue"),
    meta: {
      title: "订单管理",
    },
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Order/comment.vue"),
    meta: {
      title: "评论管理",
    },
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Admin/admin.vue"),
    meta: {
      title: "管理员管理",
    },
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Admin/access.vue"),
    meta: {
      title: "权限管理",
    },
  },
  {
    path: "/role/list",
    name: "/role/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Admin/role.vue"),
    meta: {
      title: "角色管理",
    },
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/System/base.vue"),
    meta: {
      title: "基础设置",
    },
  },
  {
    path: "/setting/buy",
    name: "/setting/buy",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/System/buy.vue"),
    meta: {
      title: "交易设置",
    },
  },
  {
    path: "/setting/ship",
    name: "/setting/ship",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/System/ship.vue"),
    meta: {
      title: "物流设置",
    },
  },
  {
    path: "/distribution/index",
    name: "/distribution/index",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Sale/market.vue"),
    meta: {
      title: "分销员管理",
    },
  },
  {
    path: "/distribution/setting",
    name: "/distribution/setting",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Sale/setting.vue"),
    meta: {
      title: "分销设置",
    },
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Other/image.vue"),
    meta: {
      title: "图库管理",
    },
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: () =>
      import(/* webpackChunkName: "home"*/ "@/views/Other/notice.vue"),
    meta: {
      title: "公告管理",
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
        router.addRoute("Background", item);
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
