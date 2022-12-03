<template>
  <AdminLayout>
    <template #header>
      <Header />
    </template>
    <template #tab>
      <Tab />
    </template>
    <template #sidebar>
      <Sidebar />
    </template>
    <AppMain />
    <template #footer>
      <Footer />
    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { Header, Tab, Sidebar, AppMain, Footer } from "./common";
</script>

<style scoped></style>
