import React, { SFC, MouseEvent } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import usePortal from '../../src';
import {
  root,
  container,
  title,
  subtitle,
  btn,
  modal,
  modalFadeOut,
  modalDialog,
  modalDialogSlideOut,
  modalContent,
  modalHeader,
  modalTitle,
  modalClose,
  modalBody
} from './styles';

const App: SFC<{}> = () => {
  const { Portal, isShow, show, hide } = usePortal({
    defaultShow: false,
    delayToHide: 300
  });

  const handleClickBackdrop = (e: MouseEvent): void => {
    const { id } = e.target as HTMLDivElement;

    if (id === 'modal' || id === 'modal-dialog') hide();
  };

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
        <h1 css={title}>React Cool Portal</h1>
        <p css={subtitle}>
          {
            'React hook for Portals, which renders modals, dropdowns, tooltips etc. to <body> or else.'
          }
        </p>
        <button css={btn} onClick={show} type="button">
          Open Modal
        </button>
        <Portal>
          <div
            id="modal"
            css={[modal, !isShow && modalFadeOut]}
            onClick={handleClickBackdrop}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              id="modal-dialog"
              css={[modalDialog, !isShow && modalDialogSlideOut]}
              role="document"
            >
              <div css={modalContent}>
                <div css={modalHeader}>
                  <h5 css={modalTitle} id="exampleModalLabel">
                    <span role="img" aria-label="Hello">
                      👋🏻
                    </span>{' '}
                    Hola
                  </h5>
                  <button
                    css={modalClose}
                    onClick={hide}
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
