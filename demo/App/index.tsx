import React, { SFC } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import usePortal from '../../src';
import { root, container, title, subtitle } from './styles';

const App: SFC<{}> = () => {
  const {
    Portal,
    portalIsShow,
    showPortal,
    hidePortal,
    togglePortal
  } = usePortal({
    containerId: 'portal'
  });
  console.log('Portal is show: ', portalIsShow);

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
        <button
          onClick={(): void => {
            showPortal();
          }}
          type="button"
        >
          Show
        </button>
        <button
          onClick={(): void => {
            hidePortal();
          }}
          type="button"
        >
          Hide
        </button>
        <button
          onClick={(): void => {
            togglePortal();
          }}
          type="button"
        >
          Toggle
        </button>
        <Portal>
          <div
            style={{
              background: 'blue',
              display: 'inline-block',
              padding: '1rem'
            }}
          >
            I am Tooltip!
          </div>
        </Portal>
      </div>
    </>
  );
};

export default App;
