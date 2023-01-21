import type { ComputedRef, Ref } from "vue";
import * as echarts from "echarts/core";
import { LineChart, PieChart } from "echarts/charts";
import type { LineSeriesOption, PieSeriesOption } from "echarts/charts";
import type { GridComponentOption, TooltipComponentOption } from "echarts/components";
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useElementSize } from "@vueuse/core";
import { useThemeStore } from "@/stores";

export type ECOption = echarts.ComposeOption<
  LineSeriesOption | PieSeriesOption | TooltipComponentOption | GridComponentOption
>;

echarts.use([
  TooltipComponent,
  GridComponent,
  LineChart,
  PieChart,
  ToolboxComponent,
  LegendComponent,
  CanvasRenderer,
  LabelLayout,
]);

/**
 * ECharts hooks
 * @param options - 图表配置
 * @param renderFun - 图表渲染函数(图表渲染时执行的函数)
 * @description 按需引入图标组件, 使用图表组件前需确保已引入
 */
export function useECharts(
  options: Ref<ECOption> | ComputedRef<ECOption>,
  renderFun?: (chartInstance: echarts.ECharts) => void
) {
  const { isDark } = $(useThemeStore());

  const domRef = $ref<HTMLElement>();

  const initialSize = { width: 0, height: 0 };
  const { width, height } = useElementSize($$(domRef), initialSize);

  let chart: UT.Nullable<echarts.ECharts> = null;

  function canRender() {
    return initialSize.width > 0 && initialSize.height > 0;
  }

  function isRendered() {
    return Boolean(domRef && chart);
  }

  function update(updateOptions: ECOption | Ref<ECOption>) {
    const unrefUpdateOptions = unref(updateOptions);
    if (isRendered()) {
      chart!.setOption({ ...unrefUpdateOptions, backgroundColor: "transparent" });
    }
  }

  async function render() {
    if (domRef) {
      const chartTheme = isDark ? "dark" : "light";
      await nextTick();
      chart = echarts.init(domRef, chartTheme);
      if (renderFun) {
        renderFun(chart);
      }
      update(options);
    }
  }

  function resize() {
    chart?.resize();
  }

  function destroy() {
    chart?.dispose();
  }

  function updateTheme() {
    destroy();
    render();
  }

  const stopSizeWatch = watch([width, height], ([newWidth, newHeight]) => {
    initialSize.width = newWidth;
    initialSize.height = newHeight;
    if (newWidth === 0 && newHeight === 0) {
      // 节点被删除, 置空chart
      chart = null;
    }
    if (canRender()) {
      if (!isRendered()) {
        render();
      } else {
        resize();
      }
    }
  });

  const stopOptionWatch = watch(options, (newValue) => update(newValue));

  const stopDarkModeWatch = watch(
    () => isDark,
    () => updateTheme()
  );

  onMounted(() => {
    render();
  });

  onUnmounted(() => {
    destroy();
    stopSizeWatch();
    stopOptionWatch();
    stopDarkModeWatch();
  });

  return $$({
    domRef,
  });
}
