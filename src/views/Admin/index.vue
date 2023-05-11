<script setup>
import FHeader from "@/views/Admin/FHeader.vue";
import FMenu from "@/views/Admin/FMenu.vue";
import FTagList from "@/views/Admin/FTagList.vue";
</script>

<template>
  <el-container>
    <el-header>
      <f-header></f-header>
    </el-header>
    <el-container>
      <el-aside :width="$store.state.asidWidth">
        <f-menu></f-menu>
      </el-aside>
      <el-main>
        <f-tag-list></f-tag-list>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-aside {
  transition: all .2s;
}
</style>
