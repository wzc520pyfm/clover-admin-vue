<script setup lang="ts">
import { useGlobalEvents } from "@/composables";

useGlobalEvents();

// 捕获错误
onErrorCaptured((err, instance, info) => {
  console.log("[errorCaptured]", err, instance, info);
  return false; // 终止传播
});
</script>

<template>
  <el-config-provider>
    <ElementProvider>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <!-- 主要内容 -->
            <component :is="Component" />

            <!-- 加载中状态 -->
            <template #fallback>
              <Loading />
            </template>
          </Suspense>
        </template>
      </RouterView>
    </ElementProvider>
  </el-config-provider>
</template>

<style scoped></style>
