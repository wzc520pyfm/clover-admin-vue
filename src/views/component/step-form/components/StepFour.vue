<template>
  <div class="wh-full">
    <h3 class="text-center m-3">Good! You made your choice!</h3>
    <el-form :model="person" label-width="240px" disabled>
      <el-form-item label="What's your name?">
        <el-input v-model="person.name" placeholder="What's your name?" />
      </el-form-item>
      <el-form-item label="How old are you?">
        <el-input-number v-model="person.age" :min="1" :max="120" />
      </el-form-item>
      <el-form-item label="Do you like basketball?">
        <el-select v-model="person.isLikeBasketball" placeholder="Do you like basketball?">
          <el-option label="I like!" :value="true" />
          <el-option label="I don't like!" :value="false" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useStepFormContext } from "@/context";

defineOptions({ name: "StepFour" });

const { useInject } = useStepFormContext();
const { person } = useInject();
</script>

<style lang="less" scoped></style>
