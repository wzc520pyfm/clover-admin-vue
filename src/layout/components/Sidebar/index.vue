<template>
	<el-menu
		active-text-color="#ffd04b"
		background-color="#545c64"
		text-color="#fff"
		class="min-w-50"
		router
	>
		<el-sub-menu index="/">
			<template #title>
				<el-icon>
					<i-ep-location />
				</el-icon>
				<span>Navigator One</span>
			</template>
			<el-menu-item index="/home">Home</el-menu-item>
			<el-menu-item index="/about">About</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>

<script lang="ts" setup>
const router = useRouter();
console.log(router.getRoutes());
</script>

<style scoped></style>
