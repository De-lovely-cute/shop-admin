<script setup>
import {
  listCategoryItem,
  deleteCategoryItem,
  CategoryItem,
} from "@/api/category";
import { ref } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
import { notifc } from "@/componsables/util.js";
import chooseGoods from "@/components/chooseGoods.vue";
const formDrawerRef = ref(null);
const category_id = ref(0);
const tableData = ref([]);
const open = (item) => {
  category_id.value = item.id;
  item.goodsDrawerLoading = true;
  getData()
    .then((res) => {
      formDrawerRef.value.open();
    })
    .finally(() => {
      item.goodsDrawerLoading = false;
    });
  // console.log("item",item)
};
function getData() {
  return listCategoryItem(category_id.value).then((res) => {
    console.log(res)
    tableData.value = res.map((o) => {
      o.loading = false;
      return o;
    });
  });
}

// 关联
const chooseGoodsRef = ref(null);
const handleConnect = () => {
  chooseGoodsRef.value.open()
};
// 删除
const handleDelete = (row) => {
  row.loading = true
  // console.log(row)
  deleteCategoryItem(row.id).then(res=>{
    notifc("删除成功")
    getData()
  }).finally(()=>{
    row.loading = false
  })
};

defineExpose({
  open,
});
</script>

<template>
  <!-- 推荐产品 -->
  <form-drawer
    destroyOnClose
    title="推荐产品"
    ref="formDrawerRef"
    @submit="handleConnect"
    confirmText="关联"
  >
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="goods_id" label="ID" width="60" />
      <el-table-column label="商品封面" width="180">
        <template #default="{ row }">
          <el-image
            :src="row.cover"
            fit="fill"
            :lazy="true"
            style="width: 64px; height: 64px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-popconfirm
            width="180"
            title="是否要删除该记录？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button text type="primary" :loading="row.loading"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <chooseGoods ref="chooseGoodsRef" />
  </form-drawer>
</template>

<style lang="less" scoped></style>
