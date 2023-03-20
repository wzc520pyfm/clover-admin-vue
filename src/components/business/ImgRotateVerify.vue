<template>
  <div class="ir-verify">
    <div class="ir-verify-img__wrap" :style="getImgWrapStyleRef">
      <img
        :class="{ 'to-origin': state.toOrigin }"
        :src="src"
        :width="Number.parseInt(width as string)"
        :style="{ ...state.imgStyle, clipPath: clipCircle ? `circle(${clipSize} at 50% 50%)` : '' }"
        alt="verify"
        @load="handleImgOnLoad"
        @click="resume"
      />
      <span
        v-if="state.showTip"
        :class="['ir-verify-img__tip', state.isPassing ? 'success' : 'error']"
        >{{ state.isPassing ? `验证校验成功,耗时${time.toFixed(1)}秒！` : `验证失败！` }}</span
      >
      <span v-else-if="!state.draged" class="ir-verify-img__tip normal">{{
        `点击图片可刷新`
      }}</span>
    </div>
    <DragVerify
      ref="dragRef"
      class="ir-verify-drag__bar"
      v-bind="attrs"
      :value="state.isPassing"
      is-slot
      @move="handleDragBarMove"
      @end="handleDragEnd"
      @start="handleStart"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTimeoutFn } from "@vueuse/core";
import DragVerify from "./DragVerify.vue";

export interface MoveData {
  event: MouseEvent | TouchEvent;
  moveDistance: number;
  moveX: number;
}

defineOptions({ name: "ImgRotateVerify" });

interface Props {
  src?: string;
  width?: number | string;
  height?: number | string;
  imgWidth?: number;
  imgWrapStyle?: any;
  minDegree?: number;
  maxDegree?: number;
  diffDegree?: number;
  clipCircle?: boolean;
  clipSize?: string;
}
const {
  src,
  width = 220,
  height = 40,
  imgWidth = 260,
  imgWrapStyle = {},
  minDegree = 90,
  maxDegree = 270,
  diffDegree = 20,
  clipCircle = false,
  clipSize = "35%",
} = defineProps<Props>();

const emit = defineEmits(["success", "change", "update:value"]);
const attrs = useAttrs();

const dragRef = ref();
const state = reactive({
  showTip: false,
  isPassing: false,
  imgStyle: {},
  randomRotate: 0,
  currentRotate: 0,
  toOrigin: false,
  startTime: 0,
  endTime: 0,
  draged: false,
});
const time = computed(() => (state.endTime - state.startTime) / 1000);

function handleImgOnLoad() {
  const ranRotate = Math.floor(minDegree! + Math.random() * (maxDegree! - minDegree!)); // 生成随机角度
  state.randomRotate = ranRotate;
  state.imgStyle = { transform: `rotateZ(${ranRotate}deg)` };
}

const getImgWrapStyleRef = computed(() => {
  let clipCircleStyle = {};
  clipCircle &&
    (clipCircleStyle = {
      background: `url(${src}) no-repeat`,
      "background-size": `100% 100%`,
    });
  return {
    width: `${imgWidth}px`,
    height: `${imgWidth}px`,
    ...clipCircleStyle,
    ...imgWrapStyle,
  };
});

const getFactorRef = computed(() => {
  if (minDegree === maxDegree) {
    return Math.floor(1 + Math.random() * 1) / 10 + 1;
  }
  return 1;
});

function handleStart() {
  state.startTime = Date.now();
}

function handleDragBarMove(data: MoveData) {
  state.draged = true;
  const { moveX } = data;
  const currentRotate = Math.ceil(
    (moveX / (imgWidth! - Number.parseInt(height as string))) * maxDegree! * unref(getFactorRef)
  );
  state.currentRotate = currentRotate;
  state.imgStyle = { transform: `rotateZ(${state.randomRotate - currentRotate}deg)` };
}

function handleDragEnd() {
  const { randomRotate, currentRotate } = state;

  if (Math.abs(randomRotate - currentRotate) >= (diffDegree || 20)) {
    state.imgStyle = { transform: `rotateZ(${randomRotate}deg)` };
    state.toOrigin = true;
    useTimeoutFn(() => {
      state.toOrigin = false;
      state.showTip = true;
      //  The time is consistent with the animation time
    }, 300);
  } else {
    checkPass();
  }
  state.showTip = true;
}
function checkPass() {
  state.isPassing = true;
  state.endTime = Date.now();
}

function resume() {
  state.showTip = false;
  const dragEl = unref(dragRef);
  if (!dragEl) {
    return;
  }
  state.isPassing = false;

  dragEl.resume();
  handleImgOnLoad();
}

watch(
  () => state.isPassing,
  (isPassing) => {
    if (isPassing) {
      const { startTime, endTime } = state;
      const time = (endTime - startTime) / 1000;
      emit("success", { isPassing, time: time.toFixed(1) });
      emit("change", isPassing);
      emit("update:value", isPassing);
    }
  }
);

defineExpose({
  resume,
});
</script>

<style lang="less" scoped>
.ir-verify {
  @success-color: #67c23a;
  @error-color: #f56c6c;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-img__wrap {
    position: relative;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      border-radius: 50%;

      &.to-origin {
        transition: transform 0.3s;
      }
    }
  }

  &-img__tip {
    position: absolute;
    bottom: 10px;
    left: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    text-align: center;

    &.success {
      background-color: fade(@success-color, 60%);
    }

    &.error {
      background-color: fade(@error-color, 60%);
    }

    &.normal {
      background-color: rgb(0 0 0 / 30%);
    }
  }

  &-drag__bar {
    margin-top: 20px;
  }
}
</style>
