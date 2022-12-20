<template>
  <hover-container class="w-64px h-full" tooltip-content="重新加载" @click="handleRefresh">
    <el-icon class="text-22px vertical-middle"
      ><i-ep-refresh-right :class="{ 'animate-spin': loading }"
    /></el-icon>
  </hover-container>
</template>

<script lang="ts" setup>
import { useLoading } from "@/hooks";
import { useAppStore } from "@/stores";

defineOptions({ name: "ReloadButton" });

const app = useAppStore();
const { loading, startLoading, endLoading } = useLoading();

function handleRefresh() {
  startLoading();
  app.reloadPage();
  setTimeout(() => {
    endLoading();
  }, 1000);
}
</script>

<style scoped></style>
