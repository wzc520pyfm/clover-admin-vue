<template>
  <hover-container
    tooltip-content="主题"
    :inverted="isDark"
    class="w-40px h-full"
    @click="toggleDark()"
  >
    <i-mdi-moon-waning-crescent v-if="isDark" class="text-22px text-#d5d5d6" />
    <i-mdi-white-balance-sunny v-else class="text-22px" />
  </hover-container>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";

defineOptions({ name: "ThemeModel" });

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style lang="less" scoped></style>
