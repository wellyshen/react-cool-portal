import {
  SFC,
  SyntheticEvent,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';

import createPortal, { Props } from './createPortal';

interface RCPF<T extends SyntheticEvent | Event = SyntheticEvent> {
  (event?: T): void;
}
interface Args {
  containerId?: string;
  onShow?: RCPF;
  onHide?: RCPF;
}
interface Return {
  Portal: SFC<Props>;
  isShow: boolean;
  show: RCPF;
  hide: RCPF;
  toggle: RCPF;
}

const usePortal = ({
  containerId = 'react-cool-portal',
  onShow,
  onHide
}: Args = {}): Return => {
  const [isShow, setIsShow] = useState(true);
  const onShowRef = useRef(null);
  const onHideRef = useRef(null);

  useEffect(() => {
    if (onShow) onShowRef.current = onShow;
    if (onHide) onHideRef.current = onHide;
  }, [onShow, onHide]);

  const Portal = useMemo(() => createPortal(containerId, isShow), [
    containerId,
    isShow
  ]);

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

  return { Portal, isShow, show, hide, toggle };
};

export default usePortal;
