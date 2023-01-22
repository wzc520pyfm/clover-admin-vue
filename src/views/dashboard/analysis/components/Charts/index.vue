<template>
  <div class="wh-full flex gap-5" size="large">
    <el-card header="statistics" class="flex-1">
      <div ref="lineRef" class="h-400px" />
    </el-card>
    <el-card header="Customer Feedback">
      <div ref="pieRef" class="wh-450px" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { type ECOption, useECharts } from "@/composables";

defineOptions({ name: "DashboardAnalysisCharts" });

const lineOptions = ref<ECOption>({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["下载量", "注册数"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "24:00",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      color: "#8e9dff",
      name: "下载量",
      type: "line",
      smooth: true,
      stack: "Total",
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: "#8e9dff",
            },
            {
              offset: 1,
              color: "#fff",
            },
          ],
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311],
    },
    {
      color: "#26deca",
      name: "注册数",
      type: "line",
      smooth: true,
      stack: "Total",
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: "#26deca",
            },
            {
              offset: 1,
              color: "#fff",
            },
          ],
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678],
    },
  ],
});
const { domRef: lineRef } = useECharts(lineOptions);

const pieOptions = ref<ECOption>({
  tooltip: {
    trigger: "item",
  },
  legend: {
    bottom: "1%",
    left: "center",
    itemStyle: {
      borderWidth: 0,
    },
  },
  series: [
    {
      color: ["#3e9aff", "#82c2fd"],
      name: "Sales proportion",
      type: "pie",
      radius: ["45%", "75%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "36",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 565, name: "cosmetics" },
        { value: 89, name: "computer" },
      ],
    },
  ],
});
const { domRef: pieRef } = useECharts(pieOptions);
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
  #ep.el-card-no-divider();
  #ep.el-card-header-bold();
}
</style>
