<template>
  <div class="h-full">
    <el-card class="h-full">这是只属于super管理员的秘密!</el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "AuthDemoSuper" });
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
