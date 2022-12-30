<template>
  <div class="global-sidebar h-full flex-col dark:bg-dark">
    <GlobalLogo :show-title="!sidebarCollapse" class="h-56px py-10px px-5px" />
    <el-scrollbar>
      <el-menu
        popper-effect="light"
        :collapse="sidebarCollapse"
        class="flex-1 b-0 p-5px"
        router
        :default-active="activeRoute"
      >
        <SidebarItem v-for="menu in menus" :key="menu.key" :menu="menu" />
      </el-menu>
    </el-scrollbar>
    <div v-show="!sidebarCollapse">
      <Vue3Lottie :animationData="ManagementJSON" :speed="0.7" :height="220" :width="220" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SidebarItem } from "./components";
import { GlobalLogo } from "../../common";
import { useAppStore, useRouteStore } from "@/stores";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import ManagementJSON from "@/assets/animation/management.json";

defineOptions({ name: "GlobalSidebar" });

const { sidebarCollapse } = $(useAppStore());

const route = useRoute();
const routeStore = useRouteStore();
const menus: GlobalMenuOption[] = routeStore.menus.flat(1);
const activeRoute = computed(() => route.path);
</script>

<style lang="less" scoped>
.global-sidebar {
  box-shadow: 1px 0 5px rgb(0 21 41 / 5%);
}

.el-menu--collapse {
  :deep(.el-menu-tooltip__trigger) {
    justify-content: center;
  }

  :deep(.el-sub-menu__title) {
    justify-content: center;
  }
}

.el-menu {
  --el-menu-item-height: 42px;
  --el-menu-sub-item-height: var(--el-menu-item-height);

  &-:not(.el-menu--collapse) {
    width: 220px;
  }
}

:deep(.el-menu-item),
:deep(.el-sub-menu) {
  margin-top: 6px;
}

:deep(.el-menu-item).is-active {
  & {
    background-color: var(--el-menu-active-bg-color);
  }

  span {
    font-weight: bold;
  }
}
</style>
