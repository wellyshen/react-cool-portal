/* eslint-disable testing-library/no-node-access */

import { useState } from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import usePortal, { Args, Return as BaseReturn, defaultContainerId } from "..";

type Return = Omit<BaseReturn, "Portal" | "isShow">;

interface Props extends Args {
  children: (obj: Return) => null;
}

const Compo = ({ children, ...config }: Props) => {
  const [showRef, setShowRef] = useState(true);
  const { Portal, isShow, ...rest } = usePortal(config);

  return (
    <>
      {showRef && <div className="ref" />}
      <button
        data-testid="btn"
        type="button"
        onClick={() => setShowRef(!showRef)}
      >
        Show Ref
      </button>
      {isShow && <div data-testid="is-show" />}
      <Portal>
        <div data-testid="target">Test</div>
      </Portal>
      {children(rest)}
    </>
  );
};

const renderHelper = (args?: Args) => {
  let obj: Return;

  const result = render(
    <Compo {...args}>
      {(o) => {
        obj = o;
        return null;
      }}
    </Compo>
  );

  // @ts-ignore
  return { ...obj, ...result };
};

describe("usePortal", () => {
  it("should render portal correctly", () => {
    const { baseElement } = renderHelper();
    expect(baseElement).toMatchSnapshot();
  });

  it("should render container with customized id", () => {
    renderHelper({ containerId: "custom-id" });
    expect(document.getElementById("custom-id")).toBeInTheDocument();
  });

  it("should hide portal by default", () => {
    renderHelper({ defaultShow: false });
    expect(screen.queryByTestId("target")).not.toBeInTheDocument();
  });

  it("should toggle portal", () => {
    const { toggle } = renderHelper();
    act(toggle);
    expect(screen.queryByTestId("target")).not.toBeInTheDocument();
    act(toggle);
    expect(screen.queryByTestId("target")).toBeInTheDocument();
  });

  it("should show/hide portal", () => {
    const { hide, show } = renderHelper();
    act(hide);
    expect(screen.queryByTestId("target")).not.toBeInTheDocument();
    act(show);
    expect(screen.queryByTestId("target")).toBeInTheDocument();
  });

  it("should auto remove container", () => {
    jest.useFakeTimers();

    const { hide } = renderHelper();
    act(hide);
    jest.runAllTimers();
    expect(document.getElementById(defaultContainerId)).not.toBeInTheDocument();
  });

  it("should disable internal show/hide", () => {
    const { hide } = renderHelper({ internalShowHide: false });
    act(hide);
    expect(screen.queryByTestId("target")).toBeInTheDocument();
  });

  it('should return "isShow" correctly', () => {
    const { hide, show } = renderHelper();
    expect(screen.queryByTestId("is-show")).toBeInTheDocument();
    act(hide);
    expect(screen.queryByTestId("is-show")).not.toBeInTheDocument();
    act(show);
    expect(screen.queryByTestId("is-show")).toBeInTheDocument();
  });

  it("should trigger events correctly", () => {
    const onHide = jest.fn();
    const onShow = jest.fn();
    const e = { test: "test" };
    const { hide, show } = renderHelper({ onHide, onShow });
    // @ts-ignore
    act(() => hide(e));
    expect(onHide).toHaveBeenCalledWith(e);
    // @ts-ignore
    act(() => show(e));
    expect(onShow).toHaveBeenCalledWith(e);
  });

  describe("clickOutsideToHide", () => {
    it("should hide portal", () => {
      renderHelper();
      fireEvent.mouseDown(screen.getByTestId("btn"));
      fireEvent.click(screen.getByTestId("btn"));
      expect(screen.queryByTestId("target")).not.toBeInTheDocument();
    });

    it("should not hide portal", () => {
      renderHelper({ clickOutsideToHide: false });
      fireEvent.mouseDown(screen.getByTestId("btn"));
      fireEvent.click(screen.getByTestId("btn"));
      expect(screen.queryByTestId("target")).toBeInTheDocument();
    });

    it("should conditionally hide portal", () => {
      renderHelper({ clickOutsideToHide: ["ref"] });
      fireEvent.mouseDown(screen.getByTestId("btn"));
      fireEvent.click(screen.getByTestId("btn"));
      expect(screen.queryByTestId("target")).toBeInTheDocument();

      act(() => screen.getByTestId("btn").click());
      fireEvent.mouseDown(screen.getByTestId("btn"));
      fireEvent.click(screen.getByTestId("btn"));
      expect(screen.queryByTestId("target")).not.toBeInTheDocument();
    });
  });

  describe("escToHide", () => {
    it("should hide portal", () => {
      renderHelper();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByTestId("target")).not.toBeInTheDocument();
    });

    it("should not hide portal", () => {
      renderHelper({ escToHide: false });
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByTestId("target")).toBeInTheDocument();
    });

    it("should conditionally hide portal", () => {
      renderHelper({ escToHide: ["ref"] });
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByTestId("target")).toBeInTheDocument();

      act(() => screen.getByTestId("btn").click());
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByTestId("target")).not.toBeInTheDocument();
    });
  });
});
