declare module 'react-cool-portal' {
  import {
    SyntheticEvent,
    MouseEvent as ReactMouseEvent,
    SFC,
    ReactNode
  } from 'react';

  export interface RCPF<T extends SyntheticEvent | Event = ReactMouseEvent> {
    (event?: T): void;
  }

  type Portal = SFC<{ children: ReactNode }>;

  interface Args {
    containerId?: string;
    defaultShow?: boolean;
    onShow?: RCPF;
    onHide?: RCPF<ReactMouseEvent | MouseEvent | KeyboardEvent>;
    clickOutsideToHide?: boolean;
    escToHide?: boolean;
    delayToHide?: number;
  }

  interface Return {
    readonly Portal: Portal;
    readonly isShow: boolean;
    readonly show: RCPF;
    readonly hide: RCPF;
    readonly toggle: RCPF;
  }

  const usePortal: ({
    containerId,
    defaultShow,
    onShow,
    onHide,
    clickOutsideToHide,
    escToHide
  }?: Args) => Return;

  export default usePortal;
}
