<template>
  <div class="global-sidebar h-full flex-col">
    <el-menu
      popper-effect="light"
      :collapse="sidebarCollapse"
      class="flex-1 b-0 p-5px"
      router
      :default-active="activeRoute"
    >
      <div class="h-56px flex-center c-#29aefe text-16px font-bold">Clover管理系统</div>
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
.global-sidebar {
  box-shadow: 1px 0 5px rgb(0 21 41 / 5%);
}
.el-menu--collapse :deep(.el-menu-tooltip__trigger) {
  justify-content: center;
}
.el-menu--collapse :deep(.el-sub-menu__title) {
  justify-content: center;
}
.el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.el-menu {
  --el-menu-item-height: 42px;
  --el-menu-sub-item-height: var(--el-menu-item-height);
}
:deep(.el-menu-item),
:deep(.el-sub-menu) {
  margin-top: 6px;
  --el-menu-hover-bg-color: #f3f3f5;
}
:deep(.el-menu-item).is-active {
  background-color: #e7f4ff;
}
</style>
