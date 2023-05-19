<script setup>
import FHeader from "@/views/Background/FHeader.vue";
import FMenu from "@/views/Background/FMenu.vue";
import FTagList from "@/views/Background/FTagList.vue";
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
        <router-view v-slot="{ Component }">
          <transition>
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-aside {
  transition: all 0.2s;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter-active {
  transition-delay: 0.3s;
}
.v-enter-from {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

.v-enter-to {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.v-leave-from {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
</style>
