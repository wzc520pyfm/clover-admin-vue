<template>
  <div class="flex-center p-4">
    <drag-verify ref="el1" @success="handleSuccess" />
    <el-button type="primary" class="ml-2" @click="handleBtnClick(el1)">还原</el-button>
  </div>
  <div class="flex-center p-4">
    <drag-verify ref="el2" circle @success="handleSuccess" />
    <el-button type="primary" class="ml-2" @click="handleBtnClick(el2)">还原</el-button>
  </div>
  <div class="flex-center p-4">
    <drag-verify
      ref="el3"
      text="拖动以进行校验"
      success-text="校验成功"
      :bar-style="{
        backgroundColor: '#018ffb',
      }"
      @success="handleSuccess"
    />
    <el-button type="primary" class="ml-2" @click="handleBtnClick(el3)">还原</el-button>
  </div>
  <div class="flex-center p-4">
    <drag-verify ref="el4" circle @success="handleSuccess">
      <template #actionIcon="isPassing">
        <el-icon v-if="isPassing"><i-ep-check class="dark:text-dark" /></el-icon>
        <el-icon v-else><i-ep-grape class="dark:text-dark" /></el-icon>
      </template>
    </drag-verify>
    <el-button type="primary" class="ml-2" @click="handleBtnClick(el4)">还原</el-button>
  </div>
  <div class="flex-center p-4">
    <drag-verify ref="el5" @success="handleSuccess">
      <template #text="isPassing">
        <div v-if="isPassing">
          <el-icon><i-ep-check /></el-icon>
          成功
        </div>
        <div v-else>
          拖动
          <el-icon><i-ep-grape /></el-icon>
        </div>
      </template>
    </drag-verify>
    <el-button type="primary" class="ml-2" @click="handleBtnClick(el5)">还原</el-button>
  </div>
</template>

<script setup lang="ts">
import type { PassingData } from "@/components/business/DragVerify.vue";

defineOptions({ name: "DragVerifyExample" });

const el1 = ref<UT.Nullable<Expose.DragVerify>>(null);
const el2 = ref<UT.Nullable<Expose.DragVerify>>(null);
const el3 = ref<UT.Nullable<Expose.DragVerify>>(null);
const el4 = ref<UT.Nullable<Expose.DragVerify>>(null);
const el5 = ref<UT.Nullable<Expose.DragVerify>>(null);

function handleSuccess(data: PassingData) {
  const { time } = data;
  window.$message?.success(`校验成功,耗时${time}秒`);
}

function handleBtnClick(elRef: UT.Nullable<Expose.DragVerify>) {
  if (!elRef) {
    return;
  }
  elRef.resume();
}
</script>

<style lang="less" scoped></style>
