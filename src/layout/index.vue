<template>
  <div class="mt-100px">
    {{ count }}
    <el-button @click="count++">+</el-button>
    <Sidebar />
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <AppMain />
  </div>
</template>

<script lang="ts" setup>
import { Sidebar, AppMain } from "./components";
const count = ref(0);
</script>

<style scoped>

</style>
