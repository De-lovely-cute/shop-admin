<script setup>
import AsideList from "@/components/AsideList.vue";
import { getImages, addImages, editImages, deleteImages } from "@/api/images";
import { ref, onMounted, reactive, computed } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
import { notifc } from "@/componsables/util.js";
const images = ref([]);
// 加载动画
const loading = ref(false);
const activeId = ref(0);
// 分页
// currentPage 当前页码
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
// 获取图库列表数据
function getData(page = null) {
  //   console.log(page);
  if (typeof page == "number") {
    currentPage.value = page;
  }
  loading.value = true;
  getImages(currentPage.value)
    .then((res) => {
      //   console.log(res);
      images.value = res.list;
      total.value = res.totalCount;
      let item = images.value[0];
      if (item) {
        handleChangeActiveId(item.id)
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  getData();
});

const addRef = ref(null);

const form = reactive({
  name: "",
  order: 50,
});
const formRef = ref(null);
const rules = {
  name: [{ required: true, message: "相册名不能为空", trigger: "blur" }],
};
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    // console.log("提交成功")
    // 新增图片
    addRef.value.showLoading();
    const fun = editId.value ? editImages(editId.value, form) : addImages(form);
    fun
      .then((res) => {
        notifc(drawerTitle.value + "成功");
        // console.log(res);
        getData(editId.value ? currentPage.value : 1);
        addRef.value.close();
      })
      .finally(() => addRef.value.hideLoading());
  });
};
// 添加图库
const handleCreate = () => {
  editId.value = 0;
  form.name = "";
  form.order = 50;
  addRef.value.open();
};

// 修改图库
const handleEdit = (row) => {
  // console.log(row);
  editId.value = row.id;
  form.name = row.name;
  form.order = row.order;
  addRef.value.open();
};
// 删除
const handleDelete = (id) => {
  // console.log(id);
  loading.value = true;
  deleteImages(id)
    .then((res) => {
      notifc("删除成功");
      getData();
    })
    .finally(() => (loading.value = false));
};
// 选中图库分类ID
const emit = defineEmits(["change"])
// 切换分类
function handleChangeActiveId(id){
    activeId.value = id
    emit("change",id)
}
defineExpose({
  handleCreate,
});
</script>

<template>
  <el-aside width="220px" class="image-aside">
    <div class="top">
      <AsideList
        v-for="(item, index) in images"
        :key="index"
        :active="activeId == item.id"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        @click="handleChangeActiveId(item.id)"
        >{{ item.name }}</AsideList
      >
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        @current-change="getData"
        :total="total"
        :page-size="limit"
        :current-page="currentPage"
      />
    </div>
  </el-aside>
  <!-- 新增图库 -->
  <FormDrawer :title="drawerTitle" ref="addRef" @submit="handleSubmit">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="相册名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.order" :min="0" :max="1000" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<style lang="less" scoped>
.image-aside {
  border-right: 1px solid #eee;
  position: relative;
  .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex justify-center items-center;
  }
}
</style>
