<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.key" :to="{ path: item.path }">
      <el-icon v-if="item.icon" :size="15" class="vertical-bottom"
        ><component :is="Icons[item.icon as unknown as IconType]"></component
      ></el-icon>
      <span class="pl-2px">{{ item.title }}</span></el-breadcrumb-item
    >
  </el-breadcrumb>
  <!-- <div>面包屑{{ breadcrumbs }}</div> -->
</template>

<script lang="ts" setup>
import { useRouteStore } from "@/stores";
import { getBreadcrumbByRouteKey } from "@/utils";
import * as Icons from "@element-plus/icons-vue";

defineOptions({ name: "Breadcrumb" });

type IconType = keyof typeof Icons;

const route = useRoute();
const routeStore = useRouteStore();
const menus = routeStore.menus;

const breadcrumbs = computed(() => getBreadcrumbByRouteKey(route.name, menus));
</script>

<style scoped></style>
