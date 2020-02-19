import { SFC, ReactNode, ReactPortal, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const createEl = (id: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  document.body.appendChild(el);

  return el;
};

export interface Props {
  children: ReactNode;
}

export default (containerId?: string): SFC<Props> => ({
  children
}: Props): ReactPortal => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const id = containerId || 'react-cool-portal';
    setContainer(document.getElementById(id) || createEl(id));

    return (): void => {
      if (!container) return;

      const timer = setTimeout(() => {
        clearTimeout(timer);
        if (container.innerHTML === '') container.remove();
      }, 100);
    };
  }, [container]);

  return container && createPortal(children, container);
};
