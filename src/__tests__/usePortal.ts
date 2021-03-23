import { renderHook, act } from "@testing-library/react-hooks";

import createPortal from "../createPortal";
import usePortal, {
  Args,
  defaultContainerId,
  initAutoRemoveContainer,
  initShow,
} from "..";

jest.mock("../createPortal", () => jest.fn());

describe("usePortal", () => {
  const e = { test: "test" };
  const renderHelper = (args: Args = {}) =>
    renderHook(() => usePortal(args)).result;

  it("should create Portal with default parameters correctly", () => {
    renderHelper();
    expect(createPortal).toHaveBeenCalledWith(
      defaultContainerId,
      initAutoRemoveContainer,
      initShow,
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("should create Portal correctly", () => {
    const containerId = "my-portal-root";
    const autoRemoveContainer = true;
    const defaultShow = false;
    const clickOutsideToHide = false;
    const escToHide = false;
    renderHelper({ containerId, defaultShow, clickOutsideToHide, escToHide });
    expect(createPortal).toHaveBeenCalledWith(
      containerId,
      autoRemoveContainer,
      defaultShow,
      undefined,
      undefined
    );
  });

  it("should handle internal show/hide", () => {
    const params = [
      defaultContainerId,
      initAutoRemoveContainer,
      initShow,
      expect.any(Function),
      expect.any(Function),
    ];
    const result = renderHelper();
    expect(createPortal).toHaveBeenCalledWith(...params);

    act(() => result.current.hide());
    params[2] = false;
    expect(createPortal).toHaveBeenCalledWith(...params);

    act(() => result.current.show());
    params[2] = true;
    expect(createPortal).toHaveBeenCalledWith(...params);
  });

  it("should disable internal show/hide", () => {
    const params = [
      defaultContainerId,
      initAutoRemoveContainer,
      true,
      expect.any(Function),
      expect.any(Function),
    ];
    const result = renderHelper({ internalShowHide: false });
    expect(createPortal).toHaveBeenCalledWith(...params);

    act(() => result.current.hide());
    expect(createPortal).toHaveBeenCalledWith(...params);
  });

  it("should return default isShow correctly", () => {
    let result = renderHelper();
    expect(result.current.isShow).toBeTruthy();

    result = renderHelper({ defaultShow: false });
    expect(result.current.isShow).toBeFalsy();
  });

  it("should return isShow correctly", () => {
    const result = renderHelper();

    act(() => result.current.hide());
    expect(result.current.isShow).toBeFalsy();

    act(() => result.current.show());
    expect(result.current.isShow).toBeTruthy();

    act(() => result.current.toggle());
    expect(result.current.isShow).toBeFalsy();
    act(() => result.current.toggle());
    expect(result.current.isShow).toBeTruthy();
  });

  it("should trigger onShow correctly", () => {
    const onShow = jest.fn();
    const result = renderHelper({ onShow });
    act(() => result.current.show());
    expect(onShow).not.toHaveBeenCalled();

    act(() => result.current.hide());
    // @ts-expect-error
    act(() => result.current.show(e));
    expect(onShow).toHaveBeenCalledWith(e);

    act(() => result.current.toggle());
    // @ts-expect-error
    act(() => result.current.toggle(e));
    expect(onShow).toHaveBeenCalledWith(e);
  });

  it("should trigger onHide correctly", () => {
    const onHide = jest.fn();
    const result = renderHelper({ defaultShow: false, onHide });
    act(() => result.current.hide());
    expect(onHide).not.toHaveBeenCalled();

    act(() => result.current.show());
    // @ts-expect-error
    act(() => result.current.hide(e));
    expect(onHide).toHaveBeenCalledWith(e);

    act(() => result.current.toggle());
    // @ts-expect-error
    act(() => result.current.toggle(e));
    expect(onHide).toHaveBeenCalledWith(e);
  });
});
