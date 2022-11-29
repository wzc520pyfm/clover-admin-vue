<template>
  <div class="flex h-full">
    <div
      class="fixed w-full h-56px z1001 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px` }"
    >
      <Header />
    </div>
    <div
      class="fixed w-full h-44px z1000 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px`, top: '56px' }"
    >
      <Tab />
    </div>
    <div class="h-full z-1003">
      <Sidebar />
    </div>
    <div class="pt-100px pb-48px w-full overflow-auto">
      <AppMain />
    </div>
    <div
      class="fixed flex-center z-998 h-48px w-full bottom-0 bg-white base-transition"
      :style="{ paddingLeft: `${!sidebarCollapse ? 220 : 64}px` }"
    >
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Header, Tab, Sidebar, AppMain, Footer } from "./common";
import { useAppStore } from "@/stores";

const { sidebarCollapse } = $(useAppStore());
</script>

<style scoped></style>
