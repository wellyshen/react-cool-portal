import { ReactNode, ReactPortal, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import delay from "./delay";

interface Callback<T extends MouseEvent | KeyboardEvent> {
  (event: T): void;
}
export interface Props {
  children: ReactNode;
}

const createEl = (id: string): HTMLDivElement => {
  const el = document.createElement("div");
  el.setAttribute("id", id);
  document.body.appendChild(el);

  return el;
};

export default (
  id: string,
  isShow: boolean,
  clickOutsideCb?: Callback<MouseEvent>,
  escCb?: Callback<KeyboardEvent>
) => ({ children }: Props): ReactPortal | null => {
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (!isShow) return () => null;

    setContainer(document.getElementById(id) || createEl(id));

    return () => {
      if (!container) return;

      delay(() => {
        if (container.innerHTML === "") container.remove();
      });
    };
  }, [container]);

  useEffect(() => {
    if (!isShow || !container) return () => null;

    const handleClick = (e: MouseEvent) => {
      // @ts-expect-error
      if (!container.contains(e.target as HTMLElement)) clickOutsideCb(e);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      // @ts-expect-error
      if (e.keyCode === 27) escCb(e);
    };

    if (clickOutsideCb) document.addEventListener("click", handleClick);
    if (escCb) document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (clickOutsideCb) document.removeEventListener("click", handleClick);
      if (escCb) document.removeEventListener("keydown", handleKeyDown);
    };
  }, [container]);

  return isShow && container ? createPortal(children, container) : null;
};
