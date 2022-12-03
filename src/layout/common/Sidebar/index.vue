<template>
  <div class="h-full flex-col">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      :collapse="sidebarCollapse"
      class="flex-1 b-0"
      router
      :default-active="activeRoute"
    >
      <div class="h-56px bg-#545c64 flex-center c-white">Clover管理系统</div>
      <SidebarItem v-for="menu in menus" :key="menu.key" :menu="menu" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { SidebarItem } from "./components";
import { useAppStore, useRouteStore } from "@/stores";

defineOptions({ name: "GlobalSidebar" });

const { sidebarCollapse } = $(useAppStore());

const route = useRoute();
const routeStore = useRouteStore();
const menus: GlobalMenuOption[] = routeStore.menus.flat(1);
const activeRoute = computed(() => route.path);
</script>

<style scoped>
.el-menu:not(.el-menu--collapse) {
  width: 220px;
}
</style>
