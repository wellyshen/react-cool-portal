import { ReactNode, ReactPortal, SFC } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

const Portal = (id: string) => ({ children }: Props): ReactPortal =>
  createPortal(children, document.getElementById(id));

const usePortal = (containerId: string): { Portal: SFC<Props> } => {
  return { Portal: Portal(containerId) };
};

export default usePortal;
