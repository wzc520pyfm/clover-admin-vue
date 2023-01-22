<template>
  <div class="h-full">
    <div class="flex gap-5">
      <div v-for="item in cardData" :key="item.id" class="flex-1">
        <gradient-bg
          class="card-layout h-120px"
          :start-color="item.colors[0]"
          :end-color="item.colors[1]"
        >
          <span style="grid-area: title" class="text-14px font-bold">{{ item.title }}</span>
          <div style="grid-area: blank" />
          <div style="grid-area: icon" class="flex-y-center">
            <svg-icon :icon="item.icon" class="text-24px" />
          </div>
          <count-to
            style="grid-area: number"
            :prefix="item.numberPrefix"
            :start-value="1"
            :end-value="item.number"
            class="flex-x-end text-26px text-white font-bold dark:text-dark"
          />
          <span style="grid-area: secondary-title" class="text-14px">{{
            item.secondaryTitle
          }}</span>
          <span style="grid-area: secondary-number" class="flex-x-end text-16px">{{
            item.secondaryNumber
          }}</span>
        </gradient-bg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GradientBg } from "./components";

defineOptions({ name: "DashboardAnalysisDataCard" });

interface CardData {
  id: string;
  title: string;
  numberPrefix: string;
  number: number;
  secondaryTitle: string;
  secondaryNumber: number | string;
  colors: [string, string];
  icon: string;
}

const cardData: CardData[] = [
  {
    id: "order",
    title: "Orders Received",
    numberPrefix: "",
    number: 486,
    secondaryTitle: "Completed Orders",
    secondaryNumber: 351,
    colors: ["#449dff", "#66afff"],
    icon: "ep-goods",
  },
  {
    id: "soles",
    title: "Total Soles",
    numberPrefix: "",
    number: 1641,
    secondaryTitle: "This Month",
    secondaryNumber: 213,
    colors: ["#3bdbbc", "#55e0c5"],
    icon: "ep-discount",
  },
  {
    id: "revenue",
    title: "Revenue",
    numberPrefix: "$",
    number: 42562,
    secondaryTitle: "This Month",
    secondaryNumber: "$5,032",
    colors: ["#feb649", "#ffc874"],
    icon: "ep-refresh",
  },
  {
    id: "profit",
    title: "Total Profit",
    numberPrefix: "$",
    number: 9562,
    secondaryTitle: "This Month",
    secondaryNumber: "$542",
    colors: ["#ff5170", "#ff7b91"],
    icon: "ep-wallet",
  },
];
</script>

<style lang="less" scoped>
.card-layout {
  display: grid;
  grid-template:
    "title           blank           "
    "icon            number          "
    "secondary-title secondary-number";
}
</style>
