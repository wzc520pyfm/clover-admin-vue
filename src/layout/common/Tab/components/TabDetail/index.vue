<template>
  <div class="h-full pl-10px flex-y-center">
    <div v-for="item in tab.tabs" :key="item.fullPath" class="mr-10px">
      {{ item.meta.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTabStore } from "@/stores";

defineOptions({ name: "TabDetail" });

const tab = useTabStore();
console.log("tab", tab);
</script>

<style scoped>

</style>
