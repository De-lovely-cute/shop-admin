<script setup>
import { reactive, ref, computed } from "vue";
import {
  getManager,
  getManagerStatus,
  addManager,
  editManager,
  deleteManager,
} from "@/api/manger";
import { notifc, showPrompt } from "@/componsables/util.js";
import FormDrawer from "@/components/FormDrawer.vue";
import chooseImageVue from "./chooseImage.vue";
const loading = ref(false);
const currentPage = ref(1);
const total = ref(0);
const tableData = ref([]);
const roles = ref([]);
// 搜索
const searchForm = reactive({
  keyword: "",
});
const resetSearch = () => {
  searchForm.keyword = "";
  getData();
};
function getData(page = null) {
  if (typeof page == "number") {
    currentPage.value = page;
  }
  loading.value = true;
  getManager(currentPage.value, searchForm)
    .then((res) => {
      tableData.value = res.list.map((o) => {
        o.statusLoading = false;
        return o;
      });
      total.value = res.totalCount;
      roles.value = res.roles;
      console.log(roles.value);
    })
    .finally(() => (loading.value = false));
}
getData();
// 删除
function handleDelete(id) {
  loading.value = true;
  deleteManager(id)
    .then((res) => {
      notifc("删除成功");
      getData();
    })
    .finally(() => (loading.value = false));
}
// 修改
const showNoticeRef = ref(null);
const formRef = ref(null);
// const rules = {
//   username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
//   password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
// };
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
const formNotice = reactive({
  username: "",
  password: "",
  role_id: "",
  status: 1,
  avatar: "",
});

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    const fun = editId.value
      ? editManager(editId.value, formNotice)
      : addManager(formNotice);
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
  formNotice.username = "";
  formNotice.password = "";
  formNotice.avatar = "";
  formNotice.role_id = "";
  formNotice.status = 1;
  showNoticeRef.value.open();
}
// 修改
function handleEdit(row) {
  console.log(row);
  editId.value = row.id;
  formNotice.username = row.username;
  formNotice.password = row.password;
  formNotice.avatar = row.avatar;
  formNotice.role_id = row.role_id;
  formNotice.status = row.status;
  showNoticeRef.value.open();
}

// 修改状态
function handleStatus(status, row) {
  // console.log(status,row)
  row.statusLoading = true;
  getManagerStatus(row.id, status)
    .then((res) => {
      notifc("修改状态成功");
      row.status = status;
    })
    .finally(() => {
      row.statusLoading = false;
    });
}
</script>

<template>
  <div>
    <el-card shadow="hover" class="border-0" v-loading="loading">
      <!-- 搜索 -->
      <el-form :model="searchForm" label-width="80px" class="mb-3">
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="关键词">
              <el-input
                v-model="searchForm.keyword"
                placeholder="管理员昵称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="6">
            <el-form-item>
              <el-button type="primary" @click="getData">搜索</el-button>
              <el-button @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 刷新数据 -->
      <div class="flex justify-between items-center mb-4">
        <el-button type="primary" size="small" @click="addNotice()"
          >新增</el-button
        >
        <el-tooltip effect="dark" content="刷新数据" placement="top">
          <el-button text @click="getData">
            <el-icon :size="20"><Refresh /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="管理员" width="200">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :size="60" :src="row.avatar" @error="errorHandler">
                <img :src="row.avatar" />
              </el-avatar>
              <div class="flex flex-col ml-3">
                <h6>{{ row.username }}</h6>
                <small>ID：{{ row.id }}</small>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属管理员">
          <template #default="{ row }">
            {{ row.role ? row.role.name : "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-switch
              @change="handleStatus($event, row)"
              :disabled="row.super == 1"
              :loading="row.statusLoading"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <small v-if="scope.row.super == 1" class="text-sm text-gray-500"
              >暂无操作</small
            >
            <div v-else>
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
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="getData"
        class="flex justify-center items-center mt-4"
      />
    </el-card>

    <form-drawer
      :title="drawerTitle"
      ref="showNoticeRef"
      @submit="handleSubmit"
    >
      <el-form
        :model="formNotice"
        ref="formRef"
        :rules="rules"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="用户名">
          <el-input v-model="formNotice.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formNotice.password" show-password />
        </el-form-item>
        <el-form-item label="头像">
          <!-- {{ formNotice.avatar }} -->
          <chooseImageVue v-model="formNotice.avatar"/>
        </el-form-item>
        <el-form-item label="所属管理员">
          <el-select
            v-model="formNotice.role_id"
            class="m-2"
            placeholder="请选择所属管理员"
            size="large"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="formNotice.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>

<style lang="less" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
