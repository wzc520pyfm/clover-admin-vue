describe("My First Test", () => {
  it("Dose not do much!", () => {
    expect(true).to.equal(true); // 最简单的测试例子(验证true是否为true)
  });
  it("Visits the Kitchen Sink", () => {
    cy.visit("http://example.cypress.io"); // 访问http://example.cypress.io

    cy.contains("type"); // 在新页面上查找包含指定内容(type)的元素

    cy.contains("type").click(); // 点击找到的type(在这个测试页面中这是一个链接)

    cy.url().should("include", "/commands/actions"); // 点击type跳转到的页面的url应该包含/commands/actions

    cy.get(".action-email").type("fake@email.com"); // 获取到css类名为.action-email的input框, 并输入值fake@email.com

    // 验证输入框的值否按预期更新(断言判断其值是否是fake@email.com)
    cy.get(".action-email").should("have.value", "fake@email.com");

    //! 不建议通过类名来选择元素, 但有时访问外部页面也不得不这么做, 最佳实践 @see: https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
  });
});
