<template>
  <div class="wh-full">
    <el-space class="w-100%" size="large" direction="vertical" alignment="normal">
      <data-card />
      <charts />
      <bottom-part />
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { BottomPart, Charts, DataCard } from "./components";

defineOptions({ name: "DashboardAnalysis" });
</script>

<style lang="less" scoped></style>
