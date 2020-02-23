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

  const show: RCPF = useCallback(
    e => {
      if (onClickOutside && isShow) setSkipClickOutside(true);
      if (isShow) return;

      setIsShow(true);
      if (onShow) onShowRef.current(e);
    },
    [onClickOutside, isShow, onShow]
  );

  const hide = useCallback(
    e => {
      if (onClickOutside && isShow) setSkipClickOutside(true);
      if (!isShow) return;

      setIsShow(false);
      if (onHide) onHideRef.current(e);
    },
    [onClickOutside, isShow, onHide]
  );

  const toggle: RCPF = useCallback(
    e => {
      if (onClickOutside && isShow) setSkipClickOutside(true);

      setIsShow(!isShow);
      if (onShow && !isShow) onShowRef.current(e);
      if (onHide && isShow) onHideRef.current(e);
    },
    [onClickOutside, isShow, onShow, onHide]
  );

  const Portal = useMemo(
    () =>
      createPortal(
        containerId,
        isShow,
        onClickOutside && !skipClickOutside && isShow && hide
      ),
    [containerId, isShow, onClickOutside, skipClickOutside, hide]
  );

  return { isShow, show, hide, toggle, Portal };
};

export default usePortal;
