<template>
  <div class="min-h-500px w-full">
    <el-card class="h-full">
      <el-tabs model-value="home" stretch class="h-full flex-col">
        <el-tab-pane v-for="item in statisticsTables" :key="item.id" class="h-full" :name="item.id">
          <template #label>
            <span>
              <svg-icon class="vertical-sub text-18px" :icon="item.icon" />
              <span class="pl-15px">{{ item.label }}</span>
            </span>
          </template>
          <div class="h-full">
            <component :is="item.component" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { HomeTable } from "./components";

defineOptions({ name: "DashboardAnalysisBottomPart" });

interface StatisticsTable {
  id: string;
  icon: string;
  label: string;
  component: Component;
}

const statisticsTables: Array<StatisticsTable> = [
  { id: "home", icon: "ep-home-filled", label: "Home", component: HomeTable },
  { id: "security", icon: "ep-key", label: "Security", component: HomeTable },
  { id: "entertainment", icon: "ep-video-play", label: "Entertainment", component: HomeTable },
  { id: "big-data", icon: "ep-coin", label: "Big Data", component: HomeTable },
];
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
