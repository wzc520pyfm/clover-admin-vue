<template>
  <dark-mode-container class="h-full">
    <el-card class="h-full">关于</el-card>
  </dark-mode-container>
</template>

<script lang="ts" setup>
import { fetchLogin } from "@/service";

await fetchLogin("userName", "password");
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
