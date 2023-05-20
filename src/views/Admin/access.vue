<script setup>
import ListHeader from "@/components/ListHeader.vue";
import { getRule, addRule, editRule, deleteRule, editRuleStatus } from "@/api/rule.js";
import { useInitTable, useInitForm } from "@/componsables/useCommon";
import { ref } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
import iconSelectVue from "@/views/Admin/iconSelect.vue";
const defaultExpandedKeys = ref([]);

const options = ref([]);
const { loading, tableData, getData, handleStatusChange, handleDelete } = useInitTable({
  getList: getRule,
  onGetListSuccess: (res) => {
    tableData.value = res.list;
    options.value = res.rules;
    defaultExpandedKeys.value = res.list.map((o) => o.id);
  },
  delete: deleteRule,
  updateStatus: editRuleStatus
});

// 表单新增修改
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
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: "GET",
    status: 1,
    order: 50,
    icon: "",
    frontpath: "",
  },
  rules: {},
  getData,
  update: editRule,
  create: addRule,
});

// 添加子菜单
const addChild = (id) => {
  handleCreate()
  form.rule_id = id
  form.status = 1
}
</script>

<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 新增刷新 -->
      <ListHeader @add="handleCreate" @refresh="getData" />
      <el-tree
        :data="tableData"
        :props="{ label: 'name', children: 'child' }"
        v-loading="loading"
        node-key="id"
        :default-expanded-keys="defaultExpandedKeys"
      >
        <template #default="{ node, data }">
          <div class="custom-tree">
            <el-tag size="small" :type="data.menu ? '' : 'info'">{{
              data.menu ? "菜单" : "权限"
            }}</el-tag>
            <el-icon v-if="data.icon" :size="16" class="ml-2 mr-2">
              <component :is="data.icon" />
            </el-icon>
            <span>{{ data.name }}</span>
            <div class="ml-auto">
              <el-switch
                :modelValue="data.status"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange($event, data)"
              />

              <el-button text type="primary" @click.stop="handleEdit(data)"
                >修改</el-button
              >
              <el-button text type="primary" v-if="data.menu == 1" @click.stop="addChild(data.id)"
                >增加</el-button
              >
              <el-popconfirm
                width="180"
                title="是否要删除该记录？"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="handleDelete(data.id)"
              >
                <template #reference>
                  <el-button text type="primary">删除</el-button>

                </template>
              </el-popconfirm>
            </div>
          </div>
        </template>
      </el-tree>
    </el-card>
    <!-- 弹框 -->
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
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="form.rule_id"
            :props="{
              label: 'name',
              children: 'child',
              checkStrictly: true,
              emitPath: false,
              value: 'id'
            }"
            :options="options"
            placeholder="请选择上级菜单"
          />
        </el-form-item>
        <el-form-item label="菜单/规则">
          <el-radio-group v-model="form.menu">
            <el-radio :label="1" border>菜单</el-radio>
            <el-radio :label="0" border>规则</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="名称" style="width: 30%" />
        </el-form-item>
        <el-form-item label="后端规则" v-if="form.menu == 0">
          <el-input v-model="form.condition" placeholder="后端规则" />
        </el-form-item>
        <el-form-item label="前端路由" v-if="form.menu == 1 && form.rule_id > 0">
          <el-input v-model="form.frontpath" placeholder="前端路由" />
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.menu == 1" class="flex items-center">
          <iconSelectVue v-model="form.icon"/>
        </el-form-item>
        <el-form-item label="请求方式" v-if="form.menu == 0">
          <el-select
            v-model="form.method"
            class="m-2"
            placeholder="请选择请求方式"
          >
            <el-option
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>

<style lang="less" scoped>
.custom-tree {
  @apply flex flex-1 items-center;
}
/deep/.el-tree-node__content {
  padding: 20px 0;
}
</style>
