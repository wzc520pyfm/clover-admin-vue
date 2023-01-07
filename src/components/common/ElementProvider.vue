<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import NProgress from "nprogress"; // progress bar

defineOptions({ name: "ElementProvider" });

// 获取vue实例(在某些时候你可能需要访问它)
const vm = getCurrentInstance()!;
// 获取vue实例上自定义的property
// const { $message } = vm.appContext.config.globalProperties;

// TODO: 这是一个老但稳定的loadingBar, 暂时先使用它, 后续再重写
// see: https://www.npmjs.com/package/nprogress
NProgress.configure({ showSpinner: false }); // NProgress Configuration

/** 挂载常用组件至window, 以便在钩子函数和请求函数里面调用 */
function registerTools() {
  window.$loadingBar = NProgress;
  window.$message = ElMessage;
}
registerTools();
</script>

<style scoped></style>
