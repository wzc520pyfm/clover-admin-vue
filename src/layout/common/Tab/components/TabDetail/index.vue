<template>
  <el-tabs
    v-model="tab.activeTab"
    type="card"
    tab-position="bottom"
    class="tabs h-full pl-20px flex-y-center"
    @tab-click="handleClickTab"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tab.tabs"
      :key="item.fullPath"
      :name="item.fullPath"
      :closable="Boolean(item.meta.key !== 'root')"
    >
      <template #label>
        <span class="flex-y-center gap-1">
          <el-icon class="vertical-middle"
            ><component :is="Icons[item.meta.icon as unknown as IconType]"></component
          ></el-icon>
          <span>{{ item.meta.title }}</span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { useTabStore } from "@/stores";
import type { TabPaneName, TabsPaneContext } from "element-plus";
import * as Icons from "@element-plus/icons-vue";

type IconType = keyof typeof Icons;

defineOptions({ name: "TabDetail" });

const tab = useTabStore();

const handleClickTab = (pane: TabsPaneContext) => {
  tab.handleClickTab(pane.props.name as string);
};
const removeTab = (name: TabPaneName) => {
  tab.removeTab(name as string);
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
