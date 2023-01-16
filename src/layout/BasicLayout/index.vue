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
import { AppMain, Footer, Header, Sidebar, Tab } from "../common";

defineOptions({ name: "BasicLayout" });
</script>

<style scoped></style>
