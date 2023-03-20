<template>
  <div>
    <input
      v-show="false"
      ref="inputRef"
      type="file"
      accept=".xlsx, .xls"
      @change="handleInputClick"
    />
    <div style="width: fit-content" @click="handleUpload">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExcel } from "@/composables";

defineOptions({ name: "ImportExcel" });

const emit = defineEmits(["success", "error", "cancel"]);

const { parseData } = useExcel();
const inputRef = $ref<UT.Nullable<HTMLInputElement>>(null);
let loading = $ref<boolean>(false);
let cancel = $ref<boolean>(true);

async function upload(rawFile: File) {
  const inputRefDom = unref(inputRef);
  if (inputRefDom) {
    inputRefDom.value = ""; // 选择了相同文件则先情空再选中
  }
  loading = true;
  const excelData = await parseData(rawFile).catch((e) => emit("error", e));
  emit("success", excelData);
  loading = false;
}

function handleInputClick(e: Event) {
  const target = e && (e.target as HTMLInputElement);
  const files = target?.files;
  const rawFile = files && files[0]; // 仅获取选择的第一个文件

  target.value = "";
  if (!rawFile) return;

  cancel = false;

  upload(rawFile);
}

/** 文件选择器关闭后, 判断取消状态 */
function handleFocusChange() {
  const timer = setInterval(() => {
    if (cancel === true) {
      emit("cancel");
    }
    clearInterval(timer);
    window.removeEventListener("focus", handleFocusChange);
  }, 1000);
}

function handleUpload() {
  const inputRefDom = unref(inputRef);
  if (inputRefDom) {
    cancel = true;
    inputRefDom.click();
    window.addEventListener("focus", handleFocusChange);
  }
}
</script>

<style lang="less" scoped></style>
