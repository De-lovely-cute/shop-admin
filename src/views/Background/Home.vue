<script setup>
import { statistics1, statistics2, statistics3 } from "@/api/panel.js";
import { ref } from "vue";
const panels = ref([]);
statistics1().then((res) => {
  panels.value = res.panels;
  // console.log(panels.value);
});

// 滚动数字
import CountTo from "@/components/CountTo.vue";

import IndexNavs from "@/components/IndexNavs.vue";
import IndexCharts from "@/components/IndexCharts.vue";
import IndexCard from "@/components/IndexCard.vue";

const goods = ref([]);
const order = ref([])
statistics2().then((res) => {
  goods.value = res.goods;
  order.value = res.order;
  console.log(res);
});
</script>

<template>
  <div>
    <el-row :gutter="20">
      <template v-if="panels.length == 0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <!-- 骨架屏 -->
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover">
                <template #header>
                  <div class="flex justify-between text-sm">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>

                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider />
                <div class="flex justify-between text-sm text-gray-600">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col
        :span="6"
        v-for="(item, index) in panels"
        :key="index"
        max-width="25%"
      >
        <el-card shadow="hover">
          <template #header>
            <div class="flex justify-between text-sm">
              <span>{{ item.title }}</span>
              <el-tag effect="plain" :type="item.unitColor">{{
                item.unit
              }}</el-tag>
            </div>
          </template>
          <span class="flex text-gray-500 font-bold text-3xl">
            <!-- {{ item.subValue }} -->
            <CountTo :value="item.value" />
          </span>
          <el-divider />
          <div class="flex justify-between text-sm text-gray-600">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue + item.subUnit }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <index-navs></index-navs>

    <el-row :gutter="20" class="mt-4">
      <el-col :span="12" :offset="0">
        <!-- v-permission="['statistics3, GET']" -->
        <index-charts/>
      </el-col>
      <el-col :span="12" :offset="0">
        <index-card title="店铺及商店提示" tip="店铺及商店提示" :btns="goods" />
        <index-card title="交易提示" tip="需要立即处理的交易订单" :btns="order" />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped></style>
