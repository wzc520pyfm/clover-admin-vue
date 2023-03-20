<template>
  <div class="v-wrapper">
    <canvas ref="numCanvasRef" :width="width" :height="height" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "RandomNumVerify" });

interface Props {
  identifyCode?: string;
  width?: number;
  height?: number;
  fontSizeRange?: [number, number];
  bgcRange?: [number, number];
  colorRange?: [number, number];
  lineColorRange?: [number, number];
  lineNumRange?: [number, number];
  dotColorRange?: [number, number];
  dotNumRange?: [number, number];
}
const {
  identifyCode = "1234",
  width = 110,
  height = 36,
  fontSizeRange = [16, 32],
  bgcRange = [180, 240],
  colorRange = [50, 160],
  lineColorRange = [40, 180],
  lineNumRange = [2, 5],
  dotColorRange = [0, 255],
  dotNumRange = [20, 30],
} = defineProps<Props>();

const numCanvasRef = $ref<UT.Nullable<HTMLCanvasElement>>(null);
const codeCharArr = $computed(() => identifyCode.split(""));

const drawPic = () => {
  const ctx = numCanvasRef?.getContext("2d");
  if (!ctx) return;
  ctx.textBaseline = "bottom";
  ctx.fillStyle = randomColor(...bgcRange); // 绘制背景
  ctx.fillRect(0, 0, width, height);
  codeCharArr.forEach((v, i) => {
    drawText(ctx, v, i);
  });
  drawLine(ctx);
  drawDot(ctx);
};

const drawText = (ctx: CanvasRenderingContext2D, txt: string, i: number) => {
  ctx.fillStyle = randomColor(...colorRange);
  ctx.font = `${randomNum(...fontSizeRange)}px SimHei`;
  const x = (i + 1) * (width / (codeCharArr.length + 1));
  const y = randomNum(fontSizeRange[0], fontSizeRange[1] - 6);
  const deg = randomNum(-24, 24); // 字符旋转角度
  ctx.translate(x, y); // 修改坐标原点
  ctx.rotate((deg * Math.PI) / 200); // 修改旋转角度
  ctx.fillText(txt, 0, 0); // 绘制字符
  // 复原
  ctx.rotate((-deg * Math.PI) / 200);
  ctx.translate(-x, -y);
};

const drawLine = (ctx: CanvasRenderingContext2D) => {
  // 绘制干扰线
  const drawCount = randomNum(...lineNumRange);
  for (let i = 0; i < drawCount; i++) {
    ctx.strokeStyle = randomColor(...lineColorRange);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, width), randomNum(0, height));
    ctx.lineTo(randomNum(0, width), randomNum(0, height));
    ctx.stroke();
  }
};

const drawDot = (ctx: CanvasRenderingContext2D) => {
  // 绘制干扰点
  const dotCount = randomNum(...dotNumRange);
  for (let i = 0; i < dotCount; i++) {
    ctx.fillStyle = randomColor(...dotColorRange);
    ctx.beginPath();
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
};

function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(min: number, max: number) {
  const [r, g, b] = [randomNum(min, max), randomNum(min, max), randomNum(min, max)];
  return `rgb(${r},${g},${b})`;
}

watch(
  () => identifyCode,
  () => drawPic()
);

onMounted(() => drawPic());
</script>

<style lang="less" scoped>
.v-wrapper {
  padding: 2px;
  canvas {
    margin-top: 1px;
    margin-left: 2px;
  }
}
</style>
