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
import { ref } from "vue";
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
    tableData.value = res.list.map(o=>{
      // 转化优惠券状态
      o.status = formatStatus(o)
      return o
    })
    total.value = res.totalCount;
   //  console.log(res);
  },
  delete: deleteCoupon,
  updateStatus: updateStatusCoupon,
});
const start_time = ref(0)
const end_time = ref(0)
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
    type: "0",
    value: 0,
    total: 100,
    min_price: 100,
    time: [start_time, end_time],
    order: 50,
  },
  rules: {},
  getData,
  update: editCoupon,
  create: addCoupon,
});
function formatStatus(row) {
   let s = '领取中'
   let start_time = (new Date(row.start_time)).getTime()
   let now = (new Date()).getTime()
   let end_time = (new Date(row.end_time)).getTime()
   if(start_time > now) {
      s = '未开始'
   }else if(end_time < now) {
      s = '已结束'
   }else if(row.status == 0) {
      s = '已失效'
   }
   return s
}
</script>

<template>
  <div>
    <el-card shadow="never" v-loading="loading">
      <!-- 新增刷新 -->
      <ListHeader @add="handleCreate" @refresh="getData" />
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="优惠券名称" width="350" >
         <template #default="{row}">
            <div class="border border-dashed py-2 px-4 rounded bg-gray-50">
               <h5 class="font-bold text-md">{{ row.name }}</h5>
               <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
            </div>
         </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180" align="center" />
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
        <el-form-item label="优惠券名称">
          <el-input v-model="form.name" placeholder="优惠券名称"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio label="0" border>满减</el-radio>
            <el-radio label="1" border>折扣</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面值">
          <el-input type="number" style="width: 200px;" v-model="form.value">
            <template #append> {{form.type ? '折': '元'}} </template>
          </el-input>
        </el-form-item>
        <el-form-item label="发行量">
          <el-input-number v-model="form.total" :min="0" :max="1000" />
        </el-form-item>
        <el-form-item label="最低使用" >
          <el-input type="number" style="width: 200px;" v-model="form.min_price">
            <template #append> 元 </template>
          </el-input>
        </el-form-item>
        <el-form-item label="价格排序">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.time"
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
   
}
</style>
