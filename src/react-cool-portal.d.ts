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

  export interface Args {
    containerId?: string;
    autoRemoveContainer?: boolean;
    defaultShow?: boolean;
    clickOutsideToHide?: boolean | string[];
    escToHide?: boolean | string[];
    internalShowHide?: boolean;
    onShow?: OnShow;
    onHide?: OnHide;
  }

  export interface Return {
    Portal: FC<{ children: ReactNode }>;
    isShow: boolean;
    show: RCPF;
    hide: RCPF;
    toggle: RCPF;
  }

  const usePortal: (args?: Args) => Return;

  export default usePortal;
}
