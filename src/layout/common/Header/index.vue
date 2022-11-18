<template>
  <div class="global-header h-full flex-y-center pl-10px pr-15px">
    <div class="flex-1-hidden flex-y-center h-full">
      <MenuCollapse />
      <div>面包屑</div>
    </div>
    <div class="flex-y-center justify-end h-full">右侧展示栏</div>
  </div>
</template>

<script lang="ts" setup>
import { MenuCollapse } from "./components";
</script>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
