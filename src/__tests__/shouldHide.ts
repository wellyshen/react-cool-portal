import shouldHide from "../shouldHide";

describe("shouldHide", () => {
  it("should return correctly with on/off", () => {
    expect(shouldHide(true)).toBeTruthy();
    expect(shouldHide(false)).toBeFalsy();
    // @ts-ignore
    expect(shouldHide(undefined)).toBeFalsy();
  });

  it("should return correctly with class name", () => {
    expect(shouldHide(["some-class"])).toBeTruthy();

    const el = document.createElement("div");
    el.setAttribute("class", "some-class");
    document.body.appendChild(el);
    expect(shouldHide(["some-class"])).toBeFalsy();
  });
});
