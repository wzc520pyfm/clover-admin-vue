import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ExceptionBase from "../common/ExceptionBase.vue";

describe("ExceptionBase", () => {
  const wrapper = shallowMount(ExceptionBase);
  it("should have the correct component name", () => {
    expect(wrapper.vm.$options.name).toBe("ExceptionBase");
  });
  it("render the icon component for 403", async () => {
    await wrapper.setProps({ type: "403" });
    expect(wrapper.find("i-local-403").exists()).toBe(true);
  });
  it("render the icon component for 404", async () => {
    await wrapper.setProps({ type: "404" });
    expect(wrapper.find("i-local-404").exists()).toBe(true);
  });
  it("render the icon component for 500", () => {
    // 可以在测试用例中独立挂载 wrapper, 但这会导致额外开销, 推荐在外部挂载wrapper, 在用例中使用setProps()方法
    const wrapper = shallowMount(ExceptionBase, { propsData: { type: "500" } });
    expect(wrapper.find("i-local-500").exists()).toBe(true);
  });
  it("renders a router link to home page", () => {
    expect(wrapper.find("router-link").exists()).toBe(true);
    expect(wrapper.find("router-link").attributes("to")).toBe("/home");
  });
});
