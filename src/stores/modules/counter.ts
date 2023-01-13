import { computed, ref } from "vue";
import { defineStore } from "pinia";

// 一个pinia最基础的使用示例
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
