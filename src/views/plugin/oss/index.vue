<template>
  <el-card class="min-h-full w-full">
    <h1>This is an AliOSS Example page</h1>
    <oss-share-pic />
    <oss-example />
  </el-card>
</template>

<script setup lang="ts">
import { OssExample, OssSharePic } from "./components";

defineOptions({ name: "PluginOss" });
</script>

<style lang="less" scope>
.el-card {
  #ep.el-card-rounded();
  .el-card__body {
    width: 100%;
  }
}
</style>
