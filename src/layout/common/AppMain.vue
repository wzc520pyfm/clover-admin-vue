<template>
  <div
    ref="el"
    class="app-main overflow-auto wh-full p-5"
    :style="{ backgroundColor: COLORS.GREEN }"
  >
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "GlobalMain" });

const COLORS = {
  BLUE: "#f6f9ff",
  GREEN: "#f8fafb",
};
</script>

<style scoped></style>
