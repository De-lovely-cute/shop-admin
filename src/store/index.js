import { createStore } from "vuex";
import { login, getinfo, updatepassword } from "@/api/manger.js";

import { setToken, removeToken } from "@/componsables/auth.js";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},
    };
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
  },
  actions: {
    // 封装登录
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res) => {
            setToken(res.token);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 封装退出登录
    logout({ commit }) {
      // 移除cookie里的token
      removeToken();
      // 清除当前用户状态vuex
      commit("SET_USERINFO", {});
    },
    // 获取当前登录用户相关信息
    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo()
          .then((res) => {
            commit("SET_USERINFO", res);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 修改密码
    updatepassword({ commit }){
      return new Promise((resolve, reject) => {
        updatepassword(oldpassword,password,repassword).then((res) => {
          console.log("resdd",res)
        })
      })
    },
  },
});

export default store;
