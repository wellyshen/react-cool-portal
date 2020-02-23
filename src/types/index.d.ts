import { SFC, SyntheticEvent, ReactNode } from 'react';

export interface RCPF<T extends SyntheticEvent | Event = SyntheticEvent> {
  (event?: T): void;
}

export interface Args {
  containerId?: string;
  onShow?: RCPF;
  onHide?: RCPF;
  onClickOutside?: boolean;
}

export interface Return {
  Portal: SFC<Props>;
  isShow: boolean;
  show: RCPF;
  hide: RCPF;
  toggle: RCPF;
}

export interface Props {
  children: ReactNode;
}
