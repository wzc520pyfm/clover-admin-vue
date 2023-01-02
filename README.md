# clover-admin-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 项目配置

#### 以新的姿态使用vue
项目使用自动导入的方式来使用vue、vue-router、pinia、etc.
在以前, 我们使用vue可能是这样的:
```vue
<template>
    <div>{{ count }}</div>
    <HelloComponent />
</template>
<script lang='ts' setup>
import HelloComponent from '@/components'
import { ref, computed } from 'vue'
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

现在将使用更加简洁的方式:
```vue
<template>
    <div>{{ count }}</div>
    <HelloComponent />
</template>
<script lang='ts' setup>
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```


#### 使用element-plus的图标
直接从官网复制来的图标如下:
```vue
<el-icon><Search /></el-icon>
```
因为项目使用了自动导入图标的方式, 所以需要改为如下格式:
```vue
<el-icon><i-ep-Search /></el-icon>
```
自动导入见官方文档: https://element-plus.org/zh-CN/component/icon.html#%E8%87%AA%E5%8A%A8%E5%AF%BC%E5%85%A5

#### 使用unocss
本项目使用unocss, 当需要编写css时, 可去官方查找相应的css类名: https://uno.antfu.me/

项目默认集成了unocss的presetUno属性包, 你可以继续集成其他属性包, 这一切配置在uno.config.ts中


### 三方功能库
项目使用了诸多三方库, 以下列出其文档
* BatterScroll: https://better-scroll.github.io/docs/zh-CN/
* Swiper: https://swiperjs.com/
* 高德地图: https://lbs.amap.com/

### 常见问题
#### 安装Cypress太慢
参考自: https://www.lfhacks.com/tech/cypress-download-failure/

网络不畅, 且此资源较大, 官方给出的解决方式: 设置CYPRESS_DOWNLOAD_MIRROR常量为https://download.cypress.io/desktop,但不同操作系统设置常量的方式不同, 以下列出几种:

windows命令行
```shell
set CYPRESS_DOWNLOAD_MIRROR=https://download.cypress.io/desktop
```
windowsPowerShell
```shell
$env:CYPRESS_DOWNLOAD_MIRROR="https://download.cypress.io/desktop"
```
Linux、Mac
```shell
CYPRESS_DOWNLOAD_MIRROR="https://download.cypress.io/desktop"
```

设置完成后再次install即可

#### 自动导入eslint报错
按照AutoImport插件介绍, 需要在第一个运行项目时设置`eslintrc: {enabled: true}`生成eslint文件, 后续可改为false.

本项目AutoImport位置在./build/plugins/unplugin.ts
```ts
AutoImport({
    // ...
    eslintrc: {
        enabled: false, // 自动生成全局声明文件, 不需要eslint检查(在.eslintrc-auto-import.json生成成功之后就可以改为false)
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
    },
}),
```

