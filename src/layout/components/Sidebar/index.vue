<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    class="min-w-50"
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
</template>

<script lang="ts" setup>
import { useRouteStore } from "@/stores";

const router = useRouter();
console.log("index", router.getRoutes());
const routeStore = useRouteStore();
const menus = routeStore.menus;
console.log("menus", menus);
</script>

<style scoped></style>
