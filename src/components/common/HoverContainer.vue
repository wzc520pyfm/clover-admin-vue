<template>
  <div v-if="showTooltip">
    <el-tooltip :placement="placement" :content="tooltipContent" trigger="hover">
      <div class="flex-center h-full cursor-pointer dark:hover:bg-[#333]" :class="contentClassName">
        <slot></slot>
      </div>
    </el-tooltip>
  </div>
  <div v-else class="flex-center cursor-pointer dark:hover:bg-[#333]" :class="contentClassName">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "HoverContainer" });

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: string;
  /** class类 */
  contentClass?: string;
  /** 是否处于反转模式 */
  inverted?: boolean;
}

const {
  tooltipContent = "",
  placement = "bottom",
  contentClass = "",
  inverted = false,
} = defineProps<Props>();

const showTooltip = computed(() => Boolean(tooltipContent));

const contentClassName = computed(
  () => `${contentClass} ${inverted ? "hover:bg-primary" : "hover:bg-[#f6f6f6]"}`
);
</script>

<style scoped></style>
