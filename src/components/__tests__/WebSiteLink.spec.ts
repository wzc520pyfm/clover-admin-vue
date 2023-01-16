import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import WebSiteLink from "../custom/WebSiteLink.vue";

describe("WebSiteLink.vue", () => {
  it("renders props.label when passed", () => {
    const label = "Google";
    const link = "https://www.google.com";
    const wrapper = shallowMount(WebSiteLink, { propsData: { label, link } });
    expect(wrapper.text()).toMatch(label);
  });

  it("renders props.link when passed", () => {
    const label = "Google";
    const link = "https://www.google.com";
    const wrapper = shallowMount(WebSiteLink, { propsData: { label, link } });
    expect(wrapper.find("el-link").attributes("href")).toBe(link);
  });

  it("renders props.isBlank when passed", () => {
    const label = "Google";
    const link = "https://www.google.com";
    const isBlank = true;
    const wrapper = shallowMount(WebSiteLink, { propsData: { label, link, isBlank } });
    expect(wrapper.find("el-link").attributes("target")).toBe("_blank");
  });
});
