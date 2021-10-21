/* eslint-disable react-hooks/exhaustive-deps */

import {
  FC,
  SyntheticEvent,
  MouseEvent as ReactMouseEvent,
  useState,
  useRef,
  useCallback,
} from "react";

import useLatest from "./useLatest";
import delay from "./delay";
import shouldHide from "./shouldHide";
import createPortal, { Props as PortalProps } from "./createPortal";

interface OnShow<T extends SyntheticEvent | Event = ReactMouseEvent> {
  (event: T): void;
}
export interface Args {
  containerId?: string;
  autoRemoveContainer?: boolean;
  defaultShow?: boolean;
  clickOutsideToHide?: boolean | string[];
  escToHide?: boolean | string[];
  internalShowHide?: boolean;
  onShow?: OnShow;
  onHide?: OnShow<ReactMouseEvent | MouseEvent | KeyboardEvent>;
}
interface RCPF<T extends SyntheticEvent | Event = ReactMouseEvent> {
  (event?: T): void;
}
interface Return {
  Portal: FC<PortalProps>;
  isShow: boolean;
  show: RCPF;
  hide: RCPF;
  toggle: RCPF;
}

export const defaultContainerId = "react-cool-portal";
export const initAutoRemoveContainer = true;
export const initShow = true;

const usePortal = ({
  containerId = defaultContainerId,
  autoRemoveContainer = initAutoRemoveContainer,
  defaultShow = initShow,
  clickOutsideToHide = true,
  escToHide = true,
  internalShowHide = true,
  onShow,
  onHide,
}: Args = {}): Return => {
  const [isShow, setIsShow] = useState<boolean>(defaultShow);
  const skipClickOutsideRef = useRef<boolean>(false);
  const onShowRef = useLatest(onShow);
  const onHideRef = useLatest(onHide);
  // Workaround: because handleHide() will cache "isShow" state
  const isShowRef = useRef<boolean>(defaultShow);

  const setSkipClickOutside = useCallback(() => {
    if (!clickOutsideToHide) return;

    skipClickOutsideRef.current = true;
    delay(() => {
      skipClickOutsideRef.current = false;
    });
  }, [clickOutsideToHide]);

  const show = useCallback(
    (e) => {
      setSkipClickOutside();

      if (isShowRef.current) return;

      setIsShow(true);
      isShowRef.current = true;
      if (onShowRef.current) onShowRef.current(e);
    },
    [onShowRef, setSkipClickOutside]
  );

  const hide = useCallback(
    (e) => {
      setSkipClickOutside();

      if (!isShowRef.current) return;

      setIsShow(false);
      isShowRef.current = false;
      if (onHideRef.current) onHideRef.current(e);
    },
    [onHideRef, setSkipClickOutside]
  );

  const toggle = useCallback(
    (e) => {
      if (isShowRef.current) {
        hide(e);
      } else {
        show(e);
      }
    },
    [hide, show]
  );

  const handleHide = useCallback(
    (e) => {
      if (skipClickOutsideRef.current) return;

      if (
        (e.type === "click" && shouldHide(clickOutsideToHide)) ||
        (e.type === "keydown" && shouldHide(escToHide))
      )
        hide(e);
    },
    [hide]
  );

  const Portal = useCallback(
    createPortal(
      containerId,
      autoRemoveContainer,
      !internalShowHide || isShow,
      handleHide,
      handleHide
    ),
    [internalShowHide, isShow]
  );

  return { Portal, isShow, show, hide, toggle };
};

export default usePortal;
