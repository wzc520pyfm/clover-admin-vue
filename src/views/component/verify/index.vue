<template>
  <div class="min-h-full">
    <el-card class="h-full" header="验证组件">
      <drag-verify-example />
      <img-rotate-verify-example />
      <random-verify-example />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { DragVerifyExample, ImgRotateVerifyExample, RandomVerifyExample } from "./components";

defineOptions({ name: "ComponentVerify" });
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
  :deep(.el-card__body) {
    #cm.flex-center-wrap();
  }
}
</style>
