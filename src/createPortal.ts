import { ReactNode, FC, ReactPortal, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import delay from "./delay";

interface Callback<T extends MouseEvent | KeyboardEvent> {
  (event: T): void | false;
}
interface Props {
  children: ReactNode;
}
export type Portal = FC<Props>;

const createEl = (id: string): HTMLDivElement => {
  const el = document.createElement("div");
  el.setAttribute("id", id);
  document.body.appendChild(el);

  return el;
};

export default (
  id: string,
  isShow: boolean,
  clickOutsideCb: Callback<MouseEvent>,
  escCb: Callback<KeyboardEvent>
): Portal => ({ children }: Props): ReactPortal => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    if (!isShow) return (): void => null;

    setContainer(document.getElementById(id) || createEl(id));

    return (): void => {
      if (!container) return;

      delay(() => {
        if (container.innerHTML === "") container.remove();
      });
    };
  }, [container]);

  useEffect(() => {
    if (!isShow || !container) return (): void => null;

    const handleClick = (e: MouseEvent): void => {
      if (!container.contains(e.target)) clickOutsideCb(e);
    };
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.keyCode === 27) escCb(e);
    };

    if (clickOutsideCb) document.addEventListener("click", handleClick);
    if (escCb) document.addEventListener("keydown", handleKeyDown);

    return (): void => {
      if (clickOutsideCb) document.removeEventListener("click", handleClick);
      if (escCb) document.removeEventListener("keydown", handleKeyDown);
    };
  }, [container]);

  return isShow && container && createPortal(children, container);
};
