<template>
  <div class="global-header h-full flex-y-center pl-10px pr-15px dark:bg-dark">
    <div class="flex-1-hidden flex-y-center h-full">
      <MenuCollapse />
      <Breadcrumb />
    </div>
    <div class="flex-y-center justify-end gap-10px h-full">
      <GithubSite />
      <FullScreen />
      <ThemeModel />
      <UserAvatar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Breadcrumb,
  FullScreen,
  GithubSite,
  MenuCollapse,
  ThemeModel,
  UserAvatar,
} from "./components";

defineOptions({ name: "GlobalHeader" });
</script>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
