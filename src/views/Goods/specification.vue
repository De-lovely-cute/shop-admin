<script setup>
import FormDrawer from "@/components/FormDrawer.vue";
import { ref } from "vue";
import ListHeader from "@/components/ListHeader.vue";
import tagInput from "@/views/Goods/tagInput.vue";
import { notifc } from "@/componsables/util.js";
import {
  getSkus,
  addSkus,
  editSkus,
  updatStatusSkus,
  deleteAllSkus,
} from "@/api/skus";
import { useInitTable, useInitForm } from "@/componsables/useCommon";
const total = ref(0);
const {
  loading,
  tableData,
  getData,
  handleStatusChange,
  handleDelete,
  currentPage,
  limit,
} = useInitTable({
  getList: getSkus,
  onGetListSuccess: (res) => {
    // console.log(res);
    tableData.value = res.list;
    total.value = res.totalCount;
  },
  updateStatus: updatStatusSkus,
  delete: deleteAllSkus,
});
const {
  formDrawerRef,
  formRef,
  form,
  rules,
  editId,
  drawerTitle,
  handleSubmit,
  resetForm,
  handleCreate,
  handleEdit,
} = useInitForm({
  form: {
    status: 1,
    name: "",
    order: 50,
    default: "",
  },
  rules: {
    name: [{ required: true, message: "规格名不能为空", trigger: "blur" }],
    default: [{ required: true, message: "规格值不能为空", trigger: "blur" }],
  },
  getData,
  update: editSkus,
  create: addSkus,
});
// 批量选中
const ids = ref([]);
const handleSelectionChange = (e) => {
  // console.log(e.map(o=>o.id))
  ids.value = e.map((o) => o.id);
};
// 批量删除
const multipleTableRef = ref(null)
const handleMultiDelete = () => {
  loading.value = true;
  deleteAllSkus(ids.value)
    .then((res) => {
      notifc("删除成功");
      // 清空选中
      if(multipleTableRef.value) {
        clearSelection.value.clearSelection()
      }
      getData()
    })
    .finally(() => (loading.value = false));
};
</script>

<template>
  <div>
    <el-card shadow="hover" class="border-0" v-loading="loading">
      <!-- 新增刷新 -->
      <ListHeader
        @add="handleCreate()"
        @refresh="getData"
        @delete="handleMultiDelete"
        layout="add,refresh,delete"
      />
      <el-table
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="规格名称" />
        <el-table-column
          prop="default"
          label="规格值"
          width="380"
          align="center"
        />
        <el-table-column prop="order" label="排序" />
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event, row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              text
              size="small"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              width="180"
              title="是否要删除该记录？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="primary" text size="small">删除</el-button>
              </template>
            </el-popconfirm>
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
        class="flex justify-center items-center mt-4"
      />
    </el-card>
    <!-- 新增修改 -->
    <form-drawer
      destroyOnClose
      :title="drawerTitle"
      ref="formDrawerRef"
      @submit="handleSubmit"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="规格名" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <tagInput v-model="form.default" />
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>

<style lang="less" scoped></style>
