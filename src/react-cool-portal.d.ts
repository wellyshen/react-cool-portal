declare module "react-cool-portal" {
  import {
    SyntheticEvent,
    MouseEvent as ReactMouseEvent,
    FC,
    ReactNode,
  } from "react";

  export interface OnShow<T extends SyntheticEvent | Event = ReactMouseEvent> {
    (event: T): void;
  }

  export type OnHide = OnShow<ReactMouseEvent | MouseEvent | KeyboardEvent>;

  export interface RCPF<T extends SyntheticEvent | Event = ReactMouseEvent> {
    (event?: T): void;
  }

  interface Args {
    containerId?: string;
    defaultShow?: boolean;
    clickOutsideToHide?: boolean;
    escToHide?: boolean;
    internalShowHide?: boolean;
    onShow?: OnShow;
    onHide?: OnHide;
  }

  interface Return {
    readonly Portal: FC<{ children: ReactNode }>;
    readonly isShow: boolean;
    readonly show: RCPF;
    readonly hide: RCPF;
    readonly toggle: RCPF;
  }

  const usePortal: (args?: Args) => Return;

  export default usePortal;
}
