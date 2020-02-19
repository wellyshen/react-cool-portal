import { SFC, useState, useMemo, useCallback } from 'react';

import createPortal, { Props } from './createPortal';

interface Args {
  containerId?: string;
}
interface Return {
  Portal: SFC<Props>;
  portalIsShow: boolean;
  showPortal: () => void;
  hidePortal: () => void;
  togglePortal: () => void;
}

const usePortal = ({
  containerId = 'react-cool-portal'
}: Args = {}): Return => {
  const [isShow, setIsShow] = useState(true);

  const Portal = useMemo(() => createPortal(containerId, isShow), [
    containerId,
    isShow
  ]);

  const showPortal = useCallback((): void => {
    setIsShow(true);
  }, []);

  const hidePortal = useCallback((): void => {
    setIsShow(false);
  }, []);

  const togglePortal = useCallback((): void => {
    setIsShow(!isShow);
  }, [isShow]);

  return { Portal, portalIsShow: isShow, showPortal, hidePortal, togglePortal };
};

export default usePortal;
