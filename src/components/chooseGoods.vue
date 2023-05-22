<script setup>
import { ref } from "vue";
import { getGoods } from "@/api/goods";
import { useInitTable } from "@/componsables/useCommon";
const dialogVisible = ref(false);
const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
  multipleTableRef,
  handleMultiDelete,
} = useInitTable({
  getList: getGoods,
  onGetListSuccess: (res) => {
    console.log(res);
    tableData.value = res.list;
    total.value = res.totalCount;
  },
});
const close = () => {
  dialogVisible.value = false;
};
const callbackFunction = ref(null);
const open = (callback = null) => {
  callbackFunction.value = callback;
  dialogVisible.value = true;
};
const onSubmit = () => {
  if (typeof callbackFunction.value === "function") {
    callbackFunction.value(multiSelectionIds.value);
  }
  close();
};
defineExpose({
  open,
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="商品选择"
    width="80%"
    destroy-on-close
  >
    <div class="borders">
      <el-form :model="form" class="ml-4 mt-4">
        <el-form-item>
          <div class="flex">
            <el-input placeholder="商品名称" clearable></el-input>
            <el-button type="primary" size="default" class="ml-2"
              >搜索</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        stripe
        style="width: 100%"
        height="300px"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="商品">
          <template #default="{ row }">
            <div class="flex">
              <el-image
                class="mr-3 rounded w-[50px] h-[50px]"
                :src="row.cover"
              ></el-image>
              <div class="flex-1">
                <p>{{ row.title }}</p>
                <p class="text-gray-400 text-xs mb-1">
                  分类:{{ row.category ? row.category.name : "未分类" }}
                </p>
                <p class="text-gray-400 text-xs">
                  创建时间：{{ row.create_time }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="总库存"
          prop="stock"
          width="90"
          align="center"
        />
        <el-table-column label="价格(元)" width="150" align="center">
          <template #default="{ row }">
            <span class="text-rose-500">￥{{ row.min_price }}</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="getData"
        :current-page="currentPage"
        :page-size="limit"
        class="flex justify-center items-center my-4"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.borders {
  border: 1px solid #eee;
}
</style>
