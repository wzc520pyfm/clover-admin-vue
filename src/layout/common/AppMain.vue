<template>
  <div class="app-main overflow-auto wh-full p-5 bg-#f8fafb">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "GlobalMain" });
</script>

<style scoped></style>
