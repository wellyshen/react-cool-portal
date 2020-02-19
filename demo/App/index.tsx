/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

import React, { SFC, useState } from 'react';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';

import GitHubCorner from '../GitHubCorner';
import usePortal from '../../src';
import { root, container, title, subtitle } from './styles';

const App: SFC<{}> = () => {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const { Portal: Portal1 } = usePortal('my-port');
  const { Portal: Portal2 } = usePortal('my-port');

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
            setShow1(!show1);
          }}
          type="button"
        >
          Btn1
        </button>
        {show1 && (
          <Portal1>
            <div>I am Tooltip1!</div>
          </Portal1>
        )}
        <button
          onClick={() => {
            setShow2(!show2);
          }}
          type="button"
        >
          Btn2
        </button>
        {show2 && (
          <Portal2>
            <div>I am Tooltip2!</div>
          </Portal2>
        )}
      </div>
    </>
  );
};

export default App;
