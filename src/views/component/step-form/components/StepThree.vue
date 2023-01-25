<template>
  <div>
    <el-form-item label="Do you like basketball?">
      <el-select v-model="person.isLikeBasketball" placeholder="Do you like basketball?">
        <el-option label="I like!" :value="true" />
        <el-option label="I don't like!" :value="false" />
      </el-select>
    </el-form-item>
    <el-button @click="addStep">我选好了!</el-button>
  </div>
</template>

<script setup lang="ts">
import { useStepFormContext } from "@/context";

defineOptions({ name: "StepThree" });

const { useInject } = useStepFormContext();
const { person, addStep } = useInject();
</script>

<style lang="less" scoped></style>
