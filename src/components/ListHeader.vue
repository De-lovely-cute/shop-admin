<script setup>
import { computed } from "vue";
const props = defineProps({
  layout: {
    type: String,
    default: "add,refresh"
  },
});
const bts = computed(() => props.layout.split(","));
defineEmits(["add", "refresh", "delete"]);
</script>

<template>
  <!-- 刷新数据 -->
  <div class="flex justify-between items-center mb-4">
    <div>
      <el-button
        v-if="bts.includes('add')"
        type="primary"
        size="small"
        @click="$emit('add')"
        >新增</el-button
      >
      <el-popconfirm
        width="180"
        title="是否删除选中记录？"
        confirm-button-text="确认"
        cancel-button-text="取消"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button v-if="bts.includes('delete')" type="danger" size="small"
            >批量删除</el-button
          >
        </template>
      </el-popconfirm>
    </div>
    <el-tooltip
      v-if="bts.includes('refresh')"
      effect="dark"
      content="刷新数据"
      placement="top"
    >
      <el-button text @click="$emit('refresh')">
        <el-icon :size="20"><Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<style lang="less" scoped></style>
