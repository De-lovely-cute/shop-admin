<script setup>
import ListHeader from "@/components/ListHeader.vue";
import {
  getCategory,
  addCategory,
  editCategory,
  updateStatusCategory,
  deleteCategory,
} from "@/api/category";
import { useInitTable, useInitForm } from "@/componsables/useCommon";
import { ref } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
import GoodsDrawer from "@/views/Goods/GoodsDrawer.vue";
const defaultExpandedKeys = ref([]);

const options = ref([]);
const { loading, tableData, getData, handleStatusChange, handleDelete } =
  useInitTable({
    getList: getCategory,
    onGetListSuccess: (res) => {
      tableData.value = res.map(o=>{
         o.goodsDrawerLoading = false
         return o
      })
      // console.log(res);
      // options.value = res.rules;
      // defaultExpandedKeys.value = res.list.map((o) => o.id);
    },
    delete: deleteCategory,
    updateStatus: updateStatusCategory,
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
    name: "",
  },
  rules: {
    name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }],
  },
  getData,
  update: editCategory,
  create: addCategory,
});

// 添加子菜单
const addChild = (id) => {
  handleCreate();
  form.rule_id = id;
  form.status = 1;
};
// 推荐产品
const GoodsDrawerRef = ref(null)
const openGoodsDrawer = (data) =>{
  // console.log("data",data)
  GoodsDrawerRef.value.open(data)
}

</script>

<template>
  <div>
    <el-card shadow="never" class="border-0" v-loading="loading">
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
            <span>{{ data.name }}</span>
            <div class="ml-auto">
              <el-button
                text
                type="primary"
                @click="openGoodsDrawer(data)"
                :loading="data.goodsDrawerLoading"
                >推荐产品</el-button
              >
              <el-switch
                :modelValue="data.status"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange($event, data)"
              />

              <el-button text type="primary" @click.stop="handleEdit(data)"
                >修改</el-button
              >
              <el-button
                text
                type="primary"
                v-if="data.menu == 1"
                @click.stop="addChild(data.id)"
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
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="分类名称"></el-input>
        </el-form-item>
      </el-form>
    </form-drawer>
    <!-- 推荐产品 -->
    <GoodsDrawer ref="GoodsDrawerRef"/>
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
