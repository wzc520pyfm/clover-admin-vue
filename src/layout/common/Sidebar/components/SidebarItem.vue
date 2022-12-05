<template>
  <el-menu-item v-if="!menu.children" :index="menu.routePath">
    <!-- <i-ep-location /> -->
    <!-- see: https://github.com/element-plus/element-plus/issues/5588 -->
    <el-icon v-if="menu?.icon"
      ><component :is="Icons[menu.icon as unknown as IconType]"></component
    ></el-icon>
    <template #title>
      <span>{{ menu.label }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="menu.routePath" :key="menu.key">
    <template #title>
      <el-icon v-if="menu?.icon"
        ><component :is="Icons[menu.icon as unknown as IconType]"></component
      ></el-icon>
      <span>{{ menu.label }}</span>
    </template>
    <el-menu-item-group>
      <SidebarItem v-for="item in menu.children" :key="item.key" :menu="item" />
    </el-menu-item-group>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import * as Icons from "@element-plus/icons-vue";

type IconType = keyof typeof Icons;

type MenuProps = {
  menu: GlobalMenuOption;
};

defineOptions({
  name: "SidebarItem",
});

const { menu } = defineProps<MenuProps>();
</script>

<style scoped></style>
