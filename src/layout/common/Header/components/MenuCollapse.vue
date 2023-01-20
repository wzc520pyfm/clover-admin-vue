<template>
  <div @click="toggleSidebarCollapse">
    <el-icon class="w-40px h-56px dark:text-dark_info">
      <i-ep-fold v-if="!sidebarCollapse" class="text-20px" />
      <i-ep-expand v-else class="text-20px" />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores";

defineOptions({ name: "MenuCollapse" });

const { sidebarCollapse, toggleSidebarCollapse } = $(useAppStore());
</script>

<style scoped></style>
