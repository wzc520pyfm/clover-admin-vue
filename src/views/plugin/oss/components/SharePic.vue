<template>
  <el-upload
    ref="picUploadRef"
    v-model:file-list="fileList"
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
  <div class="flex flex-wrap gap-5">
    <el-card v-for="(item, index) in pics" :key="index" class="img-card h-fit" shadow="hover">
      <el-image
        :src="`${item.url}?x-oss-process=image/resize,h_200/auto-orient,1/quality,q_90/format,jpg`"
        class="block!"
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
import type { ObjectMeta } from "ali-oss";
import type { UploadInstance, UploadProps } from "element-plus";

defineOptions({ name: "OssSharePic" });

let fileList = $ref([]);
const picUploadRef = $ref<UploadInstance>();
let pics = $ref<ObjectMeta[]>([]);
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
      window.$message.success("上传成功");
      getPics();
    })
    .catch((err) => {
      onError(err, file);
      window.$message.success("上传出错");
    });
};

const submitUpload = (e: PointerEvent) => {
  e.stopPropagation();
  picUploadRef!.submit();
};

const handleSuccess: UploadProps["onSuccess"] = (uploadFile, uploadFiles) => {
  fileList = [];
};

const getPics = async () => {
  const res = await list("pic");
  console.log("files", res);
  pics = res.objects;
};

onMounted(() => {
  getPics();
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
