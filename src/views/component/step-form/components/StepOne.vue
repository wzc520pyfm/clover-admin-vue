<template>
  <div>
    <el-form-item label="What's your name?">
      <el-input v-model="person.name" placeholder="What's your name?" />
    </el-form-item>
    <el-button @click="addStep">OK!</el-button>
  </div>
</template>

<script setup lang="ts">
import { useStepFormContext } from "@/context";

defineOptions({ name: "StepOne" });

const { useInject } = useStepFormContext();
const { person, addStep } = useInject();
</script>

<style lang="less" scoped></style>
