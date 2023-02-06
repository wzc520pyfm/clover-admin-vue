<template>
  <div class="w-full pb-5">
    <el-card class="w-full" header="markdown插件">
      <github-link link="https://github.com/Vanessa219/vditor" />
      <div ref="domRef" mt-10px />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Vditor from "vditor";
import "vditor/dist/index.css";
import { useThemeStore } from "@/stores";

defineOptions({ name: "PluginEditorMarkdown" });

const { isDark } = $(useThemeStore());
let vditor = $ref<Vditor>();
const domRef = $ref<HTMLElement>();

function renderVditor() {
  if (!domRef) return;
  vditor = new Vditor(domRef, {
    minHeight: 400,
    theme: isDark ? "dark" : "classic",
    icon: "material",
    cache: { enable: false },
  });
}

const stopHandle = watch(
  () => isDark,
  (newValue) => {
    const themeMode = newValue ? "dark" : "classic";
    vditor?.setTheme(themeMode);
  }
);

onMounted(() => renderVditor());

onUnmounted(() => stopHandle());
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
