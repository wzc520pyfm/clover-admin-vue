<template>
  <div class="w-full">
    <el-card class="w-full">
      <el-space direction="vertical" alignment="normal">
        <github-link link="https://github.com/nolimits4web/swiper" />
        <web-site-link label="vue3版文档地址：" link="https://swiperjs.com/vue" />
        <web-site-link label="插件demo地址：" link="https://swiperjs.com/demos" />
      </el-space>
      <el-space direction="vertical" alignment="normal" class="w-full">
        <div v-for="item in swiperExample" :key="item.id" class="w-full">
          <h3 class="py-24px text-24px font-bold">{{ item.label }}</h3>
          <swiper v-bind="item.options">
            <swiper-slide v-for="i in 5" :key="i">
              <div class="flex-center h-240px border-1px border-#999 text-18px font-bold">
                Slide{{ i }}
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </el-space>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { SwiperOptions } from "swiper";

defineOptions({ name: "PluginSwiper" });

type SwiperExampleOptions = Pick<
  SwiperOptions,
  | "navigation"
  | "pagination"
  | "scrollbar"
  | "slidesPerView"
  | "slidesPerGroup"
  | "spaceBetween"
  | "direction"
  | "loop"
  | "loopFillGroupWithBlank"
  | "autoplay"
>;

interface SwiperExample {
  id: number;
  label: string;
  options: Partial<SwiperExampleOptions>;
}

SwiperCore.use([Navigation, Pagination, Autoplay]);

const swiperExample: SwiperExample[] = [
  { id: 0, label: "Default", options: {} },
  {
    id: 1,
    label: "Navigation",
    options: { navigation: true },
  },
  {
    id: 2,
    label: "Pagination",
    options: { pagination: true },
  },
  {
    id: 3,
    label: "Pagination dynamic",
    options: {
      pagination: { dynamicBullets: true },
    },
  },
  {
    id: 4,
    label: "Pagination progress",
    options: {
      navigation: true,
      pagination: {
        type: "progressbar",
      },
    },
  },
  {
    id: 6,
    label: "Slides per view",
    options: {
      pagination: {
        clickable: true,
      },
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  {
    id: 7,
    label: "Infinite loop",
    options: {
      navigation: true,
      pagination: {
        clickable: true,
      },
      loop: true,
    },
  },
  {
    id: 8,
    label: "Autoplay loop",
    options: {
      autoplay: {
        delay: 1000, // 切换时延
        disableOnInteraction: false, // 禁用交互, 在用户交互后继续播放
        pauseOnMouseEnter: true, // 鼠标悬停时停止播放
      },
      loop: true,
    },
  },
];
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
