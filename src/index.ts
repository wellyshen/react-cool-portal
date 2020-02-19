import { SFC, useState, useMemo, useCallback } from 'react';

import createPortal, { Props } from './createPortal';

interface Args {
  containerId?: string;
}
interface Return {
  Portal: SFC<Props>;
  isShow: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

const usePortal = ({
  containerId = 'react-cool-portal'
}: Args = {}): Return => {
  const [isShow, setIsShow] = useState(true);

  const Portal = useMemo(() => createPortal(containerId, isShow), [
    containerId,
    isShow
  ]);

  const show = useCallback((): void => {
    setIsShow(true);
  }, []);

  const hide = useCallback((): void => {
    setIsShow(false);
  }, []);

  const toggle = useCallback((): void => {
    setIsShow(!isShow);
  }, [isShow]);

  return { Portal, isShow, show, hide, toggle };
};

export default usePortal;
