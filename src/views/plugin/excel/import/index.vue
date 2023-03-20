<template>
  <div class="h-full">
    <el-card class="min-h-full" header="Excel导入">
      <div class="flex gap-2">
        <import-excel @success="loadDataSuccess">
          <el-button>导入</el-button>
        </import-excel>
        <el-link type="primary" href="/public/files/test.xlsx" download>下载示例</el-link>
      </div>
      <el-table :data="tableData" stripe highlight-current-row style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :prop="item"
          :label="item"
        />
      </el-table>
      <div ref="gridRef" />
      <div ref="hotRef" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { ExcelData } from "@/composables/excel";
import canvasDatagrid from "canvas-datagrid";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";

defineOptions({ name: "PluginExcel" });

const gridRef = $ref<HTMLDivElement | null>(null);
const hotRef = $ref<HTMLDivElement | null>(null);
const tableHeader = ref<string[]>([]);
const tableData = ref<any[]>([]);

function loadDataSuccess(excelDataList: ExcelData[]) {
  console.log(excelDataList);
  tableHeader.value = excelDataList[0].header;
  tableData.value = excelDataList[0].results; // 仅展示excel第一个工作区的数据

  renderCanvasDatagrid(excelDataList[0].results);
  renderHandsontable([excelDataList[0].header, ...excelDataList[0].data]);
}

// see: https://canvas-datagrid.js.org/
function renderCanvasDatagrid(data: any) {
  const grid = canvasDatagrid({
    parentNode: gridRef,
    data,
    editable: false,
  });
  grid.style.width = "100%";
  grid.style.height = "auto";
}

// see: https://handsontable.com/docs/javascript-data-grid/
function renderHandsontable(data: any) {
  if (!hotRef) return;
  const hot = new Handsontable(hotRef, {
    data,
    rowHeaders: true,
    colHeaders: true,
    height: "auto",
    licenseKey: "non-commercial-and-evaluation",
  });
}
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
