<script setup>
import { ElMessage, ElMessageBox } from "element-plus";

const loginout = () => {
  ElMessageBox.confirm("是否要退出登录", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ElMessage({
      type: "success",
      message: "退出登录成功",
    });
  });
};
</script>

<template>
  后台首页
  {{ $store.state.user.username }}
  <el-button text @click="loginout">退出登录</el-button>
</template>

<style lang="less" scoped></style>
