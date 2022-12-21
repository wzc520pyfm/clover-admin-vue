<template>
  <hover-container tooltip-content="github" class="w-40px h-full" @click="handleClickLink">
    <i-mdi-github class="text-22px" />
  </hover-container>
</template>

<script lang="ts" setup>
defineOptions({ name: "GithubSite" });

function handleClickLink() {
  window.open("https://github.com/wzc520pyfm/clover-admin-vue", "_blank");
}
</script>

<style scoped></style>
