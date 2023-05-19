<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { statistics3 } from "@/api/panel.js";
import * as echarts from "echarts";
// vueuse中放大和缩小   放图表中
import { useResizeObserver } from "@vueuse/core";
const options = [
  {
    text: "近1个月",
    value: "month",
  },
  {
    text: "近1周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
];
const current = ref("week");
const handleCheck = (type) => {
  current.value = type;
  getData();
};

// 图表
var myChart = null;
onMounted(() => {
  var chartDom = document.getElementById("chart");
  if (chartDom) {
    myChart = echarts.init(chartDom);
    getData();
  }
});
onBeforeUnmount(() => {
  if (myChart) echarts.dispose();
});
function getData() {
  let option = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  myChart.showLoading();
  statistics3(current.value)
    .then((res) => {
      option.xAxis.data = res.x;
      option.series[0].data = res.y;
      myChart.setOption(option);
    })
    .finally(() => {
      myChart.hideLoading();
    });
}
const el = ref(null);
// 等比例缩小放大
useResizeObserver(el, (entries) => {
  myChart.resize();
});
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="flex items-center justify-between">
        <span>订单统计</span>
        <div>
          <el-check-tag
            :checked="current == item.value"
            style="margin-right: 8px"
            v-for="(item, index) in options"
            :key="index"
            @click="handleCheck(item.value)"
            >{{ item.text }}</el-check-tag
          >
        </div>
      </div>
    </template>
    <div id="chart" ref="el" style="width: 100%; height: 300px"></div>
  </el-card>
</template>

<style lang="less" scoped></style>
