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

  const handleClickModalContent = (e: MouseEvent): void => {
    e.stopPropagation();
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
            css={[modal, !isShow && modalFadeOut]}
            onClick={hide}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              css={[modalDialog, !isShow && modalDialogSlideOut]}
              role="document"
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div css={modalContent} onClick={handleClickModalContent}>
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
