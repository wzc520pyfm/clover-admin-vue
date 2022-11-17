<template>
  <div class="h-full">
    <el-card class="box-card h-full flex-col">
      <template #header>
        <div class="card-header">
          <span>地图插件</span>
        </div>
      </template>
      <el-tabs model-value="gaode" class="demo-tabs h-full flex-col">
        <el-tab-pane v-for="item in maps" :key="item.id" :label="item.label" :name="item.id">
          <div class="h-full">
            <component :is="item.component" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from "vue";
import { GaodeMap, BaiduMap } from "./components";

interface Map {
  id: string;
  label: string;
  component: Component;
}

const maps: Array<Map> = [
  { id: "gaode", label: "高德地图", component: GaodeMap },
  { id: "baidu", label: "百度地图", component: BaiduMap },
];
</script>

<style scoped>
.el-card >>> .el-card__body, .el-tabs >>> .el-tabs__content {
  flex: 1;
}
</style>
