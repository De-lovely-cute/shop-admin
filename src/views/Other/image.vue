<script setup>
const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;
import imageAside from "@/views/Other/imageAside.vue";
import imageMain from "@/views/Other/imageMain.vue";
import { ref } from "vue";
const imageAsideRef = ref(null);
const imageMainRef = ref(null);
const addImage = () => {
  imageAsideRef.value.handleCreate();
};
const handleAsideChange = (image_class_id) =>
  imageMainRef.value.loadData(image_class_id);

const handleOpenUpload = () => imageMainRef.value.openUploadFile();
</script>

<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="addImage"
        >新增图片分类</el-button
      >
      <el-button type="warning" size="small" @click="handleOpenUpload"
        >上传图片</el-button
      >
    </el-header>
    <el-container>
      <image-aside
        ref="imageAsideRef"
        @change="handleAsideChange"
      ></image-aside>
      <image-main ref="imageMainRef"></image-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
</style>
