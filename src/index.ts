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
  const [skipClickOutside, setSkipClickOutside] = useState(false);
  const onShowRef = useRef(null);
  const onHideRef = useRef(null);

  useEffect(() => {
    if (skipClickOutside) setSkipClickOutside(false);
  }, [skipClickOutside]);

  useEffect(() => {
    if (onShow) onShowRef.current = onShow;
    if (onHide) onHideRef.current = onHide;
  }, [onShow, onHide]);

  const handleSkipClickOutside = useCallback(() => {
    if (clickOutsideToClose && isShow) setSkipClickOutside(true);
  }, [clickOutsideToClose, isShow]);

  const show: RCPF = useCallback(
    e => {
      handleSkipClickOutside();
      if (isShow) return;

      setIsShow(true);
      if (onShow) onShowRef.current(e);
    },
    [handleSkipClickOutside, isShow, onShow]
  );

  const hide = useCallback(
    e => {
      handleSkipClickOutside();
      if (!isShow) return;

      setIsShow(false);
      if (onHide) onHideRef.current(e);
    },
    [handleSkipClickOutside, isShow, onHide]
  );

  const toggle: RCPF = useCallback(
    e => {
      handleSkipClickOutside();

      setIsShow(!isShow);
      if (onShow && !isShow) onShowRef.current(e);
      if (onHide && isShow) onHideRef.current(e);
    },
    [handleSkipClickOutside, isShow, onShow, onHide]
  );

  const Portal = useMemo(
    () =>
      createPortal(
        containerId,
        isShow,
        clickOutsideToClose && !skipClickOutside && isShow && hide
      ),
    [containerId, isShow, clickOutsideToClose, skipClickOutside, hide]
  );

  return { isShow, show, hide, toggle, Portal };
};

export default usePortal;
