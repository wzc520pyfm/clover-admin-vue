<template>
  <div>
    <el-form-item label="How old are you?">
      <el-input-number v-model="person.age" :min="1" :max="120" />
    </el-form-item>
    <el-button @click="addStep">告诉你了!</el-button>
  </div>
</template>

<script setup lang="ts">
import { useStepFormContext } from "@/context";

defineOptions({ name: "StepTwo" });

const { useInject } = useStepFormContext();
const { person, addStep } = useInject();
</script>

<style lang="less" scoped></style>
