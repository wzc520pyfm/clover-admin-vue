<template>
  <div class="h-full">
    <el-card class="h-full" header="文本复制">
      <el-input v-model="inputValue" placeholder="Please input">
        <template #prepend>
          <el-select v-model="copyType" placeholder="Select" style="width: 130px">
            <el-option label="函数调用形式" value="method" />
            <el-option label="指令形式" value="directive" />
          </el-select>
        </template>
        <template #append>
          <el-button
            v-if="copyType === 'directive'"
            v-clipboard="inputValue"
            :icon="CopyDocument"
          />
          <el-button v-else :icon="CopyDocument" @click="handleCopy" />
        </template>
      </el-input>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CopyDocument } from "@element-plus/icons-vue";
import { useClipboard } from "@vueuse/core";

defineOptions({ name: "PluginClipboard" });

const inputValue = $ref("");
const copyType = $ref("method");
const { copy, isSupported } = useClipboard();

function handleCopy() {
  if (copyType === "method") {
    methodCopy();
  }
}

function methodCopy() {
  if (!isSupported) {
    window.$message?.error("您的浏览器不支持Clipboard API!");
    return;
  }
  if (!inputValue) {
    window.$message?.warning("请输入要复制的内容");
    return;
  }
  copy(inputValue);
  window.$message?.success(`复制成功: ${inputValue}`);
}
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
