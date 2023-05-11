<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
// import { login, getinfo } from "@/api/manger.js";

// token
// import { setToken } from "@/componsables/auth.js"

// 通知
// import { ElNotification } from "element-plus";

import { useRouter } from "vue-router";

import { useStore } from "vuex";


// 通知
import { notifc } from "@/componsables/util.js"
const router = useRouter();

const store = useStore()

const form = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    // {min: 3, max: 7, message: '长度必须是3-7个字符', trigger: 'blur'}
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    // {min: 3, max: 7, message: '长度必须是3-7个字符', trigger: 'blur'}
  ],
});
const fromRef = ref(null);
const loading = ref(false);
const Login = () => {
  fromRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true;

    // vuex封装login
    store.dispatch("login", form).then(res => {
      notifc("登录成功", "success")
      router.push("/");
    }).finally(() => {
      loading.value = false;
    });

    // login(form.username, form.password)
    //   .then((res) => {
    //     // console.log(res.data.data);
    //     // 提示成功
    //     // ElNotification({
    //     //   message: "登录成功",
    //     //   type: "success",
    //     //   duration: 3000,
    //     // });

    // 封装通知
    //     notifc("登录成功", "success")

    //     // // 存储token
    //     // const cookies = useCookies();
    //     // // 封装拦截器里面的，不然要写res.data.data
    //     // cookies.set("admin-token", res.token);
    //     // // console.log(res.token)

    //     // 设置token
    //     setToken(res.token)

    //     // 获取用户相关信息
    //     // getinfo().then((res2) => {

    //     //   store.commit("SET_USERINFO", res2)
    //     //   console.log(res2);
    //     // });
    //     // 在全局前置守卫中

    //     // 跳转到后台首页
    //     router.push("/home");
    //   })

    //   // 提示失败语句在拦截器中设置了
    //   // .catch((err) => {
    //   //   // console.log(err.response.data.msg);
    //   //   // 提示失败

    //   //   // ElNotification({
    //   //   //   message: err.response.data.msg || "请求失败",
    //   //   //   type: "error",
    //   //   //   duration: 3000,
    //   //   // });
    //   // });

    //   // 不会重复去请求
    //   .finally(() => {
    //     loading.value = false;
    //   });

  });

};
// 监听回车事件
function onKeyUp(e) {
  if (e.key == 'Enter') Login()
}

// 添加键盘监听事件
onMounted(() => {
  document.addEventListener("keyup", onKeyUp)
})

// 移除键盘监听事件
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp)
})
</script>

<template>
  <el-row class="login-contain">
    <el-col :lg="16" :md="12" class="login-left">
      <div>
        <div class="login-left-welcome">欢迎光临</div>
        <div class="login-left-admin">Vue3实战商城后台管理系统开发</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="login-right">
      <h2 class="login-right-welcome">欢迎回来</h2>
      <div class="login-right-user">
        <span class="h-[1px] w-16 bg-gray-300"></span>
        <span class="mx-2">账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-300"></span>
      </div>
      <el-form ref="fromRef" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button round class="w-[250px] bg-purple-600" type="primary" @click="Login" :loading="loading">登
            录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.login-contain {
  @apply min-h-screen bg-indigo-500;

  .login-left {
    @apply flex items-center justify-center;

    .login-left-welcome {
      @apply text-left font-bold text-5xl text-light-50 mb-4;
    }

    .login-left-admin {
      @apply text-gray-200 text-sm;
    }
  }

  .login-right {
    @apply bg-light-200 flex items-center justify-center flex-col;

    .login-right-welcome {
      @apply font-bold text-3xl text-gray-800;
    }

    .login-right-user {
      @apply flex items-center justify-center my-5 text-gray-300;
    }
  }
}
</style>
