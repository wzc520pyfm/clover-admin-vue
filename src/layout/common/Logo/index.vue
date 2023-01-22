<template>
  <router-link :to="routeHomePath" class="flex-center">
    <el-icon :size="32"><IconLogo /></el-icon>
    <h2 v-show="showTitle" class="pl-5px c-#1890ff text-16px font-bold break-keep">
      Clover管理系统
    </h2>
  </router-link>
</template>

<script lang="ts" setup>
import IconLogo from "@/components/icons/IconLogo.vue";

defineOptions({ name: "GlobalLogo" });

interface Props {
  /** 显示名字 */
  showTitle: boolean;
}

defineProps<Props>();

const routeHomePath = "/";
</script>

<style scoped></style>
