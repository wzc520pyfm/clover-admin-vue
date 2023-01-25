<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.key" :to="{ path: item.path }">
      <el-icon v-if="item.icon" :size="15" class="vertical-bottom"
        ><LayoutIcon :icon-name="item.icon"
      /></el-icon>
      <span class="pl-2px">{{ item.title }}</span></el-breadcrumb-item
    >
  </el-breadcrumb>
  <!-- <div>面包屑{{ breadcrumbs }}</div> -->
</template>

<script lang="ts" setup>
import { useRouteStore } from "@/stores";
import { getBreadcrumbByRouteKey } from "@/utils";
import { LayoutIcon } from "../../Icon";

defineOptions({ name: "Breadcrumb" });

const route = useRoute();
const routeStore = useRouteStore();
const menus = routeStore.menus;

const breadcrumbs = computed(() => getBreadcrumbByRouteKey(route.name, menus));
</script>

<style scoped></style>
