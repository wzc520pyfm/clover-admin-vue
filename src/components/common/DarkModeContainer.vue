<template>
  <div
    class="dark:bg-dark dark:text-white dark:text-opacity-82 transition-all duration-300 ease-in-out"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "DarkModeContainer" });
</script>

<style lang="less" scoped></style>
