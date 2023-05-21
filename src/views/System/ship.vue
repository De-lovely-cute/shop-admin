<script setup>

import { getSysconfig, updateSysconfig} from "@/api/sysconfig";
import { reactive, ref } from "vue";
import { notifc } from "@/componsables/util";

const form = reactive({
   ship: ""
})
const loading = ref(false)

function getData(){
   loading.value = true
   getSysconfig().then(res=>{
      // console.log(res)
      for(const k in form) {
         form[k] = res[k]
      }
   }).finally(()=>{
      loading.value=false
   })
}
getData()
const onSubmit = ()=>{
   loading.value = true
   updateSysconfig({...form}).then(res=>{
      notifc("修改成功")
      getData()
   }).finally(()=>{
      loading.value = false
   })
}
</script>

<template>
  <div class="bg-white p-4 rounded">
    <el-form :model="form" label-width="180px" v-loading="loading">
      <el-form-item label="物流查询key">
          <el-input v-model="form.ship" style="width: 50%" placeholder="物流查询key"></el-input>
          <small class="text-gray-500 flex mt-1">
            用于查询物流信息，接口申请（仅供参考）
          </small>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
