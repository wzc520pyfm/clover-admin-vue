<template>
	<div class="flex h-1/1">
		<!-- {{ count }}
    <el-button @click="count++">+</el-button> -->
		<Sidebar />
		<!-- <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink> -->
		<AppMain />
	</div>
</template>

<script lang="ts" setup>
import { Sidebar, AppMain } from "./components";
</script>

<style scoped></style>
