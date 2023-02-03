<template>
  <el-upload
    ref="picUploadRef"
    v-model:file-list="fileList"
    class="w-full"
    action="#"
    multiple
    :limit="3"
    accept=".png,.jpeg,.jpg,.webp"
    :auto-upload="false"
    :http-request="uploadRequest"
    :on-success="handleSuccess"
  >
    <el-button type="primary">Select Picture</el-button>
    <el-button type="primary" @click="submitUpload">Upload Picture</el-button>
    <template #tip>
      <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
    </template>
  </el-upload>
  <div
    ref="picsContainerRef"
    class="relative w-full"
    :style="`height: ${justifiedLayoutResult?.containerHeight}px;`"
  >
    <el-card
      v-for="(item, index) in pics"
      :key="index"
      class="img-card h-fit absolute"
      :style="`top: ${justifiedLayoutResult?.boxes[index].top}px;left: ${justifiedLayoutResult?.boxes[index].left}px;`"
      shadow="hover"
    >
      <el-image
        :src="`${item.url}?x-oss-process=image/resize,h_200/auto-orient,1/quality,q_90/format,jpg`"
        class="block!"
        :style="`width: ${justifiedLayoutResult?.boxes[index].width}px;height: ${justifiedLayoutResult?.boxes[index].height}px;aspect-ratio: ${justifiedLayoutResult?.boxes[index].aspectRatio};`"
      >
        <template #error>
          <div class="wh-100px flex-center flex-wrap">
            <el-icon class="text-32px"><i-ep-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useAliOSS } from "@/hooks";
import { useAppStore } from "@/stores";
import { useElementSize } from "@vueuse/core";
import type { ObjectMeta } from "ali-oss";
import type { UploadInstance, UploadProps } from "element-plus";
import justifyLayout from "justified-layout";

defineOptions({ name: "OssSharePic" });

interface Box {
  width: number;
  height: number;
}

interface LayoutBox {
  aspectRatio: number;
  top: number;
  width: number;
  height: number;
  left: number;
  forcedAspectRatio?: boolean;
}

interface JustifiedLayoutResult {
  containerHeight: number;
  widowCount: number;
  boxes: LayoutBox[];
}

let fileList = $ref([]);
let pics = $ref<ObjectMeta[]>([]);
let picBox = $ref<Box[]>([]);
let justifiedLayoutResult = $ref<JustifiedLayoutResult>();
const picsContainerRef = ref();
const picUploadRef = $ref<UploadInstance>();
const { sidebarCollapse } = $(useAppStore());
const { width: picContainerWidth } = useElementSize(picsContainerRef);
const { upload, list } = await useAliOSS();

const uploadRequest = (options: any) => {
  const { file, onSuccess, onError, onProgress } = options;
  const { name, size, type } = file;
  const path = `pic/${name}`;
  const result = upload(path, file, {
    headers: {
      "Content-Type": type,
    },
  });
  result
    .then(async (res) => {
      onSuccess(res, file);
      window.$message?.success("上传成功");
      initPics();
    })
    .catch((err) => {
      onError(err, file);
      window.$message?.success("上传出错");
    });
};

const submitUpload = (e: PointerEvent) => {
  e.stopPropagation();
  picUploadRef!.submit();
};

const handleSuccess: UploadProps["onSuccess"] = (uploadFile, uploadFiles) => {
  fileList = [];
};

const initPics = async () => {
  pics = await getPics();

  picBox = await getAllPicWH(pics);

  resetJustifiedLayout(picBox);
};

const getPics = async () => {
  const res = await list("pic");
  const pics = res.objects;
  pics.shift(); // aliOss图片查询返回的第一条数据为异常数据, 设其它

  return pics;
};

async function getAllPicWH(picArr: ObjectMeta[]) {
  const res = await Promise.allSettled(
    picArr.map(async (item, index) => {
      const url = `${item.url}?x-oss-process=image/resize,h_200/auto-orient,1/quality,q_90/format,jpg`;
      return getPicWH(url);
    })
  );

  return res.reduce((prev: Box[], cur) => {
    if (cur.status === "fulfilled") {
      prev.push(cur.value);
    }
    return prev;
  }, []);
}

async function getPicWH(url: string) {
  const img = new Image();
  img.src = url;
  return getWH();

  function getWH(): Promise<Box> {
    return new Promise((resolve) => {
      img.onload = () => {
        resolve({ width: img.width ?? 0, height: img.height ?? 0 });
      };
    });
  }
}

function resetJustifiedLayout(picBox: Box[]) {
  const sidebarWidth = sidebarCollapse ? 64 : 220;
  justifiedLayoutResult = justifyLayout([...picBox], {
    containerWidth: document.body.clientWidth - 90 - sidebarWidth,
    targetRowHeight: 200,
    boxSpacing: {
      horizontal: 15,
      vertical: 20,
    },
  });
}

watch(picContainerWidth, () => resetJustifiedLayout(picBox));

onMounted(() => {
  initPics();
});
</script>

<style lang="less" scoped>
.img-card {
  --el-card-padding: 0;
}
.el-image {
  :deep(.el-image__wrapper) {
    position: relative;
    display: flex;
  }
}
</style>
