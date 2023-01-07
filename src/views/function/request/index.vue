<template>
  <div class="h-full">
    <el-card class="h-full" header="网络请求">
      <el-tooltip content="向不存在的资源发起请求">
        <el-button type="danger" @click="request404">请求404</el-button></el-tooltip
      >
      <el-tooltip content="向接口发起请求, 获取其数据中的data">
        <el-button type="primary" @click="requestData">获取响应数据data</el-button></el-tooltip
      >
      <el-tooltip content="向接口发起请求, 但此接口返回的数据不包含data, clover会自动为其补充">
        <el-button type="warning" @click="requestNoData">自动补充data</el-button></el-tooltip
      >
      <el-tooltip content="向接口发起请求, 获取响应头">
        <el-button type="warning" @click="requestHeaders">获取响应头</el-button></el-tooltip
      >
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { fetch404, fetchExampleData, fetchExampleNoData, fetchExampleHeaders } from "@/service";

const request404 = async () => {
  await fetch404();
};

const requestData = async () => {
  const { data } = await fetchExampleData();
  if (data) {
    console.log("data", data);
  }
};

const requestNoData = async () => {
  const { data } = await fetchExampleNoData();
  console.log("responseData", data);
  if (data) {
    window.$message.success("获取成功");
  }
};

const requestHeaders = async () => {
  const { data, headers } = await fetchExampleHeaders();
  console.log("responseData", data);

  console.log("responseHeaders", headers);
};
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
