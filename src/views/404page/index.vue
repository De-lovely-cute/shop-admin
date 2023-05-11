<script setup>

</script>

<template>
    <div class="flex items-center justify-center result">
        <el-result
    icon="warning"
    title="404 提示"
    sub-title="你的页面走丢了~"
  >
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
    </template>
  </el-result>
    </div>
  
</template>

<style lang="less" scoped>
    .result {
        height: 100vh;
    }
</style>
