<template>
  <div
    ref="el"
    :class="{
      'p-5': showPadding,
      'overflow-y-auto': showScrollBar,
      'overflow-x-hidden': showScrollBar,
    }"
    class="app-main h-full bg-#f6f9f8 dark:bg-#101014"
  >
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

interface Props {
  /** 显示padding */
  showPadding?: boolean;
  /** 显示滚动条 */
  showScrollBar?: boolean;
}

const { showPadding = true, showScrollBar = true } = defineProps<Props>();

const app = useAppStore();
const routeStore = useRouteStore();
</script>

<style scoped></style>
