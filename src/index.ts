import { SFC, useEffect } from 'react';

import createPortal, { Props } from './createPortal';

const usePortal = (containerId?: string): { Portal: SFC<Props> } => {
  useEffect(() => {
    // ...
  }, []);

  return { Portal: createPortal(containerId) };
};

export default usePortal;
