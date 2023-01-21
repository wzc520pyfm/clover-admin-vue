<template>
  <div class="p-16px rounded-8px text-white" :style="{ backgroundImage: gradientStyle }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "GradientBg" });

interface Props {
  /** 渐变开始颜色 */
  startColor?: string;
  /** 渐变结束颜色 */
  endColor?: string;
}

const { startColor = "#56cdf3", endColor = "#719de3" } = defineProps<Props>();

const gradientStyle = computed(() => `linear-gradient(to right, ${startColor}, ${endColor})`);
</script>

<style lang="less" scoped></style>
