<template>
  <div class="flex-col-center wh-full">
    <div>
      <el-icon v-if="type === '403'" :size="400"><icon-local-403 /></el-icon>
      <el-icon v-if="type === '404'" :size="400"><icon-local-404 /></el-icon>
      <el-icon v-if="type === '500'" :size="400"><icon-local-500 /></el-icon>
    </div>
    <router-link :to="routeHomePath" class="flex-center">
      <el-button type="primary">回到首页</el-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "ExceptionBase" });

type ExceptionType = "403" | "404" | "500";

type Props = {
  type: ExceptionType;
};

defineProps<Props>();

const routeHomePath = "/home";
</script>

<style scoped></style>
