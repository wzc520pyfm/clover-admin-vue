<template>
  <div ref="domRef" class="h-full w-full"></div>
</template>

<script lang="ts" setup>
import { useScriptTag } from "@vueuse/core";
import { GAODE_MAP_SDK_URL } from "@/config";

const { load } = useScriptTag(GAODE_MAP_SDK_URL);

const domRef = ref<HTMLDivElement>();

async function renderMap() {
  if (!domRef.value) return;
  await load(true);
  const map = new AMap.Map(domRef.value, {
    zoom: 11,
    center: [116.397428, 39.90923],
    viewMode: "3D",
  });
  map.getCenter();
}

onMounted(() => {
  renderMap();
});
</script>

<style scoped></style>
