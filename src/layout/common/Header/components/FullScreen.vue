<template>
  <hover-container
    class="w-40px h-full"
    :tooltip-content="isFullscreen ? '窗口' : '全屏'"
    @click="toggle"
  >
    <el-icon class="text-22px vertical-middle"><i-ep-full-screen /></el-icon>
  </hover-container>
</template>

<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";

defineOptions({ name: "FullScreen" });

const { isFullscreen, toggle } = useFullscreen();
</script>

<style scoped></style>
