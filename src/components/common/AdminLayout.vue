<template>
  <div class="flex h-full min-w-120">
    <div v-if="isMobile && !sidebarCollapse" class="drawer-bg" @click="toggleSidebarCollapse" />
    <div
      class="fixed w-full h-56px z1001 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px` }"
    >
      <slot name="header" />
    </div>
    <div
      class="fixed w-full h-44px z1000 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px`, top: '56px' }"
    >
      <slot name="tab" />
    </div>
    <div
      class="h-full z-1003 base-transition"
      :style="{ width: !sidebarCollapse ? '220px' : '64px' }"
    >
      <slot name="sidebar" />
    </div>
    <div class="pt-100px pb-48px w-full overflow-auto base-transition">
      <slot />
    </div>
    <div
      class="fixed z-998 h-48px w-full bottom-0 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px` }"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBasicLayout } from "@/composables";
import { useAppStore } from "@/stores";

defineOptions({ name: "AdminLayout" });

const { sidebarCollapse, toggleSidebarCollapse } = $(useAppStore());
const { isMobile } = $(useBasicLayout());
</script>

<style scoped>
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: calc(100% - 220px);
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
  margin-left: 220px;
}
</style>
