<template>
  <div>
    <el-menu-item v-if="!menu.children" :index="`/${menu.name.split('_').join('/')}`">
      <span>{{ menu.meta.title }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="menu.path" :key="menu.name">
      <template #title>
        <i-ep-location />
        <span>{{ menu.meta.title }}</span>
      </template>
      <SidebarItem v-for="item in menu.children" :key="item.name" :menu="item" />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "SidebarItem",
});
const { menu } = defineProps<{
  menu: {
    hidden: boolean;
    path: string;
    name: string;
    meta: { title: string };
    children: any[];
  };
}>();
console.log("item", menu);
</script>

<style scoped></style>
