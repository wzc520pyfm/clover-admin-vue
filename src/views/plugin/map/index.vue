<template>
  <div class="h-full">
    <el-card class="h-full flex-col">
      <template #header>
        <div class="card-header">
          <span>地图插件</span>
        </div>
      </template>
      <el-tabs model-value="gaode" class="h-full flex-col">
        <el-tab-pane
          class="h-full"
          v-for="item in maps"
          :key="item.id"
          :label="item.label"
          :name="item.id"
        >
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

defineOptions({ name: "PluginMap" });

interface Map {
  id: string;
  label: string;
  component: Component;
}

const maps: Array<Map> = [
  { id: "gaode", label: "高德地图", component: GaodeMap },
  { id: "baidu", label: "百度地图", component: BaiduMap },
];

onMounted(() => console.log("地图加载了"));
onActivated(() => console.log("地图活了"));
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
:deep(.el-card__body),
:deep(.el-tabs__content) {
  flex: 1;
}
</style>
