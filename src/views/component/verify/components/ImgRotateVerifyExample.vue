<template>
  <div class="flex-center p-4">
    <img-rotate-verify ref="el" :src="img" @success="handleSuccess" />
  </div>
  <div class="flex-center p-4">
    <img-rotate-verify ref="e2" :src="img" clip-circle @success="handleSuccess" />
  </div>
</template>

<script setup lang="ts">
import img from "@/assets/images/example.png";

defineOptions({ name: "ImgRotateVerifyExample" });

const handleSuccess = () => {
  console.log("success!");
};
</script>

<style lang="less" scoped></style>
