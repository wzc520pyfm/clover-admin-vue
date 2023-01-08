<template>
  <dark-mode-container class="h-full">
    <el-card class="h-full">关于</el-card>
  </dark-mode-container>
</template>

<script lang="ts" setup>
defineOptions({ name: "About" });
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
