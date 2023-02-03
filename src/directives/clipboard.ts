import type { App, Directive } from "vue";
import { useClipboard } from "@vueuse/core";

export type ClipboardDirective = typeof clipboardDirective;

let cache: string;

function handleCopy(value: string) {
  const { copy, isSupported } = useClipboard();
  if (!isSupported) {
    window.$message?.error("您的浏览器不支持Clipboard API!");
    return;
  }
  if (!value) {
    window.$message?.warning("请输入要复制的内容");
    return;
  }
  copy(value);
  window.$message?.success(`复制成功: ${value}`);
}

function onClick() {
  handleCopy(cache);
}

/**
 * 剪切板指令
 */
export const clipboardDirective: Directive<HTMLElement, string> = {
  beforeMount(el, binding) {
    cache = binding.value;
    el.addEventListener("click", onClick);
  },
  beforeUpdate(el, binding) {
    cache = binding.value;
  },
};

export const VClipboard = "clipboard";

export default function setupClipboardDirective(app: App) {
  app.directive(VClipboard, clipboardDirective);
}
