<template>
  <div class="min-h-full">
    <el-card class="h-full" header="视频播放插件">
      <github-link link="https://github.com/bytedance/xgplayer" />
      <div ref="domRef" mt-10px />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Player from "xgplayer";

defineOptions({ name: "PluginVideo" });

const domRef = $ref<HTMLElement>();
let player = $ref<Player>();

function renderXgPlayer() {
  if (!domRef) return;
  const url =
    "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4";
  player = new Player({
    el: domRef,
    url,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
  });
}

function destroyXgPlayer() {
  player?.destroy();
}

onMounted(() => renderXgPlayer());

onUnmounted(() => destroyXgPlayer());
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
