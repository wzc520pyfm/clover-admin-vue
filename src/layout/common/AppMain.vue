<template>
  <div ref="el" class="app-main overflow-auto wh-full p-5 bg-#f6f9f8 dark:bg-#101014">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" :appear="true">
        <KeepAlive :include="routeStore.cacheRoutes">
          <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore, useRouteStore } from "@/stores";

defineOptions({ name: "GlobalMain" });

const app = useAppStore();
const routeStore = useRouteStore();
</script>

<style scoped></style>
