import { compression } from "vite-plugin-compression2";

// see: https://github.com/nonzzz/vite-compression-plugin#readme
export default (viteEnv: ImportMetaEnv) => {
  const { VITE_COMPRESS_TYPE = "gzip" } = viteEnv;
  return compression({
    algorithm: VITE_COMPRESS_TYPE, // 压缩算法
    // threshold: 10 * 1024, // 仅处理大于此大小的资源（以字节为单位）
    deleteOriginalAssets: false, // 是否删除原始资源
  });
};
