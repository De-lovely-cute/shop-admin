<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const route = useRoute()
// 默认选中
const defaultActive = ref(route.path)

// 监听路由变化   利用组件内的路由实现联动效果
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path
})
const isCollapse = computed(() => !(store.state.asidWidth == '250px'))
const asidMenu = computed(() => store.state.menus)

const handleSelect = (e) => {
    // console.log(e);
    router.push(e)
}
</script>

<template>
  <div class="f-menu" :style="{width: $store.state.asidWidth}">
    <el-menu :default-active="defaultActive" class="border-0" :unique-opened="true" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
      <template v-for="(item, index) in asidMenu" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.f-menu {
  transition: all .2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply bg-light-50 shadow-md fixed;
}
.f-menu::-webkit-scrollbar{
    width: 0;
}
</style>
