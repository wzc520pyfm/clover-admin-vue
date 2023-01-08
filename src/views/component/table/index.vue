<template>
  <div class="h-full">
    <el-card class="h-full" header="表格">
      <BaseTable />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { BaseTable } from "./components";

defineOptions({ name: "ComponentTable" });
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
  #ep.el-card-no-divider();
}
</style>
