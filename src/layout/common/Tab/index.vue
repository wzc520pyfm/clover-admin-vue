<template>
  <div class="global-tab flex-1-hidden h-full">
    <tab-detail />
  </div>
</template>

<script lang="ts" setup>
import { useTabStore } from "@/stores";
import { TabDetail } from "./components";

defineOptions({ name: "GlobalTab" });

const route = useRoute();
const tab = useTabStore();

function init() {
  tab.initTabStore(route);
}

watch(
  () => route.fullPath,
  () => {
    tab.addTab(route);
    tab.setActiveTab(route.fullPath);
  }
);

// 初始化
init();
</script>

<style scoped>
.global-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
