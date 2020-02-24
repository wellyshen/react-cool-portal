import { ReactNode, SFC, ReactPortal, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}
export type Portal = SFC<Props>;

const createEl = (id: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  document.body.appendChild(el);

  return el;
};

export default (
  id: string,
  visible: boolean,
  cb: (e: MouseEvent) => void | false
): Portal => ({ children }: Props): ReactPortal => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    setContainer(document.getElementById(id) || createEl(id));

    return (): void => {
      if (!container) return;

      const timer = setTimeout(() => {
        clearTimeout(timer);
        if (container.innerHTML === '') container.remove();
      }, 100);
    };
  }, [container]);

  useEffect(() => {
    if (!cb || !visible || !container) return;

    const handler = (e: MouseEvent): void => {
      if (!container.contains(e.target)) cb(e);
    };

    document.addEventListener('click', handler);

    // eslint-disable-next-line consistent-return
    return (): void => {
      document.removeEventListener('click', handler);
    };
  }, [container]);

  return visible && container && createPortal(children, container);
};
