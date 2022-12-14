<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

defineOptions({ name: "ElementProvider" });

// TODO: 这是一个老但稳定的loadingBar, 暂时先使用它, 后续再重写
// see: https://www.npmjs.com/package/nprogress
NProgress.configure({ showSpinner: false }); // NProgress Configuration

/** 挂载常用组件至window, 以便在钩子函数和请求函数里面调用 */
function registerTools() {
  window.$loadingBar = NProgress;
}
registerTools();
</script>

<style scoped></style>
