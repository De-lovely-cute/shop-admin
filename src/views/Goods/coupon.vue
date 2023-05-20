<script setup>
import ListHeader from "@/components/ListHeader.vue";
import {
  getCoupon,
  addCoupon,
  editCoupon,
  deleteCoupon,
  updateStatusCoupon,
} from "@/api/coupon";
import FormDrawer from "@/components/FormDrawer.vue";
import { useInitTable, useInitForm } from "@/componsables/useCommon";
import { computed, ref } from "vue";
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
  getList: getCoupon,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map((o) => {
      // 转化优惠券状态
      o.statusText = formatStatus(o);
      return o;
    });
    total.value = res.totalCount;
    //  console.log(res);
  },
  delete: deleteCoupon,
  updateStatus: updateStatusCoupon,
});
const start_time = ref(0);
const end_time = ref(0);
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
    type: 0,
    value: 0,
    total: 100,
    min_price: 100,
    start_time: null,
    end_time: null,
    order: 50,
    desc: "",
  },
  rules: {},
  getData,
  update: editCoupon,
  create: addCoupon,
  beforeSubmit: (f) => {
    // 提交前修改时间戳
    if (typeof f.start_time != "number") {
      f.start_time = new Date(f.start_time).getTime();
    }
    if (typeof f.end_time != "number") {
      f.end_time = new Date(f.end_time).getTime();
    }
    return f;
  },
});
function formatStatus(row) {
  let s = "领取中";
  let start_time = new Date(row.start_time).getTime();
  let now = new Date().getTime();
  let end_time = new Date(row.end_time).getTime();
  if (start_time > now) {
    s = "未开始";
  } else if (end_time < now) {
    s = "已结束";
  } else if (row.status == 0) {
    s = "已失效";
  }
  return s;
}
const timerange = computed({
  get() {
    return form.start_time && form.end_time
      ? [form.start_time, form.end_time]
      : [];
  },
  set(val) {
    form.start_time = val[0];
    form.end_time = val[1];
  },
});
</script>

<template>
  <div>
    <el-card shadow="never" v-loading="loading">
      <!-- 新增刷新 -->
      <ListHeader @add="handleCreate" @refresh="getData" />
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="优惠券名称" width="350">
          <template #default="{ row }">
            <div
              class="border border-dashed py-2 px-4 rounded bg-gray-50"
              :class="row.statusText == '领取中' ? 'active' : 'inactivev'"
            >
              <h5 class="font-bold text-md">{{ row.name }}</h5>
              <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="statusText"
          label="状态"
          width="180"
          align="center"
        />
        <el-table-column prop="value" label="优惠" align="center">
          <template #default="{ row }">
            <span
              >{{ row.type ? "满减 " : "折扣 "
              }}{{ row.type ? " ￥" + row.value : row.value + "折" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="total" label="发放数量" align="center" />
        <el-table-column prop="status" label="已使用" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              v-if="scope.row.statusText == '未开始'"
              type="primary"
              text
              size="small"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              v-if="scope.row.statusText != '领取中'"
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

            <el-popconfirm
              v-if="scope.row.statusText == '领取中'"
              width="180"
              title="是否要让该优惠券失效？"
              confirm-button-text="失效"
              cancel-button-text="取消"
              @confirm="handleStatusChange(0,scope.row)"
            >
              <template #reference>
                <el-button type="danger" size="small">失效</el-button>
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
        <el-form-item label="优惠券名称">
          <el-input v-model="form.name" placeholder="优惠券名称"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="0" border>满减</el-radio>
            <el-radio :label="1" border>折扣</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面值">
          <el-input type="number" style="width: 200px" v-model="form.value">
            <template #append> {{ form.type ? "折" : "元" }} </template>
          </el-input>
        </el-form-item>
        <el-form-item label="发行量">
          <el-input-number v-model="form.total" :min="0" :max="1000" />
        </el-form-item>
        <el-form-item label="最低使用">
          <el-input type="number" style="width: 200px" v-model="form.min_price">
            <template #append> 元 </template>
          </el-input>
        </el-form-item>
        <el-form-item label="价格排序">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            :editable="false"
            v-model="timerange"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.desc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>

<style lang="less" scoped>
.active {
  @apply border-rose-200 bg-rose-50 text-red-400;
}
.inactive {
  @apply border-gray-200 bg-gray-50 text-gray-400;
}
</style>
