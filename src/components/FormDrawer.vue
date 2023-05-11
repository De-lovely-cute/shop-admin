<script setup>
import { ref } from "vue";
const drawer = ref(false);
//  打开
const open = () => drawer.value = true;

// 关闭
const close = () => drawer.value = false;



const props = defineProps({
    title: String,
    size: {
        type: String,
        default: '45%'
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    confirmText: {
        type: String,
        default: "提交"
    }
})
// 提交
const emit = defineEmits(["submit"])
const submit = ()=> emit("submit")

// loading
const loading = ref(false)

const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

// 向父组件暴露以下方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
});
</script>
<template>
  <el-drawer
    v-model="drawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">{{confirmText}}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="less" scoped>
.formDrawer {
    position: relative;
    height: 100%;
    width: 100%;
    @apply flex flex-col;
    .body {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;
    }
    .actions {
        height: 50px;
        @apply mt-auto flex items-center;
    }
}
</style>
