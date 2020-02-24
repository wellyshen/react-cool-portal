import React, { SFC } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import usePortal from '../../src';
import { root, container, title, subtitle } from './styles';

const App: SFC<{}> = () => {
  const { Portal, isShow, show, hide, toggle } = usePortal({
    containerId: 'portal',
    onShow: e => {
      console.log('LOG ===> onShow: ', e);
    },
    onHide: e => {
      console.log('LOG ===> onHide: ', e);
    }
  });
  console.log('LOG ===> isShow: ', isShow);

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
        <button onClick={show} type="button">
          Show
        </button>
        <button onClick={hide} type="button">
          Hide
        </button>
        <button onClick={toggle} type="button">
          Toggle
        </button>
        <Portal>
          <div
            style={{
              position: 'absolute',
              top: '0',
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
