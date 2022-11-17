<template>
  <div class="flex h-full">
    <div class="fixed w-full h-56px pl-220px z1001 bg-white">
      <Header />
    </div>
    <div class="h-full z-1003">
      <Sidebar />
    </div>
    <div class="pt-56px pb-48px w-full overflow-auto">
      <AppMain />
    </div>
    <div class="fixed flex-center z-998 h-48px w-full bottom-0 pl-220px bg-white">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Header, Sidebar, AppMain, Footer } from "./common";
</script>

<style scoped></style>
