import React, { FC, MouseEvent, useState, useEffect } from "react";
import { Global, css } from "@emotion/core";
import normalize from "normalize.css";

import GitHubCorner from "../GitHubCorner";
import usePortal from "../../src";
import {
  root,
  container,
  title,
  subtitle,
  btn,
  modal,
  modalFadeOut,
  modalDialog,
  modalContent,
  modalHeader,
  modalTitle,
  modalClose,
  modalBody,
} from "./styles";

const App: FC = () => {
  const [isFadeOut, setIsFadeOut] = useState(false);
  const { Portal, show, hide, isShow } = usePortal({
    defaultShow: false,
    escToHide: false,
  });

  const close = (): void => {
    setIsFadeOut(true);
  };

  const handleClickBackdrop = (e: MouseEvent): void => {
    const { id } = e.target as HTMLDivElement;

    if (id === "modal" || id === "modal-dialog") close();
  };

  const handleAnimEnd = (): void => {
    if (!isFadeOut) return;

    setIsFadeOut(false);
    hide();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (isShow && e.keyCode === 27) close();
    };

    document.addEventListener("keydown", handleKeyDown);

    return (): void => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShow]);

  return (
    <>
      <Global
        styles={css`
          ${normalize}
          ${root}
        `}
      />
      <div css={container}>
        <GitHubCorner url="https://github.com/wellyshen/react-cool-portal" />
        <h1 css={title}>REACT COOL PORTAL</h1>
        <p css={subtitle}>
          {
            "React hook for Portals, which renders modals, dropdowns, tooltips etc. to <body> or else."
          }
        </p>
        <button css={btn} onClick={show} type="button">
          OPEN MODAL
        </button>
        <Portal>
          <div
            id="modal"
            css={[modal, isFadeOut && modalFadeOut]}
            onClick={handleClickBackdrop}
            onAnimationEnd={handleAnimEnd}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div id="modal-dialog" css={modalDialog} role="document">
              <div css={modalContent}>
                <div css={modalHeader}>
                  <h5 css={modalTitle} id="exampleModalLabel">
                    <span role="img" aria-label="Hello">
                      👋🏻
                    </span>{" "}
                    Hola
                  </h5>
                  <button
                    css={modalClose}
                    onClick={close}
                    type="button"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div css={modalBody}>
                  <p>
                    You can also close me by pressing the &quot;ESC&quot; key.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      </div>
    </>
  );
};

export default App;
