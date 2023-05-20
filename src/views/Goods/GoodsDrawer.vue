<script setup>
import {
  listCategoryItem,
  deleteCategoryItem,
  CategoryItem,
} from "@/api/category";
import { useInitTable, useInitForm } from "@/componsables/useCommon";
import { ref } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
const formDrawerRef = ref(null)
const category_id = ref(0)
const tableData = ref([])
const open=(item) =>{
    category_id.value = item.id
    item.goodsDrawerLoading = true
    getData().then(res=>formDrawerRef.value.open())
    .finally(()=>item.goodsDrawerLoading = false)
}

defineExpose({
    open
})
</script>

<template>
 <!-- 推荐产品 -->
 <form-drawer
      destroyOnClose
      title="推荐产品"
      ref="formDrawerRef"
      @submit="handleSubmit"
    >
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="ID" />
        <el-table-column prop="name" label="商品封面" />
        <el-table-column prop="address" label="商品名称" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-popconfirm
              width="180"
              title="是否要删除该记录？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleProjectDelete(row.id)"
            >
              <template #reference>
                <el-button text type="primary">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </form-drawer>
</template>

<style lang='less' scoped>
 
</style>