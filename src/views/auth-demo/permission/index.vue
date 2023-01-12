<template>
  <div class="h-full">
    <el-card class="h-full">
      <el-button type="primary">所有用户可见</el-button>
      <el-button v-permission="'super'" type="primary">管理员可见</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "AuthPermission" });
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
