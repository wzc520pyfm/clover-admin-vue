<template>
  <div
    ref="el"
    class="app-main overflow-auto wh-full p-5"
    style="background: linear-gradient(to bottom right, #f6f9f8, #f6f9ff)"
  >
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" :appear="true">
        <KeepAlive :include="routeStore.cacheRoutes">
          <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath"></component>
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
