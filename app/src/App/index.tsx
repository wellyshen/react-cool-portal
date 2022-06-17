import type { FC, MouseEvent } from "react";
import { useState, useEffect } from "react";
import usePortal from "react-cool-portal";

import GitHubCorner from "../GitHubCorner";
import styles from "./styles.module.scss";

const App: FC = () => {
  const [isFadeOut, setIsFadeOut] = useState(false);
  const { Portal, show, hide, isShow } = usePortal({
    defaultShow: false,
    escToHide: false,
  });

  const close = () => {
    setIsFadeOut(true);
  };

  const handleClickBackdrop = (e: MouseEvent) => {
    const { id } = e.target as HTMLDivElement;

    if (id === "modal" || id === "modal-dialog") close();
  };

  const handleAnimEnd = () => {
    if (!isFadeOut) return;

    setIsFadeOut(false);
    hide();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isShow && e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShow]);

  return (
    <div className={styles.container}>
      <GitHubCorner url="https://github.com/wellyshen/react-cool-portal" />
      <h1 className={styles.title}>REACT COOL PORTAL</h1>
      <p className={styles.subtitle}>
        {
          "React hook for Portals, which renders modals, dropdowns, tooltips etc. to <body> or else."
        }
      </p>
      <button className={styles.btn} onClick={show} type="button">
        OPEN MODAL
      </button>
      <Portal>
        <div
          id="modal"
          className={`${styles.modal} ${
            isFadeOut ? styles["modal-fade-out"] : ""
          }`}
          onClick={handleClickBackdrop}
          onAnimationEnd={handleAnimEnd}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            id="modal-dialog"
            className={styles["modal-dialog"]}
            role="document"
          >
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <h5 className={styles["modal-title"]} id="exampleModalLabel">
                  <span role="img" aria-label="Hello">
                    👋🏻
                  </span>{" "}
                  Hola
                </h5>
                <button
                  className={styles["modal-close"]}
                  onClick={close}
                  type="button"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className={styles["modal-body"]}>
                <p>
                  You can also close me by pressing the &quot;ESC&quot; key.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
};

export default App;
