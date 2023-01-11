<template>
  <p>
    <span>{{ label }}</span>
    <el-link type="primary" :href="link" :target="isBlank ? '_blank' : '_self'"
      >{{ link }}<i-local-link-icon v-if="isBlank" ml-1
    /></el-link>
  </p>
</template>

<script lang="ts" setup>
defineOptions({ name: "WebSiteLink" });

interface Props {
  /** 网址名称 */
  label: string;
  /** 网址链接 */
  link: string;
  /** 是否外链 */
  isBlank?: Boolean;
}

const { isBlank = true } = defineProps<Props>();
</script>

<style lang="less" scoped></style>
