<template>
  <div class="h-full flex-col">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      :collapse="sidebarCollapse"
      class="flex-1 b-0"
      router
    >
      <div class="h-56px bg-#545c64 flex-center c-white">Clover管理系统</div>
      <SidebarItem v-for="menu in menus" :key="menu.name" :menu="menu" />
      <!-- <el-menu-item index="/home">Home</el-menu-item>
      <el-sub-menu index="/">
        <template #title>
          <el-icon>
            <i-ep-location />
          </el-icon>
          <span>Plugin</span>
        </template>
        <el-menu-item index="/plugin/about">About</el-menu-item>
        <el-menu-item index="/plugin/map">Map</el-menu-item>
      </el-sub-menu> -->
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { SidebarItem } from "./components";
import { useAppStore, useRouteStore } from "@/stores";
import type { RouteRecordRaw } from "vue-router";

const { sidebarCollapse } = $(useAppStore());

const routeStore = useRouteStore();
const menus: RouteRecordRaw[] = routeStore.menus.flat(1);
console.log("menus", menus[0]); // TODO 将menus渲染为侧边菜单
</script>

<style scoped>
.el-menu:not(.el-menu--collapse) {
  width: 220px;
}
</style>
