<template>
  <el-card class="h-full">
    <h1>This is an AliOSS Example page</h1>
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      action="#"
      multiple
      :limit="3"
      :auto-upload="false"
      :http-request="uploadRequest"
    >
      <el-button type="primary">Click to upload</el-button>
      <el-button type="primary" @click="submitUpload">upload to oss</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
      </template>
    </el-upload>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="name" width="220" />
      <el-table-column prop="url" label="link" width="250">
        <template #default="{ row }">
          <el-link :href="row.url" type="primary" target="_blank">{{ row.url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="220">
        <template #default="{ $index, row }">
          <el-button link type="primary" size="small" @click="previewFile($index, row)"
            >PreView</el-button
          >
          <el-button link type="primary" size="small" @click="downloadFile($index, row)"
            >Download</el-button
          >
          <el-button link type="primary" size="small" @click="deleteFile($index, row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { useAliOSS } from "@/hooks";
import type { ObjectMeta } from "ali-oss";
import type { UploadInstance } from "element-plus";

const fileList = ref([]);
const uploadRef = $ref<UploadInstance>();
let tableData = $ref<ObjectMeta[]>([]);

const { client, upload, preview, download, remove, list } = await useAliOSS();

const uploadRequest = (options: any) => {
  const { file, onSuccess, onError, onProgress } = options;
  const { name, size, type } = file;
  const path = `clover-admin/${name}`;
  const result = upload(path, file, {
    headers: {
      "Content-Type": type,
    },
  });
  result
    .then(async (res) => {
      onSuccess(res, file);
      console.log(res);
      getFiles();
    })
    .catch((err) => {
      onError(err, file);
    });
};
const submitUpload = (e: PointerEvent) => {
  e.stopPropagation();
  uploadRef!.submit();
};

const getFiles = async () => {
  const res = await list("clover-admin");
  console.log("files", res);
  tableData = res.objects;
};

const previewFile = async (index: number, row: ObjectMeta) => {
  const res = await preview(row.name);
  console.log(res);
  window.open(res);
};

const downloadFile = async (index: number, row: ObjectMeta) => {
  const res = await download(row.name);
  console.log(res);
  window.open(res);
};

const deleteFile = async (index: number, row: ObjectMeta) => {
  const res = await remove(row.name);
  console.log(res);
  getFiles();
};

onMounted(() => {
  getFiles();
});
</script>

<style lang="less" scope>
.el-card {
  #ep.el-card-rounded();
}
</style>
