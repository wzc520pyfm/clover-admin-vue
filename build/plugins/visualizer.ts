import { visualizer } from "rollup-plugin-visualizer";

// see: https://www.npmjs.com/package/rollup-plugin-visualizer
export default () => {
  return visualizer({
    gzipSize: true,
    brotliSize: true,
    open: true,
  });
};
