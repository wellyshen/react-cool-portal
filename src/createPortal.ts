import { SFC, ReactPortal, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { RCPF, Props } from './types';

const createEl = (id: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  document.body.appendChild(el);

  return el;
};

export default (
  id: string,
  isShow: boolean,
  hide: RCPF<MouseEvent> | false
): SFC<Props> => ({ children }: Props): ReactPortal => {
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
    console.log('LOG ===> Portal rendered!');

    if (!hide || !container) return;

    const handler = (e: MouseEvent): void => {
      if (!container.contains(e.target)) hide(e);
    };

    document.addEventListener('click', handler);

    // eslint-disable-next-line consistent-return
    return (): void => {
      document.removeEventListener('click', handler);
    };
  }, [container]);

  return isShow && container && createPortal(children, container);
};
