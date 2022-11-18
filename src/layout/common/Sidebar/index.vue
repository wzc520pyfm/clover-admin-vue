<template>
  <div class="h-full flex-col">
    <div class="w-220px h-56px bg-#545c64 flex-center c-white">Clover管理系统</div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      :collapse="sidebarCollapse"
      class="flex-1 b-0"
      router
    >
      <el-menu-item index="/home">Home</el-menu-item>
      <el-sub-menu index="/">
        <template #title>
          <el-icon>
            <i-ep-location />
          </el-icon>
          <span>Plugin</span>
        </template>
        <el-menu-item index="/plugin/about">About</el-menu-item>
        <el-menu-item index="/plugin/map">Map</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore, useRouteStore } from "@/stores";

const { sidebarCollapse } = $(useAppStore());

// const router = useRouter();
// console.log("index", router.getRoutes());
const routeStore = useRouteStore();
const menus = routeStore.menus;
console.log("menus", menus); // TODO 将menus渲染为侧边菜单
</script>

<style scoped></style>
