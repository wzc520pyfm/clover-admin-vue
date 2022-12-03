<template>
  <el-dropdown class="cursor-pointer" size="large" type="primary" @command="handleCommand">
    <div class="flex-center">
      <el-avatar
        :size="32"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        >user</el-avatar
      >
      <span class="pl-8px text-16px font-medium">Administrator</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in options"
          :key="item.key"
          :command="item.command"
          :disabled="item.disabled"
          >{{ item.content }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import type { Component } from "vue";

interface DropdownOption {
  key: string;
  command?: string | number | object;
  content?: string;
  disabled?: boolean;
  divided?: boolean;
  icon?: string | Component;
}

const options: DropdownOption[] = [
  {
    key: "user-center",
    command: "用户中心",
    content: "用户中心",
  },
  {
    key: "change-password",
    command: "更改密码",
    content: "更改密码",
    disabled: true,
  },
  {
    key: "login-out",
    command: "退出登录",
    content: "退出登录",
  },
];

const handleCommand = (command: string | number | object) => {
  ElMessage(`click on item ${command}`);
};
</script>

<style scoped></style>
