<template>
  <div class="h-full">
    <el-card class="h-full" header="网络请求">
      <el-button type="danger" @click="request404">请求404</el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { fetch404 } from "@/service";

const request404 = async () => {
  await fetch404();
};
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
