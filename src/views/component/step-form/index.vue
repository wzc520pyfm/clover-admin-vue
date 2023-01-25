<template>
  <div class="wh-full">
    <el-card
      class="wh-full"
      header="跨组件共享状态的分步表单可使用pinia维护状态, 但为他们创建一个上下文来维护状态也不失为一种解决方案。"
    >
      <el-steps class="mb-10" :active="step" finish-status="success">
        <el-step title="Step 1" />
        <el-step title="Step 2" />
        <el-step title="Step 3" />
        <el-step title="Step 4" />
      </el-steps>
      <Transition name="fade" mode="out-in" :appear="true">
        <component :is="StepComponents[step]" />
      </Transition>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useStepFormContext } from "@/context";
import { StepFour, StepOne, StepThree, StepTwo } from "./components";

defineOptions({ name: "ComponentStepForm" });

const { useProvide } = useStepFormContext();
const { step } = useProvide();

const StepComponents = [StepOne, StepTwo, StepThree, StepFour];
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
