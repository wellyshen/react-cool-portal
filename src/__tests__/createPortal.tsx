import { render, fireEvent, screen } from "@testing-library/react";

import createPortal from "../createPortal";
import { defaultContainerId } from "..";

describe("createPortal", () => {
  const childId = "test";

  interface Args {
    containerId?: string;
    autoRemoveContainer?: boolean;
    isShow?: boolean;
  }
  interface Return {
    clickOutsideCb: any;
    escCb: any;
    baseElement: any;
    unmount: any;
  }

  const renderHelper = ({
    containerId = defaultContainerId,
    autoRemoveContainer = true,
    isShow = true,
  }: Args = {}): Return => {
    const clickOutsideCb = jest.fn();
    const escCb = jest.fn();
    const Portal = createPortal(
      containerId,
      autoRemoveContainer,
      isShow,
      clickOutsideCb,
      escCb
    );
    const { baseElement, unmount } = render(
      <Portal>
        <div data-testid={childId}>Test</div>
      </Portal>
    );

    return { clickOutsideCb, escCb, baseElement, unmount };
  };

  it("should not render portal", () => {
    const { baseElement } = renderHelper({ isShow: false });
    expect(baseElement).toMatchSnapshot();
  });

  it("should render portal", () => {
    const { baseElement } = renderHelper();
    expect(baseElement).toMatchSnapshot();
  });

  it("should auto remove container", () => {
    jest.useFakeTimers();

    const { baseElement, unmount } = renderHelper();
    unmount();
    jest.runAllTimers();
    expect(baseElement).toMatchSnapshot();
  });

  it("should not auto remove container", () => {
    jest.useFakeTimers();

    const { baseElement, unmount } = renderHelper({
      autoRemoveContainer: false,
    });
    unmount();
    jest.runAllTimers();
    expect(baseElement).toMatchSnapshot();
  });

  it("should trigger callback when clicks outside of the child", () => {
    const { clickOutsideCb } = renderHelper();
    fireEvent.mouseDown(document);
    fireEvent.click(document);
    expect(clickOutsideCb).toHaveBeenCalled();
  });

  it("should not trigger callback when clicks inside of the child", () => {
    const { clickOutsideCb } = renderHelper();
    fireEvent.mouseDown(screen.getByTestId(childId));
    fireEvent.click(screen.getByTestId(childId));
    expect(clickOutsideCb).not.toHaveBeenCalled();
  });

  it("should trigger callback when presses ESC key", () => {
    const { escCb } = renderHelper();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(escCb).toHaveBeenCalled();
  });

  it("should not trigger callbacks when isShow set to false", () => {
    const { clickOutsideCb, escCb } = renderHelper({ isShow: false });
    fireEvent.click(document);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(clickOutsideCb).not.toHaveBeenCalled();
    expect(escCb).not.toHaveBeenCalled();
  });
});
