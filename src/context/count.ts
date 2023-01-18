import { useContext } from "@/hooks";
import type { Ref } from "vue";

interface CountContext {
  counts: Ref<number>;
  setCounts: (count: number) => void;
}

const { useProvide: useCountProvide, useInject: useCountInject } = useContext<CountContext>();

export function useCountContext() {
  let counts = $ref(0);

  function setCounts(count: number) {
    counts = count;
  }

  const countContext: CountContext = {
    counts: $$(counts),
    setCounts,
  };

  function useProvide() {
    return useCountProvide(countContext);
  }

  return {
    useProvide,
    useInject: useCountInject,
  };
}

/**
 * 此示例展示了如何在组件间共享上下文:
 * A.vue为父组件, B.vue为子孙组件, C.vue为子孙组件
 *
 * A.vue
 * import { useCountContext } from "@/context";
 * const { useProvide } = useCountContext();
 * const { counts, setCounts } = useProvide();
 *
 * B.vue和C.vue : 共享counts
 * import { useCountContext } from "@/context";
 * const { useInject } = useCountContext();
 * const { counts, setCounts } = useInject();
 */
