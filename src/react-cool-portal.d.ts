declare module 'react-cool-portal' {
  import {
    SyntheticEvent,
    MouseEvent as ReactMouseEvent,
    SFC,
    ReactNode
  } from 'react';

  type E = SyntheticEvent | Event;

  export interface EventCallback<T extends E = ReactMouseEvent> {
    (event?: T): void;
  }

  export interface SetVisible<T extends E = ReactMouseEvent> {
    (val: boolean, event?: T): void;
  }

  type Portal = SFC<{ children: ReactNode }>;

  interface Args {
    containerId?: string;
    defaultVisible?: boolean;
    onShow?: EventCallback;
    onHide?: EventCallback<ReactMouseEvent | MouseEvent | KeyboardEvent>;
    clickOutsideToClose?: boolean;
    escToClose?: boolean;
  }

  interface Return {
    readonly Portal: Portal;
    readonly visible: boolean;
    readonly setVisible: SetVisible;
  }

  const usePortal: ({
    containerId,
    defaultVisible,
    onShow,
    onHide,
    clickOutsideToClose,
    escToClose
  }?: Args) => Return;

  export default usePortal;
}
