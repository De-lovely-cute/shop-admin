<script setup>
 import FormDrawer from "@/components/FormDrawer.vue";
import { ref } from "vue";
import ListHeader from "@/components/ListHeader.vue";
</script>

<template>
 <div>
   <el-card shadow="hover" class="border-0" v-loading="loading">
    <!-- 新增刷新 -->
    <ListHeader @add="addNotice()" @refresh="getData"/>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="公告标题" />
      <el-table-column
        prop="create_time"
        label="发表时间"
        width="380"
        align="center"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            text
            size="small"
            @click="handleEdit(scope.row)"
            >修改</el-button
          >
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
      class="flex justify-center items-center mt-4"
    />
  </el-card>
 </div>
</template>

<style lang='less' scoped>
 
</style>