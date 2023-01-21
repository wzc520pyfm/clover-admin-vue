<template>
  <div class="h-full">
    <el-card>
      <div ref="pieRef" class="h-400px" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { type ECOption, useECharts } from "@/composables";

defineOptions({ name: "PluginEcharts" });

const pieOptions = ref<ECOption>({
  legend: {},
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      radius: [50, 150],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: "rose 1" },
        { value: 38, name: "rose 2" },
        { value: 32, name: "rose 3" },
        { value: 30, name: "rose 4" },
        { value: 28, name: "rose 5" },
        { value: 26, name: "rose 6" },
        { value: 22, name: "rose 7" },
        { value: 18, name: "rose 8" },
      ],
    },
  ],
});
const { domRef: pieRef } = useECharts(pieOptions);
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
