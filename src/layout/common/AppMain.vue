<template>
  <div
    ref="el"
    class="app-main overflow-auto wh-full p-5"
    :style="{ backgroundColor: COLORS.GREEN }"
  >
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" :appear="true">
        <KeepAlive>
          <component :is="Component" :key="route.fullPath"></component>
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "GlobalMain" });

const COLORS = {
  BLUE: "#f6f9ff",
  GREEN: "#f8fafb",
};
</script>

<style scoped></style>
