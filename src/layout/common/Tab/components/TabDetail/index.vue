<template>
  <el-tabs type="card" tab-position="bottom" class="tabs h-full pl-20px flex-y-center">
    <el-tab-pane
      v-for="item in tab.tabs"
      :key="item.fullPath"
      :label="item.meta.title"
      :name="item.name"
      :closable="Boolean(item.meta.key !== 'root')"
    ></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { useTabStore } from "@/stores";

defineOptions({ name: "TabDetail" });

const tab = useTabStore();
console.log("tab", tab);
</script>

<style scoped>
.tabs :deep(.el-tabs__header) {
  height: 30px;
  margin-bottom: -5px;
}
.tabs :deep(.el-tabs__nav) {
  display: flex;
}
.tabs :deep(.el-tabs__item) {
  height: 30px;
  display: flex;
  align-items: center;
}
</style>
