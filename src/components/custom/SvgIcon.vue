<template>
  <template v-if="renderLocalIcon">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </template>
  <template v-else>
    <Icon :icon="icon" v-bind="bindAttrs" />
  </template>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineOptions({ name: "SvgIcon" });

interface Props {
  /** iconify图标名称 */
  icon?: string;
  /** 本地svg的文件名 */
  localIcon?: string;
}

const { icon, localIcon } = defineProps<Props>();

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) ?? "",
  style: (attrs.style as string) ?? "",
}));

const symbolId = computed(() => {
  const preffix = "icon-local";

  const defaultLocalIcon = "";

  const icon = localIcon ?? defaultLocalIcon;

  return `#${preffix}-${icon}`;
});

const renderLocalIcon = computed(() => localIcon || !icon);
</script>

<style lang="less" scoped></style>
