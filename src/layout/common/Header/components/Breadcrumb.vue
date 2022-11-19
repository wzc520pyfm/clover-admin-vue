<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.key" :to="{ path: item.path }">{{
      item.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- <div>面包屑{{ breadcrumbs }}</div> -->
</template>

<script lang="ts" setup>
import { useRouteStore } from "@/stores";
import { getBreadcrumbByRouteKey } from "@/utils";

const route = useRoute();
console.log("route.name", route.name);

const routeStore = useRouteStore();
const menus = routeStore.menus;
console.log("menus", menus);

const breadcrumbs = computed(() => getBreadcrumbByRouteKey(route.name, menus));
</script>

<style scoped></style>
