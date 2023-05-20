<script setup>
import { getSysconfig, updateSysconfig } from "@/api/sysconfig";
import { reactive, ref } from "vue";
import { notifc } from "@/componsables/util";
const loading = ref(false);
const form = reactive({
  open_reg: 1, //开启注册，0关闭1开启
  reg_method: "username", //注册方式，username普通phone手机
  password_min: 7, //密码最小长度
  password_encrypt: "0,1,2", //密码复杂度，0数字、1小写字母、2大写字母、3符号；例如0,1,2
  upload_method: "oss", //上传方式，local本地，oss对象存储
  upload_config: {
    Bucket: "",
    ACCESS_KEY: "",
    SECRET_KEY: "",
    http: "",
  }, //上传配置 { Bucket:"", ACCESS_KEY:"", SECRET_KEY:"", http:""}
  api_safe: 1, //api安全，0关闭1开启
  api_secret: "", //秘钥
});
function getData() {
  loading.value = true;
  getSysconfig()
    .then((res) => {
      for (const k in form) {
        form[k] = res[k];
      }
      form.password_encrypt = form.password_encrypt.split(",");
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();

const activeName = ref("first");

const onSubmit = () =>{
   loading.value = true
   updateSysconfig({
      ...form,
      password_encrypt: form.password_encrypt.join(',')
   }).then(res=>{
      notifc("修改成功")
      getData()
   }).finally(()=>loading.value = false)
}
</script>

<template>
  <div v-loading="loading" class="bg-white p-4 rounded">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="注册与访问" name="first">
        <el-form
          :model="form"
          :rules="rules"
          label-width="150px"
          :inline="false"
          size="normal"
        >
          <el-form-item label="是否允许注册会员">
            <el-radio-group v-model="form.open_reg">
              <el-radio :label="0" border>是</el-radio>
              <el-radio :label="1" border>否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="注册类型">
            <el-radio-group v-model="form.reg_method">
              <el-radio label="username" border>普通注册</el-radio>
              <el-radio label="phone" border>手机注册</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="密码最小长度">
            <el-input
              v-model="form.password_min"
              placeholder="密码最小长度"
              size="normal"
              type="number"
              style="width: 30%"
            ></el-input>
          </el-form-item>
          <el-form-item label="强制密码复杂度">
            <el-checkbox-group v-model="form.password_encrypt">
              <el-checkbox label="0" border>数字</el-checkbox>
              <el-checkbox label="1" border>小写字母</el-checkbox>
              <el-checkbox label="2" border>大写字母</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="上传设置" name="second">
        <el-form
          :model="form"
          :rules="rules"
          label-width="150px"
          :inline="false"
          size="normal"
        >
          <el-form-item label="默认上传方式">
            <el-radio-group v-model="form.upload_method">
              <el-radio label="oss" border>阿里oss</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Bucket">
            <el-input
              style="width: 30%"
              v-model="form.upload_config.Bucket"
              placeholder="Bucket"
            ></el-input>
          </el-form-item>
          <el-form-item label="ACCESS_KEY">
            <el-input
              style="width: 30%"
              v-model="form.upload_config.ACCESS_KEY"
              placeholder="ACCESS_KEY"
            ></el-input>
          </el-form-item>
          <el-form-item label="SECRET_KEY">
            <el-input
              style="width: 30%"
              v-model="form.upload_config.SECRET_KEY"
              placeholder="SECRET_KEY"
            ></el-input>
          </el-form-item>
          <el-form-item label="空间域名">
            <el-input
              style="width: 30%"
              v-model="form.upload_config.http"
              placeholder="http"
            /><small class="text-gray-500">请补全http:// 或 https://</small>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Api安全" name="third">
        <el-form
          :model="form"
          :rules="rules"
          label-width="150px"
          :inline="false"
          size="normal"
        >
          <el-form-item label="是否开启API安全">
            <el-radio-group v-model="form.api_safe">
              <el-radio :label="0" border> 关闭 </el-radio>
              <el-radio :label="1" border> 开启 </el-radio>
            </el-radio-group>
            <small class="text-gray-500 flex mt-1"
              >api安全功能开启之后调用前端api需要传输签名串</small
            >
          </el-form-item>
          <el-form-item label="秘钥">
            <el-input
              v-model="form.api_secret"
              placeholder="秘钥"
              style="width: 50%"
            ></el-input>
            <small class="text-gray-500 flex mt-1"
              >秘钥设置关系系统中api调用传输签名串的编码规则，以及会员token解析，请慎重设置，注意设置之后对应会员要求重新登录获取token</small
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-form-item class="ml-38">
        <el-button type="primary" @click="onSubmit" size="small"
          >保存</el-button
        >
      </el-form-item>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped></style>
