<script setup>
import { ref } from "vue";
import * as iconList from "@element-plus/icons-vue";
const icons = ref(Object.keys(iconList));
defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
const handleChange = (icon) => {
  emit("update:modelValue", icon);
};
</script>

<template>
  <div class="flex items-center">
    <el-icon :size="20" v-if="modelValue" class="mr-2">
      <component :is="modelValue" />
    </el-icon>
    <el-select
      :modelValue="modelValue"
      placeholder="请选择菜单图标"
      class="m-2"
      filterable 
      @change="handleChange"
    >
      <el-option v-for="item in icons" :key="item" :label="item" :value="item">
        <div class="flex items-center justify-between">
          <el-icon :size="20">
            <component :is="item" />
          </el-icon>
          <span class="text-gray-500">{{ item }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<style lang="less" scoped></style>
