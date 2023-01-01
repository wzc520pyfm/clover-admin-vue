<template>
  <web-site-link label="github地址：" :link="link" />
</template>

<script setup lang="ts">
export interface Props {
  /** github链接 */
  link: string;
}

import WebSiteLink from "./WebSiteLink.vue";

defineOptions({ name: "GithubLink" });

defineProps<Props>();
</script>

<style scoped></style>
