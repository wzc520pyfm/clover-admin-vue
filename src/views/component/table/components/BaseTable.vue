<template>
  <div class="h-full">
    <el-card shadow="never" class="h-full" header="基础表格">
      <el-table :data="tableData" stripe highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="age" label="年龄" />
        <!-- 第一种枚举过滤写法 -->
        <el-table-column
          prop="gender"
          label="性别"
          :formatter="elTableFormatter(VALUE_CONSTANT.GENDER)"
        />
        <el-table-column prop="phone" label="手机号" />
        <!-- 第二种枚举过滤写法 -->
        <el-table-column prop="userStatus" label="状态">
          <template #default="scope">
            {{ constantFormat(scope.row.userStatus, VALUE_CONSTANT.USER_STATUS) }}
          </template>
        </el-table-column>
        <!-- 第三种枚举过滤写法: 直接使用注册到全局的$filters访问过滤方法 -->
        <el-table-column
          prop="gender"
          label="性别(演示)"
          :formatter="$filters.elTableFormatter(VALUE_CONSTANT.GENDER)"
        />
        <!-- 操作列 -->
        <el-table-column align="right" width="180">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { VALUE_CONSTANT } from "@/constants";
import { constantFormat, elTableFormatter } from "@/utils";

defineOptions({ name: "BaseTable" });

const search = $ref("");

const handleEdit = (index: number, row: ApiUserManagement.User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: ApiUserManagement.User) => {
  console.log(index, row);
};

const tableData: ApiUserManagement.User[] = [
  {
    id: "1",
    username: "Jack",
    age: 18,
    gender: "MALE",
    phone: "17816134129",
    userStatus: "ENABLE",
  },
  {
    id: "2",
    username: "Mike",
    age: 18,
    gender: "FEMALE",
    phone: "17816134129",
    userStatus: "DISABLE",
  },
];
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-no-divider();
}
</style>
