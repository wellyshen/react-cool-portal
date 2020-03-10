import React, { SFC } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import usePortal from '../../src';
import {
  root,
  container,
  title,
  btn,
  tip,
  tipFadeOut,
  tipHeader,
  tipBody,
  arrow
} from './styles';

const App: SFC<{}> = () => {
  const { Portal, isShow, show, hide } = usePortal({
    defaultShow: false,
    delayToHide: 300
  });

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
        <p>
          {
            'React hook for Portals, which renders modals, dropdowns, tooltips etc. to <body> or else.'
          }
        </p>
        <button css={btn} onClick={show} type="button">
          Show Tooltip
        </button>
        <Portal>
          <div css={[tip, !isShow && tipFadeOut]}>
            <div css={tipHeader}>
              {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
              <h3>👋🏻 Hola</h3>
              <button onClick={hide} type="button">
                ×
              </button>
            </div>
            <div css={tipBody}>
              You can also close me by clicking outside of the portal.
            </div>
            <div css={arrow} />
          </div>
        </Portal>
      </div>
    </>
  );
};

export default App;
