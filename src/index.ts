import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

import { Args, Return, RCPF } from './types';
import createPortal from './createPortal';

const usePortal = ({
  containerId = 'react-cool-portal',
  onShow,
  onHide,
  clickOutsideToClose = true
}: Args = {}): Return => {
  const [isShow, setIsShow] = useState(true);
  const onShowRef = useRef(null);
  const onHideRef = useRef(null);
  const skipClickOutsideRef = useRef(false);

  useEffect(() => {
    if (onShow) onShowRef.current = onShow;
    if (onHide) onHideRef.current = onHide;
  }, [onShow, onHide]);

  const setSkipClickOutside = useCallback((): void => {
    if (!clickOutsideToClose || !isShow) return;

    skipClickOutsideRef.current = true;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      skipClickOutsideRef.current = false;
    }, 100);
  }, [clickOutsideToClose, isShow]);

  const show: RCPF = useCallback(
    e => {
      setSkipClickOutside();
      if (isShow) return;

      setIsShow(true);
      if (onShow) onShowRef.current(e);
    },
    [setSkipClickOutside, isShow, onShow]
  );

  const hide = useCallback(
    e => {
      setSkipClickOutside();
      if (!isShow) return;

      setIsShow(false);
      if (onHide) onHideRef.current(e);
    },
    [setSkipClickOutside, isShow, onHide]
  );

  const toggle: RCPF = useCallback(
    e => {
      setSkipClickOutside();

      setIsShow(!isShow);
      if (onShow && !isShow) onShowRef.current(e);
      if (onHide && isShow) onHideRef.current(e);
    },
    [setSkipClickOutside, isShow, onShow, onHide]
  );

  const handleClickOutside = useCallback(
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
        clickOutsideToClose &&
          !skipClickOutsideRef.current &&
          handleClickOutside
      ),
    [containerId, isShow, clickOutsideToClose, handleClickOutside]
  );

  return { isShow, show, hide, toggle, Portal };
};

export default usePortal;
