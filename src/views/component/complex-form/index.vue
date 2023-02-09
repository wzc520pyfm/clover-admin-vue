<template>
  <div class="min-h-full">
    <el-card class="h-full" header="复杂表单示例">
      <el-space w-full direction="vertical" size="large" fill>
        <BaseValidatorForm />
        <CustomValidatorForm />
        <ResponsibilityValidatorForm />
      </el-space>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { BaseValidatorForm, CustomValidatorForm, ResponsibilityValidatorForm } from "./components";

defineOptions({ name: "ComponentComplexForm" });
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
