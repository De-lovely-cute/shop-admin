<script setup>
import { showModal, notifc } from "@/componsables/util.js";
import { logout } from "@/api/manger.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const outlogin = () => {
  showModal("退出登录成功").then((res) => {
    logout().then((res) => {
      store.dispatch("logout");
      router.push("/login");
      notifc("退出登录成功", "success");
    });
  });
};
</script>

<template>
  后台首页
  {{ $store.state.user.username }}
  <el-button text @click="outlogin">退出登录</el-button>
</template>

<style lang="less" scoped></style>
