<template>
  <el-table class="data-table" :data="tableData" stripe highlight-current-row style="width: 100%">
    <el-table-column prop="image" label="Image">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image class="wh-30px" :src="scope.row.image" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="productCode" label="Product Code" />
    <el-table-column prop="customer" label="Customer" />
    <el-table-column prop="purchasedOn" label="Purchased On" />
    <el-table-column prop="status" label="Status">
      <template #default="scope">
        <el-tag :type="scope.row.status" effect="dark">{{
          capitalLatter(scope.row.status || "default")
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="transactionId" label="Transaction ID" />
  </el-table>
  <div class="my-10 text-center">
    <el-button type="primary" plain round @click="loadMore">Load More</el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "HomeTable" });

interface TableData {
  image: string;
  productCode: string;
  customer: string;
  purchasedOn: string;
  status: string;
  transactionId: string;
}

const tableData: TableData[] = $ref([
  {
    image: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    productCode: "PNG002344",
    customer: "John Deo",
    purchasedOn: "05-01-2023",
    status: "success",
    transactionId: "#7234486",
  },
  {
    image: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    productCode: "PNG002344",
    customer: "John Deo",
    purchasedOn: "05-01-2023",
    status: "",
    transactionId: "#7234486",
  },
  {
    image: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    productCode: "PNG002344",
    customer: "John Deo",
    purchasedOn: "05-01-2023",
    status: "info",
    transactionId: "#7234486",
  },
  {
    image: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    productCode: "PNG002344",
    customer: "John Deo",
    purchasedOn: "05-01-2023",
    status: "warning",
    transactionId: "#7234486",
  },
  {
    image: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    productCode: "PNG002344",
    customer: "John Deo",
    purchasedOn: "05-01-2023",
    status: "danger",
    transactionId: "#7234486",
  },
  {
    image: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    productCode: "PNG002344",
    customer: "John Deo",
    purchasedOn: "05-01-2023",
    status: "danger",
    transactionId: "#7234486",
  },
  {
    image: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    productCode: "PNG002344",
    customer: "John Deo",
    purchasedOn: "05-01-2023",
    status: "danger",
    transactionId: "#7234486",
  },
]);

function loadMore() {
  tableData.push({
    image: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    productCode: "PNG002344",
    customer: "John Deo",
    purchasedOn: "05-01-2023",
    status: "success",
    transactionId: "#7234486",
  });
}

function capitalLatter(word: string) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}
</script>

<style lang="less" scoped>
.el-table {
  :deep(.el-table__header) .cell {
    font-weight: bold;
    color: black;
  }
}
</style>
