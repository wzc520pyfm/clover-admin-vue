# 使用官方的Node.js镜像作为基础镜像, 为其指定别名为builder
FROM node:16.18.0 as builder
# 设置环境变量, 指定工作目录为/clover-admin-vue
ENV WORKDIR=/clover-admin-vue
# 指定新的工作目录并将值赋予变量$WORKDIR
WORKDIR $WORKDIR
# 将当前目录的文件复制到指定的工作目录
COPY ./ $WORKDIR/
# 用于指定Dockfle中使用的版本号, 可在构建镜像时传递给Docker
ARG version
# 在Dockefile中定义环境变量
ENV COMMITID=$version
# 安装pnpm
RUN npm i -g pnpm
# 安装项目依赖
RUN pnpm install
# 项目打包(默认生产环境)
RUN pnpm build
# 使用nginx:alpine镜像作为基础镜像, 为其指定别名为prod
FROM nginx:alpine as prod
# 在当前容器创建文件夹
RUN mkdir /clover
# 从builder中复制/clover-admin-vue/dist到/clover-admin-vue
COPY --from=builder /clover-admin-vue/dist /clvoer-admin-vue
# 从builder中复制/clover-admin-vue/docker/nginx.conf到/etc/nginx/nginx.conf(此即服务器上的nginx配置文件位置)
COPY --from=builder /clover-admin-vue/docker/nginx.conf /etc/nginx/nginx.conf
# 向外界暴露容器的80端口
EXPOSE 80
