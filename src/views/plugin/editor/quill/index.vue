<template>
  <div class="w-full pb-5">
    <el-card class="w-full" header="富文本插件">
      <github-link link="https://github.com/wangeditor-team/wangEditor" />
      <div ref="domRef" mt-10px />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import WangEditor from "wangeditor";

defineOptions({ name: "PluginEditorQuill" });

let editor = $ref<WangEditor>();
const domRef = $ref<HTMLElement>();

function renderWangEditor() {
  editor = new WangEditor(domRef);
  setEditorConfig();
  editor.create();
}

function setEditorConfig() {
  if (editor?.config?.zIndex) {
    editor.config.zIndex = 10;
  }
}

onMounted(() => renderWangEditor());
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
