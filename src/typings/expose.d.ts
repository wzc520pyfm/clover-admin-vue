/** vue 的defineExpose导出的类型 */
declare namespace Expose {
  interface BetterScroll {
    instance: import("@better-scroll/core").BScrollInstance;
  }

  interface DragVerify {
    resume: () => void;
  }

  interface ImgRotateVerify {
    resume: () => void;
  }
}
