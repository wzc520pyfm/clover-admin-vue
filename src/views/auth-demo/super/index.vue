<template>
  <div class="h-full">
    <el-card class="h-full shadow-sm rounded-16px">这是只属于super管理员的秘密!</el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.el-card {
  --el-box-shadow-lightest: 0px 1px 5px rgba(0, 0, 0, 0.05);
  border: 0px;
  box-shadow: var(--el-box-shadow-lightest);
  border-radius: 20px;
}
</style>
