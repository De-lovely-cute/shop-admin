<script setup>
import {
  ArrowDown,
  ElemeFilled,
  Fold,
  Expand,
  Refresh,
  FullScreen,
  Aim,
} from "@element-plus/icons-vue";
import { showModal, notifc } from "@/componsables/util.js";
import { logout } from "@/api/manger.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
// 修改密码
import { updatepassword } from "@/api/manger.js";
// 全屏引入
import { useFullscreen } from "@vueuse/core";

// isFullscreen 是否全屏
// toggle   切换全屏
const { isFullscreen, toggle } = useFullscreen();
const store = useStore();
const router = useRouter();
// 退出登录
const outlogin = () => {
  showModal("退出登录成功").then((res) => {
    logout().then((res) => {
      store.dispatch("logout");
      router.push("/login");
      notifc("退出登录成功", "success");
    });
  });
};
// 下拉菜单退出登录和修改密码
const handleCommand = (c) => {
  console.log(c);
  switch (c) {
    case "rePassword":
      console.log("修改密码");
      drawer.value = true
      break;

    case "loginout":
      outlogin();
      break;
  }
};
// 刷新
const handleRefresh = () => {
  location.reload();
};

const drawer = ref(false);
const fromRef = ref(null);
const form = reactive({
  oldpassword: "",
  password: "",
  repassword: "",
});

const rules = reactive({
  oldpassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
  repassword: [{ required: true, message: "确认密码不能为空", trigge: "blur" }],
});
// 表单验证
const onSubmit = () => {
  fromRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    updatepassword(form).then(res => {
      notifc("修改密码成功，请重新登录")
      store.dispatch("logout")
      router.push('/login')
    })
  });

};
</script>

<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-2"><ElemeFilled /></el-icon>
      商城管理
    </span>
    <el-icon class="icon-btn"><Fold /></el-icon>
    <!-- <el-icon><Expand /></el-icon> -->
    <el-tooltip
      class="box-item"
      effect="dark"
      content="刷新"
      placement="bottom"
    >
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="f-right">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar :size="25" :src="$store.state.user.avatar" class="mr-2" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword" @click="drawer = true"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-drawer v-model="drawer" title="修改密码" size="45%" :close-on-click-modal="false">
    <el-form  ref="fromRef" :model="form" :rules="rules" label-width="80px" size="small">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="form.oldpassword" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" show-password/>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="form.repassword" show-password />
      </el-form-item>
      <el-form-item class="">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="less" scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  .logo {
    width: 250px;
    @apply flex items-center justify-center text-xl font-thin;
  }
  .icon-btn {
    // @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
  }
  .icon-btn:hover {
    @apply bg-indigo-600;
  }
  .f-right {
    @apply ml-auto flex items-center;
    .dropdown {
      height: 64px;
      cursor: pointer;
      @apply flex justify-center items-center mx-5;
    }
  }
}

button,
[role="button"] {
  cursor: pointer;
  outline: none;
}
</style>
