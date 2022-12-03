<template>
  <div class="flex h-full">
    <div
      class="fixed w-full h-56px z1001 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px` }"
    >
      <slot name="header"></slot>
    </div>
    <div
      class="fixed w-full h-44px z1000 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px`, top: '56px' }"
    >
      <slot name="tab"></slot>
    </div>
    <div class="h-full z-1003">
      <slot name="sidebar"></slot>
    </div>
    <div class="pt-100px pb-48px w-full overflow-auto">
      <slot></slot>
    </div>
    <div
      class="fixed flex-center z-998 h-48px w-full bottom-0 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px` }"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores";

defineOptions({ name: "AdminLayout" });

const { sidebarCollapse } = $(useAppStore());
</script>

<style scoped></style>
