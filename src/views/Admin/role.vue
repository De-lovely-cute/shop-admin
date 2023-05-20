<script setup>
import ListHeader from "@/components/ListHeader.vue";
import {
  getRole,
  addRole,
  editRole,
  deleteRole,
  updateRoleStatus,
  setRole,
} from "@/api/role";
import { getRule } from "@/api/rule";
import FormDrawer from "@/components/FormDrawer.vue";
import { useInitTable, useInitForm } from "@/componsables/useCommon";
import { ref } from "vue";
import { notifc } from "@/componsables/util.js";
const total = ref(0);
const { loading, tableData, getData, handleStatusChange, handleDelete, currentPage, limit } =
  useInitTable({
    getList: getRole,
    onGetListSuccess: (res) => {
      tableData.value = res.list;
      total.value = res.totalCount;
    },
    delete: deleteRole,
    updateStatus: updateRoleStatus,
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
    name: "",
    status: 1,
    desc: "",
  },
  rules: {},
  getData,
  update: editRole,
  create: addRole,
});

// 权限配置
const setRulesDrawerRef = ref(null);
const ruleList = ref([]);
const defaultExpandedKeys = ref([]);
const elTreeRef = ref(null);
const treeHeight = ref(0);
const roleId = ref(0);
const checkStrictly = ref(false);
// 当前用户拥有的权限ID
const ruleIds = ref([]);
const openSetRules = (row) => {
  //   console.log(row);
  roleId.value = row.id;
  treeHeight.value = window.innerHeight - 170;
  setRulesDrawerRef.value.showLoading();
  checkStrictly.value = true;
  getRule(1).then((res) => {
    ruleList.value = res.list;
    defaultExpandedKeys.value = res.list.map((o) => o.id);
    setRulesDrawerRef.value.open();
    // 当前用户拥有的权限ID
    // console.log(row.rules.map(o=>o.id))
    ruleIds.value = row.rules.map((o) => o.id);
    setTimeout(() => {
      elTreeRef.value.setCheckedKeys(ruleIds.value);
      checkStrictly.value = false;
    }, 150);
  });
};

const handleSetRulesSubmit = () => {
  setRulesDrawerRef.value.showLoading();
  setRole(roleId.value, ruleIds.value)
    .then((res) => {
      notifc("配置成功");
      getData();
      setRulesDrawerRef.value.close();
    })
    .finally(() => setRulesDrawerRef.value.hideLoading());
};
const handleCheck = (...e) => {
  // console.log(e);
  const { checkedKeys, halfCheckedKeys } = e[1];
  ruleIds.value = [...checkedKeys, ...halfCheckedKeys];
};
</script>

<template>
  <div>
    <el-card shadow="never">
      <!-- 新增刷新 -->
      <ListHeader @add="handleCreate" @refresh="getData" />
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="角色名称" width="180" />
        <el-table-column
          prop="desc"
          label="角色描述"
          width="180"
          align="center"
        />
        <el-table-column prop="status" label="状态" width="600" align="center">
          <template #default="{ row }">
            <el-switch
              @change="handleStatusChange($event, row)"
              :disabled="row.super == 1"
              :loading="row.statusLoading"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              text
              size="small"
              @click="openSetRules(scope.row)"
              >配置权限</el-button
            >

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
        <el-form-item label="角色名称">
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.desc" placeholder="角色描述"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </form-drawer>
    <!-- 权限配置 -->
    <form-drawer
      title="权限配置"
      ref="setRulesDrawerRef"
      @submit="handleSetRulesSubmit"
    >
      <el-tree-v2
        ref="elTreeRef"
        :data="ruleList"
        :height="treeHeight"
        :props="{ label: 'name', children: 'child' }"
        show-checkbox
        node-key="id"
        :check-strictly="checkStrictly"
        :default-expanded-keys="defaultExpandedKeys"
        @check="handleCheck"
      >
        <template #default="{ node, data }">
          <div class="custom-tree">
            <el-tag size="small" :type="data.menu ? '' : 'info'">{{
              data.menu ? "菜单" : "权限"
            }}</el-tag>
            <span>{{ data.name }}</span>
          </div>
        </template>
      </el-tree-v2>
    </form-drawer>
  </div>
</template>

<style lang="less" scoped></style>
