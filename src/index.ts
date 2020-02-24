import {
  SyntheticEvent,
  MouseEvent as ReactMouseEvent,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';

import createPortal, { Portal } from './createPortal';

type E = SyntheticEvent | Event;
interface EventCallback<T extends E = ReactMouseEvent> {
  (event?: T): void;
}
interface SetVisible<T extends E = ReactMouseEvent> {
  (val: boolean, event?: T): void;
}
interface Args {
  containerId?: string;
  defaultVisible?: boolean;
  onShow?: EventCallback;
  onHide?: EventCallback<ReactMouseEvent | MouseEvent | KeyboardEvent>;
  clickOutsideToClose?: boolean;
  escToClose?: boolean;
}
interface Return {
  readonly Portal: Portal;
  readonly visible: boolean;
  readonly setVisible: SetVisible;
}

const usePortal = ({
  containerId = 'react-cool-portal',
  defaultVisible = true,
  onShow,
  onHide,
  clickOutsideToClose = true,
  escToClose = true
}: Args = {}): Return => {
  const [visible, updateVisible] = useState(defaultVisible);
  const onShowRef = useRef(null);
  const onHideRef = useRef(null);
  const skipClickOutsideRef = useRef(false);

  useEffect(() => {
    if (onShow) onShowRef.current = onShow;
    if (onHide) onHideRef.current = onHide;
  }, [onShow, onHide]);

  const setSkipClickOutside = useCallback((): void => {
    skipClickOutsideRef.current = true;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      skipClickOutsideRef.current = false;
    }, 100);
  }, []);

  const handleClose = useCallback(
    e => {
      if (skipClickOutsideRef.current) return;

      updateVisible(false);
      if (onHide) onHideRef.current(e);
    },
    [onHide]
  );

  return {
    visible,
    setVisible: useCallback(
      (val, e) => {
        if (clickOutsideToClose && visible) setSkipClickOutside();

        updateVisible(val);
        if (onShow && !visible && val) onShowRef.current(e);
        if (onHide && visible && !val) onHideRef.current(e);
      },
      [clickOutsideToClose, visible, setSkipClickOutside, onShow, onHide]
    ),
    Portal: useMemo(
      () =>
        createPortal(
          containerId,
          visible,
          clickOutsideToClose && handleClose,
          escToClose && handleClose
        ),
      [containerId, visible, clickOutsideToClose, escToClose, handleClose]
    )
  };
};

export default usePortal;
