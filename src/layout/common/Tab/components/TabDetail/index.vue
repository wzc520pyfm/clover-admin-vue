<template>
  <el-tabs
    v-model="tab.activeTab"
    type="card"
    tab-position="bottom"
    class="tabs h-full pl-20px flex-y-center"
    @tab-click="handleClickTab"
  >
    <el-tab-pane
      v-for="item in tab.tabs"
      :key="item.fullPath"
      :label="item.meta.title"
      :name="item.fullPath"
      :closable="Boolean(item.meta.key !== 'root')"
    ></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { useTabStore } from "@/stores";
import type { TabsPaneContext } from "element-plus";

defineOptions({ name: "TabDetail" });

const tab = useTabStore();

const handleClickTab = (pane: TabsPaneContext) => {
  tab.handleClickTab(pane.props.name as string);
};
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
