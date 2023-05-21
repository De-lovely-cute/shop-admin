<script setup>
import { editAgentSetting, getAgentSetting } from "@/api/agent";
import chooseImage from "@/components/chooseImage.vue";
import { ref, reactive } from "vue";
import { notifc } from "@/componsables/util"
const loading = ref(false);
const form = reactive({
  "distribution_open": 1, //分销启用:0禁用1启用
  "store_first_rebate": 10, //一级返佣比例：0~100
  "store_second_rebate": 20, //二级返佣比例：0~100
  "spread_banners": [
    "http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62710076cd93e.png"
  ], //分销海报图
  "is_self_brokerage": 1, //自购返佣:0否1是
  "settlement_days": 7, //结算时间（单位：天）
  "brokerage_method": "hand" //佣金到账方式:hand手动,wx微信
});
function getData() {
  loading.value = true;
  getAgentSetting()
    .then((res) => {
      //   console.log(res);
      for (const k in form) {
        form[k] = res[k];
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();

const onSubmit = () =>{
   loading.value = true;
   editAgentSetting({...form}).then(res=>{
      notifc("修改成功")
      getData()
   }).finally(()=>{
      loading.value=false
   })
}
</script>

<template>
  <div class="bg-white rounded pt-1 pb-5" v-loading="loading">
    <el-form :model="form" label-width="160px">
      <h5 class="bg-gray-100 p-3 m-5 rounded">基础设置</h5>
      <el-form-item label="分销启用">
        <div>
          <el-radio-group v-model="form.distribution_open">
            <el-radio :label="1" border>是</el-radio>
            <el-radio :label="0" border>否</el-radio>
          </el-radio-group>
          <small class="text-gray-500 mt-1 flex"
            >关闭分销功能后不会再产生新的分销佣金，商城端分销入口会关闭。</small
          >
        </div>
      </el-form-item>
      <el-form-item label="分销海报图">
        <chooseImage :limit="9" v-model="form.spread_banners" />
      </el-form-item>
      <h5 class="bg-gray-100 p-3 m-5 rounded">返佣设置</h5>
      <el-form-item label="一级返佣比例">
        <div>
          <el-input v-model="form.store_first_rebate" placeholder="0-100">
            <template #append>%</template>
          </el-input>
          <small class="text-gray-500 mt-1 flex"
            >订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%</small
          >
        </div>
      </el-form-item>
      <el-form-item label="二级返佣比例">
        <div>
          <el-input v-model="form.store_second_rebate" placeholder="0-100">
            <template #append>%</template>
          </el-input>
          <small class="text-gray-500 mt-1 flex"
            >订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%</small
          >
        </div>
      </el-form-item>
      <el-form-item label="自购返佣">
        <div>
          <el-radio-group v-model="form.is_self_brokerage">
            <el-radio :label="1" border>是</el-radio>
            <el-radio :label="0" border>否</el-radio>
          </el-radio-group>
          <small class="text-gray-500 mt-2 flex">
            是否开启自购返佣（开启：分销员自己购买商品，享受一级返佣，上级享受二级返佣；
            关闭：分销员自己购买商品没有返佣）
          </small>
        </div>
      </el-form-item>
      <h5 class="bg-gray-100 p-3 m-5 rounded">结算设置</h5>
      <el-form-item label="结算时间">
        <div>
          <el-input v-model="form.settlement_days" type="number">
            <template #prepend>订单完成后</template>
            <template #append>天</template>
          </el-input>
          <samll class="text-gray-500 mt-1 flex"
            >预估佣金结算后无法进行回收，请谨慎设置结算天数</samll
          >
        </div>
      </el-form-item>

      <el-form-item label="佣金到账方式">
        <div>
          <el-radio-group v-model="form.brokerage_method">
            <el-radio label="hand" border>手动转账</el-radio>
            <el-radio label="wx" border>自动到微信零钱</el-radio>
          </el-radio-group>
          <small class="text-gray-500 mt-1 flex"
            >佣金到账方式支持线下转账和微信零钱自动转账，手动转账更安全，自动转账更方便</small
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
