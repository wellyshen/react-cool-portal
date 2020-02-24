import {
  SyntheticEvent,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';

import createPortal, { Portal } from './createPortal';

interface EventCallback<T extends SyntheticEvent | Event = SyntheticEvent> {
  (event?: T): void;
}
interface SetVisible<T extends SyntheticEvent | Event = SyntheticEvent> {
  (val: boolean, event?: T): void;
}
interface Args {
  containerId?: string;
  onShow?: EventCallback;
  onHide?: EventCallback;
  clickOutsideToClose?: boolean;
}
interface Return {
  Portal: Portal;
  visible: boolean;
  setVisible: SetVisible;
}

const usePortal = ({
  containerId = 'react-cool-portal',
  onShow,
  onHide,
  clickOutsideToClose = true
}: Args = {}): Return => {
  const [visible, updateVisible] = useState(true);
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

  const handleClickOutside = useCallback(
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
        if (onShow && !val) onShowRef.current(e);
        if (onHide && val) onHideRef.current(e);
      },
      [clickOutsideToClose, visible, setSkipClickOutside, onShow, onHide]
    ),
    Portal: useMemo(
      () =>
        createPortal(
          containerId,
          visible,
          clickOutsideToClose &&
            !skipClickOutsideRef.current &&
            handleClickOutside
        ),
      [containerId, visible, clickOutsideToClose, handleClickOutside]
    )
  };
};

export default usePortal;
