<script setup>
import { ref, reactive } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
import Editor from "@/components/Editor.vue";
import { readGoods, editGoods } from "@/api/goods";
import { notifc } from "@/componsables/util";

const formDrawerRef = ref(null);

const form = reactive({
  content: "",
});

const goodsId = ref(0);
const open = (row) => {
  goodsId.value = row.id;
  row.contentLoading = true;
  readGoods(goodsId.value)
    .then((res) => {
      form.content = res.content;
      formDrawerRef.value.open();
    })
    .finally(() => {
      row.contentLoading = false;
    });
};
const emit = defineEmits(["reloadData"]);

const submit = () => {
  formDrawerRef.value.showLoading();
  editGoods(goodsId.value, form)
    .then((res) => {
      notifc("设置商品详情成功");
      formDrawerRef.value.close();
      emit("reloadData");
    })
    .finally(() => {
      formDrawerRef.value.hideLoading();
    });
};

defineExpose({
  open,
});
</script>
<template>
  <FormDrawer
    ref="formDrawerRef"
    title="设置商品详情"
    @submit="submit"
    destroy-on-close
  >
    <el-form :model="form">
      <el-form-item>
        <Editor v-model="form.content" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

