<script setup>
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";

import { useCookies } from "@vueuse/integrations/useCookies";
const cookie = useCookies();
const route = useRoute();
const router = useRouter();
const activeTab = ref(route.fullPath);
const tabList = ref([
  {
    title: "后台首页",
    path: "/",
  },
]);
// 添加标签导航
const addTab = (tab) => {
  // 判断是否有标签
  let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
  if (noTab) {
    tabList.value.push(tab);
  }
  // 存储cookie
  cookie.set("tabList", tabList.value);
};
// 初始化标题导航列表
function initTabList() {
  let tbs = cookie.get("tabList");
  if (tbs) {
    tabList.value = tbs;
  }
}
initTabList();
onBeforeRouteUpdate((to, from) => {
  // console.log({
  //     title: to.meta.title,
  //     path: to.path
  // });
  // 激活状态
  activeTab.value = to.path;
  addTab({
    title: to.meta.title,
    path: to.path,
  });
});
// 删除标签导航
const removeTab = (e) => {
  const tabs = tabList.value;
  // 当前激活列表
  let a = activeTab.value;
  if (a == e) {
    tabs.forEach((tab, index) => {
      if (tab.path == e) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          a = nextTab.path;
        }
      }
    });
  }
  activeTab.value = a;
  tabList.value = tabList.value.filter((tab) => tab.path != e);
  cookie.set("tabList", tabList.value);
};

// tab-change	activeName 改变时触发 切换激活状态
const changeTab = (e) => {
  // console.log(e);
  activeTab.value = e;
  router.push(e);
};
const handleClear = (e) => {
//   console.log(e);
  switch (e) {
    case "clearOther":
      clearOther();
      break;
    case "clearAll":
      clearAll();
      break;
  }
  cookie.set("tabList", tabList.value)
};
// 关闭其他
const clearOther = () => {
    // 过滤只剩下首页和当前激活
    tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value)
};
// 全部关闭
const clearAll = () => {
  // 切换回首页
  activeTab.value = "/";
  // 过滤只剩下首页
  tabList.value = [
    {
      title: "后台首页",
      path: "/",
    },
  ];
};
</script>

<template>
  <div class="f-tag-list" :style="{ left: $store.state.asidWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-remove="removeTab"
      @tab-change="changeTab"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/'"
      >
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handleClear">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>

<style lang="less" scoped>
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
  //   :deep(.el-tabs__header)
  /deep/.el-tabs__header {
    @apply mb-0 flex items-center;
    border: 0 !important;
  }
  :deep(.el-tabs__nav) {
    border: 0 !important;
  }
  :deep(.el-tabs__item) {
    border: 0 !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white rounded mx-1;
  }
  :deep(.is-disabled) {
    cursor: not-allowed;
  }
  /deep/.el-tabs__nav-next,
  /deep/.el-tabs__nav-prev {
    line-height: 32px;
  }
  .tag-btn {
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    width: 32px;
    height: 32px;
  }
}
button,
[role="button"] {
  outline: none;
}
</style>
