<template>
  <div
    ref="wrapElRef"
    class="darg-verify"
    :style="getWrapStyleRef"
    @mousemove="handleDragMoving"
    @touchmove="handleDragMoving"
    @mouseleave="handleDragOver"
    @mouseup="handleDragOver"
    @touchend="handleDragOver"
  >
    <RenderBar />
    <RenderContent />
    <RenderAction />
  </div>
</template>

<script setup lang="tsx">
import { getSlot } from "@/utils";
import { Check, DArrowRight } from "@element-plus/icons-vue";
import { useEventListener } from "@vueuse/core";

export interface PassingData {
  isPassing: boolean;
  time: string;
}

defineOptions({ name: "DragVerify" });

interface Props {
  value?: boolean;
  isSlot?: boolean;
  width?: number | string;
  height?: number | string;
  circle: boolean;
  wrapStyle?: any;
  barStyle?: any;
  contentStyle?: any;
  actionStyle?: any;
  text?: string;
  successText?: string;
}
const {
  value = false,
  isSlot = false,
  width = 220,
  height = 40,
  circle = false,
  wrapStyle = {},
  barStyle = {},
  contentStyle = {},
  actionStyle = {},
  text = "请按住滑块拖动",
  successText = "验证通过",
} = defineProps<Props>();

const emit = defineEmits(["success", "update:value", "change", "start", "move", "end"]);

const slots = useSlots();
const state = reactive({
  isMoving: false,
  isPassing: false,
  moveDistance: 0,
  toLeft: false,
  startTime: 0,
  endTime: 0,
});

const wrapElRef = ref<HTMLDivElement>();
const barElRef = ref<HTMLDivElement>();
const contentElRef = ref<HTMLDivElement>();
const actionElRef = ref<HTMLDivElement>();

const getWrapStyleRef = computed(() => {
  const h = Number.parseInt(height as string);
  const w = `${Number.parseInt(width as string)}px`;
  return {
    width: w,
    height: `${h}px`,
    lineHeight: `${h}px`,
    borderRadius: circle ? `${h / 2}px` : 0,
    ...wrapStyle,
  };
});
const getBarStyleRef = computed(() => {
  const h = Number.parseInt(height as string);
  return {
    height: `${h}px`,
    borderRadius: circle ? `${h / 2}px 0 0 ${h / 2}px` : 0,
    ...barStyle,
  };
});
const getContentStyleRef = computed(() => {
  const h = `${Number.parseInt(height as string)}px`;
  const w = `${Number.parseInt(width as string)}px`;

  return {
    height: h,
    width: w,
    ...contentStyle,
  };
});
const getActionStyleRef = computed(() => {
  const h = `${Number.parseInt(height as string)}px`;
  return {
    left: 0,
    width: h,
    height: h,
    ...actionStyle,
  };
});

function getEventPageX(e: MouseEvent | TouchEvent) {
  return (e as MouseEvent).pageX || (e as TouchEvent).touches[0].pageX;
}
function handleDragStart(e: MouseEvent | TouchEvent) {
  if (state.isPassing) {
    return;
  }
  const actionEl = unref(actionElRef);
  if (!actionEl) return;
  emit("start", e);
  state.moveDistance =
    getEventPageX(e) - Number.parseInt(actionEl.style.left.replace("px", ""), 10);
  state.startTime = Date.now();
  state.isMoving = true;
}

function getOffset(el: HTMLDivElement) {
  const actionWidth = Number.parseInt(el.style.width);
  const widthNum = Number.parseInt(width as string);
  const offset = widthNum - actionWidth - 6;
  return { offset, widthNum, actionWidth };
}

function handleDragMoving(e: MouseEvent | TouchEvent) {
  const { isMoving, moveDistance } = state;
  if (isMoving) {
    const actionEl = unref(actionElRef);
    const barEl = unref(barElRef);
    if (!actionEl || !barEl) return;
    const { offset, widthNum, actionWidth } = getOffset(actionEl);
    const moveX = getEventPageX(e) - moveDistance;

    emit("move", {
      event: e,
      moveDistance,
      moveX,
    });
    if (moveX > 0 && moveX <= offset) {
      actionEl.style.left = `${moveX}px`;
      barEl.style.width = `${moveX + actionWidth / 2}px`;
    } else if (moveX > offset) {
      actionEl.style.left = `${widthNum - actionWidth}px`;
      barEl.style.width = `${widthNum - actionWidth / 2}px`;
      if (!isSlot) {
        checkPass();
      }
    }
  }
}

function checkPass() {
  if (isSlot) {
    resume();
    return;
  }
  state.endTime = Date.now();
  state.isPassing = true;
  state.isMoving = false;
}

function handleDragOver(e: MouseEvent | TouchEvent) {
  const { isMoving, isPassing, moveDistance } = state;
  if (isMoving && !isPassing) {
    emit("end", e);
    const actionEl = unref(actionElRef);
    const barEl = unref(barElRef);
    if (!actionEl || !barEl) return;
    const moveX = getEventPageX(e) - moveDistance;
    const { offset, widthNum, actionWidth } = getOffset(actionEl);
    if (moveX < offset) {
      if (!isSlot) {
        resume();
      } else {
        setTimeout(() => {
          if (!value) {
            resume();
          } else {
            const contentEl = unref(contentElRef);
            if (contentEl) {
              contentEl.style.width = `${Number.parseInt(barEl.style.width)}px`;
            }
          }
        }, 0);
      }
    } else {
      actionEl.style.left = `${widthNum - actionWidth}px`;
      barEl.style.width = `${widthNum - actionWidth / 2}px`;
      checkPass();
    }
    state.isMoving = false;
  }
}

function resume() {
  state.isMoving = false;
  state.isPassing = false;
  state.moveDistance = 0;
  state.toLeft = false;
  state.startTime = 0;
  state.endTime = 0;
  const actionEl = unref(actionElRef);
  const barEl = unref(barElRef);
  const contentEl = unref(contentElRef);
  if (!actionEl || !barEl || !contentEl) return;
  state.toLeft = true;
  setTimeout(() => {
    state.toLeft = false;
    actionEl.style.left = "0";
    barEl.style.width = "0";
    //  The time is consistent with the animation time
  }, 300);
  contentEl.style.width = unref(getContentStyleRef).width;
}

const RenderBar = () => {
  const cls = [`darg-verify-bar`];
  if (state.toLeft) {
    cls.push("to-left");
  }
  return <div class={cls} ref={barElRef} style={unref(getBarStyleRef)} />;
};

const RenderContent = () => {
  const cls = [`darg-verify-content`];
  const { isPassing } = state;

  isPassing && cls.push("success");

  return (
    <div class={cls} ref={contentElRef} style={unref(getContentStyleRef)}>
      {getSlot(slots, "text", isPassing) || (isPassing ? successText : text)}
    </div>
  );
};

const RenderAction = () => {
  const cls = [`darg-verify-action`];
  const { toLeft, isPassing } = state;
  if (toLeft) {
    cls.push("to-left");
  }

  return (
    <div
      class={cls}
      ref={actionElRef}
      onMousedown={handleDragStart}
      onTouchstart={handleDragStart}
      style={unref(getActionStyleRef)}
    >
      {getSlot(slots, "actionIcon", isPassing) ||
        (isPassing ? (
          <el-icon>
            <Check class={`darg-verify-action__icon`} />
          </el-icon>
        ) : (
          <el-icon>
            <DArrowRight class={`darg-verify-action__icon`} />
          </el-icon>
        ))}
    </div>
  );
};

watch(
  () => state.isPassing,
  (isPassing) => {
    if (isPassing) {
      const { startTime, endTime } = state;
      const time = (endTime - startTime) / 1000;
      console.log("time", time);
      emit("success", { isPassing, time: time.toFixed(1) });
      emit("update:value", isPassing);
      emit("change", isPassing);
    }
  }
);

watchEffect(() => {
  state.isPassing = Boolean(value);
});

useEventListener(document, "mouseup", () => {
  if (state.isMoving) {
    resume();
  }
});

defineExpose({
  resume,
});
</script>

<style lang="less" scoped>
@radius: 4px;
@success-color: #67c23a;

.darg-verify {
  position: relative;
  overflow: hidden;
  text-align: center;
  background-color: rgb(238 238 238);
  border: 1px solid #ddd;
  border-radius: @radius;
  &-bar {
    position: absolute;
    width: 0;
    height: 36px;
    background-color: @success-color;
    border-radius: @radius;

    &.to-left {
      width: 0 !important;
      transition: width 0.3s;
    }
  }
  &-content {
    position: absolute;
    top: 0;
    font-size: 12px;
    text-size-adjust: none;
    background-color: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, #333),
      color-stop(0.4, #333),
      color-stop(0.5, #fff),
      color-stop(0.6, #333),
      color-stop(1, #333)
    );
    animation: slidetounlock 3s infinite;
    background-clip: text;
    user-select: none;

    &.success {
      -webkit-text-fill-color: #fff;
    }

    & > * {
      -webkit-text-fill-color: #333;
    }
  }

  &-action {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    cursor: move;
    background-color: #fff;
    border-radius: @radius;
    justify-content: center;
    align-items: center;

    &__icon {
      cursor: inherit;
    }

    &.to-left {
      left: 0 !important;
      transition: left 0.3s;
    }
  }
}

@keyframes slidetounlock {
  0% {
    background-position: -120px 0;
  }

  100% {
    background-position: 120px 0;
  }
}
</style>
