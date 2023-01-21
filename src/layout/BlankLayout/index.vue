<template>
  <AppMain :show-padding="false" :show-scroll-bar="false" />
</template>

<script lang="ts" setup>
import { AppMain } from "../common";

defineOptions({ name: "BlankLayout" });
</script>

<style scoped></style>
