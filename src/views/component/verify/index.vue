<template>
  <div class="h-full">
    <el-card class="h-full" header="验证组件">
      <drag-verify-example />
      <random-verify-example />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { DragVerifyExample, RandomVerifyExample } from "./components";

defineOptions({ name: "ComponentVerify" });
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
