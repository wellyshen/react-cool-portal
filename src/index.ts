import {
  SyntheticEvent,
  MouseEvent as ReactMouseEvent,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';

import delay from './delay';
import createPortal, { Portal as PortalType } from './createPortal';

let isHidingPortal = false;

interface RCPF<T extends SyntheticEvent | Event = ReactMouseEvent> {
  (event?: T): void;
}
interface Args {
  containerId?: string;
  defaultShow?: boolean;
  onShow?: RCPF;
  onHide?: RCPF<ReactMouseEvent | MouseEvent | KeyboardEvent>;
  clickOutsideToHide?: boolean;
  escToHide?: boolean;
  delayToHide?: number;
}
interface Return {
  readonly Portal: PortalType;
  readonly isShow: boolean;
  readonly show: RCPF;
  readonly hide: RCPF;
  readonly toggle: RCPF;
}

const usePortal = ({
  containerId = 'react-cool-portal',
  defaultShow = true,
  onShow,
  onHide,
  clickOutsideToHide = true,
  escToHide = true,
  delayToHide = 0
}: Args = {}): Return => {
  const [isShow, setIsShow] = useState(defaultShow);
  const [showPortal, setShowPortal] = useState(defaultShow);
  const skipClickOutsideRef = useRef(false);
  const onShowRef = useRef(null);
  const onHideRef = useRef(null);

  useEffect(() => {
    if (onShow) onShowRef.current = onShow;
  }, [onShow]);

  useEffect(() => {
    if (onHide) onHideRef.current = onHide;
  }, [onHide]);

  const setSkipClickOutside = useCallback((): void => {
    if (!clickOutsideToHide || !isShow) return;

    skipClickOutsideRef.current = true;
    delay(() => {
      skipClickOutsideRef.current = false;
    });
  }, [clickOutsideToHide, isShow]);

  const handleShowPortal = useCallback(
    (val: boolean): void => {
      if (!delayToHide || val) {
        setShowPortal(val);
        return;
      }

      isHidingPortal = true;
      delay(() => {
        isHidingPortal = false;
        setShowPortal(false);
      }, delayToHide);
    },
    [delayToHide]
  );

  const show = useCallback(
    e => {
      if (isHidingPortal) return;

      setSkipClickOutside();

      if (isShow) return;

      setIsShow(true);
      handleShowPortal(true);
      if (onShow) onShow(e);
    },
    [setSkipClickOutside, isShow, handleShowPortal, onShow]
  );

  const hide = useCallback(
    e => {
      if (isHidingPortal) return;

      setSkipClickOutside();

      if (!isShow) return;

      setIsShow(false);
      handleShowPortal(false);
      if (onHide) onHide(e);
    },
    [setSkipClickOutside, isShow, handleShowPortal, onHide]
  );

  const toggle = useCallback(
    e => {
      if (isHidingPortal) return;

      setSkipClickOutside();

      setIsShow(!isShow);
      handleShowPortal(!isShow);
      if (onShow && !isShow) onShow(e);
      if (onHide && isShow) onHide(e);
    },
    [setSkipClickOutside, isShow, handleShowPortal, onShow, onHide]
  );

  const handleHide = useCallback(
    e => {
      if (!skipClickOutsideRef.current) hide(e);
    },
    [hide]
  );

  const Portal = useMemo(
    () =>
      createPortal(
        containerId,
        showPortal,
        clickOutsideToHide && handleHide,
        escToHide && handleHide
      ),
    [containerId, showPortal, clickOutsideToHide, escToHide, handleHide]
  );

  return { isShow, show, hide, toggle, Portal };
};

export default usePortal;
