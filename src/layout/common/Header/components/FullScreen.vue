<template>
  <div class="my-auto">
    <el-tooltip :content="isFullscreen ? '窗口' : '全屏'">
      <el-icon class="text-22px" @click="toggle"><i-ep-full-screen /></el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";

defineOptions({ name: "FullScreen" });

const { isFullscreen, toggle } = useFullscreen();
</script>

<style scoped></style>
