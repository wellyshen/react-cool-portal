/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

import React, { SFC, useState } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import usePortal from '../../src';
import { root, container, title, subtitle } from './styles';

const App: SFC<{}> = () => {
  const [show, setShow] = useState(true);
  const { Portal } = usePortal();

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
          React hook to listen for clicks outside of the component(s).
        </p>
        <button
          onClick={() => {
            setShow(!show);
          }}
          type="button"
        >
          Btn
        </button>
        {show && (
          <Portal>
            {/* <div
              style={{
                background: 'blue',
                display: 'inline-block',
                padding: '1rem'
              }}
            >
              I am Tooltip!
            </div> */}
            I am Tooltip!
          </Portal>
        )}
      </div>
    </>
  );
};

export default App;
