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
  escToHide = true
}: Args = {}): Return => {
  const [isShow, setIsShow] = useState(defaultShow);
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

  const show = useCallback(
    e => {
      setSkipClickOutside();

      if (isShow) return;

      setIsShow(true);
      if (onShow) onShow(e);
    },
    [setSkipClickOutside, isShow, onShow]
  );

  const hide = useCallback(
    e => {
      setSkipClickOutside();

      if (!isShow) return;

      setIsShow(false);
      if (onHide) onHide(e);
    },
    [setSkipClickOutside, isShow, onHide]
  );

  const toggle = useCallback(
    e => {
      if (isShow) {
        hide(e);
      } else {
        show(e);
      }
    },
    [isShow, hide, show]
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
        isShow,
        clickOutsideToHide && handleHide,
        escToHide && handleHide
      ),
    [containerId, isShow, clickOutsideToHide, escToHide, handleHide]
  );

  return { Portal, isShow, show, hide, toggle };
};

export default usePortal;
