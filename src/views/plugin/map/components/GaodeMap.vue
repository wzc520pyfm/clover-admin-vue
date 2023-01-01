<template>
  <div ref="domRef" class="h-full w-full"></div>
</template>

<script lang="ts" setup>
import { useScriptTag } from "@vueuse/core";
import { GAODE_MAP_SDK_URL } from "@/config";
import { useThemeStore } from "@/stores";

const MapStyle = ["amap://styles/normal", "amap://styles/darkblue"];

const theme = useThemeStore();
const { load } = useScriptTag(GAODE_MAP_SDK_URL);
let map: AMap.Map;

const domRef = ref<HTMLDivElement>();

async function renderMap() {
  if (!domRef.value) return;
  await load(true);
  map = new AMap.Map(domRef.value, {
    zoom: 11,
    center: [116.397428, 39.90923],
    viewMode: "3D",
    mapStyle: theme.isDark.value ? MapStyle[1] : MapStyle[0],
  });
  map.getCenter();
}

function setMapStyle(map: AMap.Map, isDark: boolean) {
  if (isDark) {
    map.setMapStyle(MapStyle[1]);
  } else {
    map.setMapStyle(MapStyle[0]);
  }
}

watch(
  () => theme.isDark.value,
  (newValue) => void setMapStyle(map, newValue)
);

onMounted(() => {
  renderMap();
});
</script>

<style scoped></style>
