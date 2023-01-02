<template>
  <div class="global-tab flex-1-hidden h-full flex justify-between dark:bg-dark">
    <div ref="bsWrapper" class="flex-1-hidden h-full">
      <better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: true }">
        <tab-detail @scroll="handleScroll" />
      </better-scroll>
    </div>
    <ReloadButton />
  </div>
</template>

<script lang="ts" setup>
import { useElementBounding } from "@vueuse/core";
import { useTabStore } from "@/stores";
import { TabDetail, ReloadButton } from "./components";

defineOptions({ name: "GlobalTab" });

const route = useRoute();
const tab = useTabStore();

const bsWrapper = $ref<HTMLElement>();
const { width: bsWrapperWidth, left: bsWrapperLeft } = $(useElementBounding(bsWrapper));

const bsScroll = $ref<Expose.BetterScroll>();

function handleScroll(clientX: number) {
  const currentX = clientX - bsWrapperLeft;
  const deltaX = currentX - bsWrapperWidth / 2;
  if (bsScroll) {
    const { maxScrollX, x: leftX } = bsScroll.instance;
    const rightX = maxScrollX - leftX;
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);
    bsScroll?.instance.scrollBy(update, 0, 300);
  }
}

function init() {
  tab.initTabStore(route);
}

watch(
  () => route.fullPath,
  () => {
    tab.addTab(route);
    tab.setActiveTab(route.fullPath);
  }
);

// 初始化
init();
</script>

<style scoped>
.global-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
