<script setup>
import { ref } from "vue";
import imageAside from "@/views/Other/imageAside.vue";
import imageMain from "@/views/Other/imageMain.vue";
const dialogVisible = ref(false)
const open = () => {
  dialogVisible.value = true
}
const close = () => dialogVisible.value = false

const imageAsideRef = ref(null);
const imageMainRef = ref(null);
const addImage = () => {
  imageAsideRef.value.handleCreate();
};
const handleAsideChange = (image_class_id) =>
  imageMainRef.value.loadData(image_class_id);

const handleOpenUpload = () => imageMainRef.value.openUploadFile();
const props = defineProps({
  modelValue: [String, Array]
})
const emit = defineEmits(["update:modelValue"])
let urls = []
const handleChoose = (e) => {
  // console.log(e);
  urls = e.map(o=>o.url)
}

const submit = () => {
  if(urls.length){
    emit("update:modelValue",urls[0])
  }
  close()
}
</script>

<template>
  <div v-if="modelValue">
    <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
    
  </div>
  <div class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-100"><Plus /></el-icon>
  </div>
  <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
    <el-container class="bg-white rounded" style="height: 70vh;">
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
      <image-main ref="imageMainRef" @choose="handleChoose"></image-main>
    </el-container>
  </el-container>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.choose-image-btn {
  width: 100px;
  height: 100px;
  border: 1px solid #eee;
  @apply rounded flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}
</style>
