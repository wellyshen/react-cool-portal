import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

import { Args, Return, RCPF } from './types';
import createPortal from './createPortal';

const usePortal = ({
  containerId = 'react-cool-portal',
  onShow,
  onHide,
  onClickOutside = true
}: Args = {}): Return => {
  const [isShow, setIsShow] = useState(true);
  const onShowRef = useRef(null);
  const onHideRef = useRef(null);

  useEffect(() => {
    if (onShow) onShowRef.current = onShow;
    if (onHide) onHideRef.current = onHide;
  }, [onShow, onHide]);

  const show: RCPF = useCallback(
    e => {
      if (isShow) return;

      setIsShow(true);
      if (onShow) onShowRef.current(e);
    },
    [isShow, onShow]
  );

  const hide: RCPF = useCallback(
    e => {
      if (!isShow) return;

      setIsShow(false);
      if (onHide) onHideRef.current(e);
    },
    [isShow, onHide]
  );

  const toggle: RCPF = useCallback(
    e => {
      setIsShow(!isShow);
      if (onShow && !isShow) onShowRef.current(e);
      if (onHide && isShow) onHideRef.current(e);
    },
    [isShow, onShow, onHide]
  );

  const Portal = useMemo(
    () => createPortal(containerId, isShow, onClickOutside && hide),
    [containerId, isShow, onClickOutside, hide]
  );

  return { isShow, show, hide, toggle, Portal };
};

export default usePortal;
