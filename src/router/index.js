import {createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login"*/"@/views/Login/index.vue"),
    },
    {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: "home"*/"@/views/Home/index.vue"),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "" */"@/views/404page/index.vue")
    }
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router