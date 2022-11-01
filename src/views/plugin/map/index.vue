<template>
  <div class="h-full">
    <el-tabs class="demo-tabs">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Dog" name="second">Dog</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from "vue";
import { GaodeMap } from "./components";

interface Map {
  id: string;
  label: string;
  component: Component;
}

const maps: Array<Map> = [{ id: "gaode", label: "高德地图", component: GaodeMap }];
</script>

<style scoped></style>
