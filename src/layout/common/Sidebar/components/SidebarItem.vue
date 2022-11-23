<template>
  <div>
    <el-menu-item v-if="!menu.children" :index="menu.routePath">
      <span>{{ menu.label }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="menu.routePath" :key="menu.key">
      <template #title>
        <i-ep-location />
        <span>{{ menu.label }}</span>
      </template>
      <SidebarItem v-for="item in menu.children" :key="item.key" :menu="item" />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
type MenuProps = {
  menu: GlobalMenuOption;
};

defineOptions({
  name: "SidebarItem",
});

const { menu } = defineProps<MenuProps>();
</script>

<style scoped></style>
