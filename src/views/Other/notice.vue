<script setup>
import { reactive, ref, computed } from "vue";
import {
  getNotice,
  getNoticeDelete,
  getNoticeAdd,
  getNoticeEdit,
} from "@/api/notice.js";
import { notifc } from "@/componsables/util.js";
import FormDrawer from "@/components/FormDrawer.vue";
import ListHeader from "@/components/ListHeader.vue";
const loading = ref(false);
const currentPage = ref(1);
const total = ref(0);
const tableData = ref([]);
function getData(page = null) {
  if (typeof page == "number") {
    currentPage.value = page;
  }
  loading.value = true;
  getNotice(currentPage.value)
    .then((res) => {
      tableData.value = res.list;
      total.value = res.totalCount;
      console.log(res);
    })
    .finally(() => (loading.value = false));
}
getData();
// 删除
function handleDelete(id) {
  loading.value = true;
  getNoticeDelete(id)
    .then((res) => {
      notifc("删除成功");
      getData();
    })
    .finally(() => (loading.value = false));
}
// 修改
const showNoticeRef = ref(null);
const formRef = ref(null);
const rules = {
  title: [{ required: true, message: "公告标题不能为空", trigger: "blur" }],
  content: [{ required: true, message: "公告内容不能为空", trigger: "blur" }],
};
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
const formNotice = reactive({
  title: "",
  content: "",
});

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    const fun = editId.value
      ? getNoticeEdit(editId.value, formNotice)
      : getNoticeAdd(formNotice);
    showNoticeRef.value.showLoading();
    fun
      .then((res) => {
        notifc(drawerTitle.value + "成功");
        // 修改刷新当前页，新增刷新第一页
        getData(editId.value ? false : 1);
        showNoticeRef.value.close();
      })
      .finally(() => showNoticeRef.value.hideLoading());
  });
};
// 添加
function addNotice() {
  editId.value = 0;
  formNotice.title = "";
  formNotice.content = "";
  showNoticeRef.value.open();
}
// 修改
function handleEdit(row) {
  //   console.log(row);
  editId.value = row.id;
  formNotice.title = row.title;
  formNotice.content = row.content;
  showNoticeRef.value.open();
}
</script>

<template>
  <el-card shadow="hover" class="border-0" v-loading="loading">
    <!-- 新增刷新 -->
    <ListHeader @add="addNotice()" @refresh="getData" />
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="公告标题" />
      <el-table-column
        prop="create_time"
        label="发表时间"
        width="380"
        align="center"
      />
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
      class="flex justify-center items-center mt-4"
    />
  </el-card>

  <form-drawer :title="drawerTitle" ref="showNoticeRef" @submit="handleSubmit">
    <el-form
      :model="formNotice"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="formNotice.title" placeholder="公告标题" />
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <el-input
          v-model="formNotice.content"
          type="textarea"
          placeholder="公告内容"
        />
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<style lang="less" scoped></style>
