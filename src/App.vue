<script setup lang="ts">
// 捕获错误
onErrorCaptured(function(err, instance, info){
  console.log('[errorCaptured]', err, instance, info)
  return false; // 终止传播
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- 主要内容 -->
            <component :is="Component"></component>

            <!-- 加载中状态 -->
            <template #fallback> 正在加载... </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<style scoped>

</style>
