<script setup>
import ListHeader from "@/components/ListHeader.vue";
import {
  getUserLevel,
  addUserLevel,
  editUserLevel,
  deleteUserLevel,
  updateUserLevelStatus,
} from "@/api/userLevel";
import FormDrawer from "@/components/FormDrawer.vue";
import { useInitTable, useInitForm } from "@/componsables/useCommon";
import { ref } from "vue";
import { notifc } from "@/componsables/util.js";
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
  getList: getUserLevel,
  onGetListSuccess: (res) => {
    console.log(res);
    tableData.value = res.list;
    total.value = res.totalCount;
  },
  delete: deleteUserLevel,
  updateStatus: updateUserLevelStatus,
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
    level: 100,
    status: 1,
    discount: 10,
    max_price: 1000,
    max_times: 500,
  },
  rules: {},
  getData,
  update: editUserLevel,
  create: addUserLevel,
});
</script>

<template>
  <div>
    <el-card shadow="never">
      <!-- 新增刷新 -->
      <ListHeader @add="handleCreate" @refresh="getData" />
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="会员等级" />
        <el-table-column
          prop="discount"
          label="折扣率(%)"
          width="180"
          align="center"
        />
        <el-table-column prop="level" label="等级序号" />
        <el-table-column prop="status" label="状态" align="center">
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
      >
        <el-form-item label="等级名称" prop="name">
          <el-input v-model="form.name" placeholder="等级名称"></el-input>
        </el-form-item>
        <el-form-item label="等级权重" prop="level">
          <el-input
            type="number"
            v-model="form.level"
            placeholder="等级权重"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="升级条件">
          <div>
            <small class="text-xs mr-2">累计消费满</small>
            <el-input
              type="number"
              v-model="form.max_price"
              placeholder="累计消费"
              style="width: 50%"
            >
              <template #append>元</template>
            </el-input>
            <small class="text-gray-400 flex">
              设置会员等级所需要的累计消费必须大于等于0,单位：元
            </small>
          </div>
          <div>
            <small class="text-xs mr-2">累计次数满</small>
            <el-input
              type="number"
              v-model="form.max_times"
              placeholder="累计次数"
              style="width: 50%"
            >
              <template #append>%</template>
            </el-input>
            <small class="text-gray-400 flex">
              设置会员等级所需要的购买量必须大于等于0,单位：笔
            </small>
          </div>
        </el-form-item>
        <el-form-item label="折扣率(%)" prop="discount">
          <el-input
            type="number"
            v-model="form.discount"
            placeholder="折扣率(%)"
            style="width: 50%"
          >
            <template #append>%</template>
          </el-input>
          <small class="text-gray-400 flex">
            折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买
          </small>
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>

<style lang="less" scoped></style>
