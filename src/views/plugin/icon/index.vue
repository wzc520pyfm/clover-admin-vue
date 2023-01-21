<template>
  <div class="h-full">
    <el-card class="h-full" header="图标使用示例">
      <el-space direction="vertical" alignment="normal" class="w-full">
        <div>
          <h3>element图标集</h3>
          <i-ep-full-screen />
        </div>
        <div>
          <h3>element图标(定义样式)</h3>
          <el-icon class="text-22px vertical-middle dark:text-dark_info"
            ><i-ep-full-screen
          /></el-icon>
        </div>
        <div>
          <h3>iconify的mdi图标集</h3>
          <i-mdi-github class="text-22px dark:text-dark_info" />
        </div>
        <div>
          <h3>本地图标</h3>
          <i-local-link-icon />
        </div>
        <div>
          <h3>iconify图标(动态渲染)</h3>
          <svg-icon icon="mdi-github" />
        </div>
        <div>
          <h3>本地图标(动态渲染)</h3>
          <svg-icon local-icon="link-icon" />
        </div>
      </el-space>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PluginIcon" });
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
