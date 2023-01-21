<template>
  <span>{{ value }}</span>
</template>

<script setup lang="ts">
import { TransitionPresets, useTransition } from "@vueuse/core";
import { isNumber } from "@/utils";
import type { Ref } from "vue";

defineOptions({ name: "CountTo" });

type TransitionType = keyof typeof TransitionPresets;

interface Props {
  /** 起始值 */
  startValue?: number;
  /** 结束值 */
  endValue?: number;
  /** 动画时长 */
  duration?: number;
  /** 自动播放 */
  autoplay?: number;
  /** 进制 */
  decimals?: number;
  /** 前缀 */
  prefix?: string;
  /** 后缀 */
  suffix?: string;
  /** 分割符号 */
  separator?: string;
  /** 小数点 */
  decimal?: string;
  /** 启用缓冲动画函数 */
  useEasing?: boolean;
  /** 缓冲动画函数的类型 */
  transition?: TransitionType;
}

const {
  startValue = 0,
  endValue = 2021,
  duration = 1500,
  autoplay = true,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  decimal = ".",
  useEasing = true,
  transition = "linear",
} = defineProps<Props>();

interface Emits {
  (e: "on-started"): void;
  (e: "on-finished"): void;
}

const emit = defineEmits<Emits>();

let source = $ref(startValue);
let outputValue = useTransition($$(source));
const value = computed(() => formatNumber(outputValue));
const disabled = ref(false);

function run() {
  outputValue = useTransition($$(source), {
    disabled,
    duration,
    onStarted: () => emit("on-started"),
    onFinished: () => emit("on-finished"),
    ...(useEasing ? { transition: TransitionPresets[transition] } : {}),
  });
}

function start() {
  run();
  source = endValue;
}

function formatNumber(num: number | string | Ref<number | string>) {
  const unrefNum = unref(num);
  if (!unrefNum) return "";

  let number = Number(unrefNum).toFixed(decimals);
  number = String(number);

  const x = number.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : "";
  const reg = /(\d+)(\d{3})/;
  if (separator && !isNumber(separator)) {
    while (reg.test(x1)) {
      x1 = x1.replace(reg, `$1${separator}$2`);
    }
  }
  return `${prefix}${x1}${x2}${suffix}`;
}

watch([() => startValue, () => endValue], () => {
  if (autoplay) {
    start();
  }
});

watchEffect(() => {
  source = startValue;
});

onMounted(() => {
  if (autoplay) {
    start();
  }
});
</script>

<style lang="less" scoped></style>
