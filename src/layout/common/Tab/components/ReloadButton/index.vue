<template>
  <div class="my-auto mr-15px">
    <el-icon class="text-22px" @click="handleRefresh"
      ><i-ep-refresh-right :class="{ 'animate-spin': loading }"
    /></el-icon>
  </div>
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
