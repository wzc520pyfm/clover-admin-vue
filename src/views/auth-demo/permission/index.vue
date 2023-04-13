<template>
  <div class="h-full">
    <el-card
      class="h-full"
      header="您可以在此变更权限以查看权限指令的效果, 权限变更同时也会影响侧边菜单"
    >
      <el-button type="primary">所有用户可见</el-button>
      <el-button v-permission="'admin'" type="success">管理员可见</el-button>
      <el-button v-permission="'super'" type="danger">超级管理员可见</el-button>
      <h3>现在, 您是{{ getUserRole(auth.userInfo.userRole) }}</h3>
      <el-button type="warning" @click="changeRole">变更我的权限</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useAuthStore } from "@/stores";

defineOptions({ name: "AuthPermission" });

const app = useAppStore();
const auth = useAuthStore();

function changeRole() {
  const roles = ["super", "admin", "user"];
  const role = roles[(roles.indexOf(auth.userInfo.userRole) + 1) % roles.length];
  auth.setUserAuthRole(role as Auth.RoleType);
  app.reloadPage();
}

function getUserRole(role: Auth.RoleType) {
  const roleMap = {
    super: "超级管理员",
    admin: "管理员",
    user: "普通用户",
  };
  return roleMap[role];
}
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-rounded();
}
</style>
