<template>
  <el-menu-item v-if="!menu.children" :index="menu.routePath">
    <!-- <i-ep-location /> -->
    <!-- see: https://github.com/element-plus/element-plus/issues/5588 -->
    <el-icon v-if="menu?.icon"><LayoutIcon :icon-name="menu.icon" /></el-icon>
    <template #title>
      <span class="ellipsis">{{ menu.label }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :key="menu.key" :index="menu.routePath">
    <template #title>
      <el-icon v-if="menu?.icon"><LayoutIcon :icon-name="menu.icon" /></el-icon>
      <span class="ellipsis">{{ menu.label }}</span>
    </template>
    <el-menu-item-group>
      <SidebarItem v-for="item in menu.children" :key="item.key" :menu="item" />
    </el-menu-item-group>
  </el-sub-menu>
</template>

<script lang="tsx" setup>
import { LayoutIcon } from "../../Icon";

type MenuProps = {
  menu: GlobalMenuOption;
};

defineOptions({
  name: "SidebarItem",
});

const { menu } = defineProps<MenuProps>();
</script>

<style scoped>
.ellipsis {
  padding-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
