<template>
  <dark-mode-container class="flex justify-between flex-wrap gap-20">
    <div class="flex-col-center gap-10">
      <el-icon :size="300"><i-local-load-failed /></el-icon>
      <span>加载失败</span>
    </div>
    <div class="flex-col-center gap-10">
      <el-icon :size="300"><i-local-network-error /></el-icon>
      <span>网络异常</span>
    </div>
    <div class="flex-col-center gap-10">
      <el-icon :size="300"><i-local-no-content /></el-icon>
      <span>无数据</span>
    </div>
    <div class="flex-col-center gap-10">
      <el-icon :size="300"><i-local-page-error /></el-icon>
      <span>页面出错</span>
    </div>
  </dark-mode-container>
</template>

<script lang="ts" setup>
defineOptions({ name: "ExceptionOther" });
</script>

<style scoped></style>
