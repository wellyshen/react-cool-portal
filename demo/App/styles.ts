import { css, keyframes } from '@emotion/core';

import mq from '../utils/mq';

const { sm, md, lg } = mq;

export const root = css`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

export const container = css`
  padding: 5rem 5%;
  text-align: center;
  ${sm} {
    padding-left: 10%;
    padding-right: 10%;
  }
  ${md} {
    padding-left: 12.5%;
    padding-right: 12.5%;
  }
  ${lg} {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

export const title = css`
  margin: 0 0 0.75rem;
`;

export const btn = css`
  position: absolute;
  top: 21.6rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  border-color: #6c757d;
  border-radius: 0.25rem;
  line-height: 1.5;
  color: #fff;
  background: #6c757d;
  transform: translate(-50%);
  cursor: pointer;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    border-color: #545b62;
    background: #5a6268;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5);
  }
`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const tip = css`
  position: absolute;
  top: 14rem;
  left: 50%;
  width: 90%;
  max-width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  color: #212529;
  background: #fff;
  transform: translate(-50%);
  animation: ${fade} 0.3s;
`;

export const tipFadeOut = css`
  animation-direction: reverse;
`;

export const tipHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
  h3 {
    margin: 0;
  }
  button {
    border: none;
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 0 1px 0 #fff;
    color: #000;
    background: none;
    opacity: 0.5;
    cursor: pointer;
    user-select: none;
    &:hover {
      opacity: 0.75;
    }
    &:focus {
      outline: none;
    }
  }
`;

export const tipBody = css`
  padding: 0.75rem;
`;

export const arrow = css`
  position: absolute;
  left: 50%;
  bottom: calc(-0.5rem - 1px);
  width: 1rem;
  height: 0.5rem;
  transform: translate(-50%);
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-color: transparent;
    border-style: solid;
    border-width: 0.5rem 0.5rem 0;
  }
  &::before {
    border-top-color: rgba(0, 0, 0, 0.25);
  }
  &::after {
    bottom: 1px;
    border-top-color: #fff;
  }
`;
