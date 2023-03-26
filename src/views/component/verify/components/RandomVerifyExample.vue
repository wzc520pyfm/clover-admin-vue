<template>
  <div class="flex-center p-4">
    <random-num-verify />
    <random-num-verify
      :identify-code="code"
      :width="220"
      :height="56"
      :font-size-range="[32, 48]"
      @click="refreshCode"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "RandomVerifyExample" });

const CODE_CHAR_ARR = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "a",
  "b",
  "c",
  "d",
  "Q",
  "W",
  "E",
  "R",
  "鸡",
  "你",
  "太",
  "美",
  "帅",
  "酷",
  "坤",
];
let code = $ref<string>("鸡你太美");

const refreshCode = () => {
  code = [...CODE_CHAR_ARR]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .join("");
};
</script>

<style lang="less" scoped></style>
