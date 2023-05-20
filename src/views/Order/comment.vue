<script setup>
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import {
  getGoodsComment,
  updateStatusGoodsComment,
  goodsCommentReview,
} from "@/api/goodsComment";
import FormDrawer from "@/components/FormDrawer.vue";
import { useInitTable } from "@/componsables/useCommon";
import { ref } from "vue";
import { notifc } from "@/componsables/util.js";
const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  searchForm: {
    title: "",
  },
  getList: getGoodsComment,
  onGetListSuccess: (res) => {
    console.log(res);
    tableData.value = res.list.map(o=>{
      o.textareaEdit = false
      return o
    })
    total.value = res.totalCount;
  },
  updateStatus: updateStatusGoodsComment
});
// 回复
const textarea = ref("")
const opeenTextarea = (row, data = "") => {
   // console.log(row);
   textarea.value = data
   row.textareaEdit = true
}
const review = (row) => {
   if(textarea.value == '') {
      return notifc("回复内容不能为空", "error")
   }
   goodsCommentReview(row.id, textarea.value).then(res=>{
      row.textareaEdit = false
      notifc("回复成功")
      getData()
   })
}
</script>

<template>
  <el-card shadow="never">
    <!-- 搜索 -->
    <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
      <SearchItem label="关键词">
        <el-input
          v-model="searchForm.title"
          placeholder="要搜索的商品"
          clearable
        ></el-input>
      </SearchItem>
    </Search>
    <!-- 表格 -->
    <el-table :data="tableData" default-expand-all :border="parentBorder" v-loading="loading" style="width: 100%">
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="flex pl-18">
            <el-avatar :size="50" :src="row.user.avatar" />
            <div class="flex flex-col ml-4">
              <div class="flex">
                <h6>{{ row.user.username }}</h6>
                <small>{{ row.review_time }}</small>
              </div>
              <p>{{ row.review.data }}</p>
              <el-image
                :src="row.review.image[0]"
                class="w-[100px] h-[100px]"
              ></el-image>
              
              <div v-if="row.textareaEdit" class="w-[885px] mt-3">
               <el-input v-model="textarea" :rows="2" placeholder="请输入评价内容" type="textarea"></el-input>
               <div class="flex mt-3">
                  <el-button type="primary" size="small" @click="review(row)">回复</el-button>
                  <el-button type="default" size="small" @click="row.textareaEdit = false">取消</el-button>
               </div>
              </div>
              <template v-else>
                  <div class="mt-3 bg-gray-100 p-3 rounded flex w-[885px]" >
                <div>
                  <h5 class="mt-0 flex text-md font-bold">
                    {{ row.extra[0].isuser ? "用户" : "客服" }}
                  </h5>
                  <span>{{ row.extra[0].data }}</span>
                </div>
                <el-button class="ml-auto" type="info" size="small" @click="opeenTextarea(row, row.extra[0].data)"
                >修改</el-button
                >
              </div>
               </template>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" width="50" />
      <el-table-column label="商品" width="250">
        <template #default="{ row }">
          <div class="flex">
            <el-image
              class="w-[50px] h-[50px] rounded"
              :src="row.goods_item.cover"
            />
            <div class="ml-3">{{ row.goods_item.title }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="评论信息" width="200">
        <template #default="{ row }">
          <div class="flex flex-col">
            <div>用户：{{ row.user.nickname||row.user.username }}</div>
            <div>
               <el-rate v-model="row.rating" disabled />
              {{ row.rating }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="评论时间" prop="review_time" />
      <el-table-column label="是否显示">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange($event, row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
</template>

<style lang="less" scoped></style>
