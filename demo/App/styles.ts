import { css, keyframes } from "@emotion/react";

import mq from "../utils/mq";

const { sm, md, lg } = mq;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50px);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

export const root = css`
  body {
    font-family: "Roboto", sans-serif;

    h1 {
      font-family: "Bungee Shade", cursive;
    }
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
  margin: 0 0 1rem;
  font-size: 8vw;
  ${md} {
    font-size: 4vw;
  }
`;

export const subtitle = css`
  margin: 0 0 5rem;
  ${md} {
    font-size: 1.5vw;
  }
`;

export const btn = css`
  padding: 1rem 2rem;
  border: none;
  border-color: #6c757d;
  line-height: 1.5;
  font-size: 1.25rem;
  color: #fff;
  background: #000;
  cursor: pointer;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background: #333;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(130, 138, 145, 0.5);
  }
`;

export const modalDialog = css`
  animation: ${slideIn} 0.3s ease-out;
`;

export const modal = css`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.3s linear;
`;

export const modalFadeOut = css`
  animation-name: ${fadeOut};
  .css-${modalDialog.name} {
    animation-name: ${slideOut};
  }
`;

export const modalContent = css`
  margin: 1.75rem auto;
  width: 90%;
  max-width: 500px;
  background: #fff;
  background-clip: padding-box;
  border: 3px solid rgba(0, 0, 0, 0.2);
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 3px dashed #dee2e6;
`;

export const modalTitle = css`
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.5;
`;

export const modalClose = css`
  margin: -1rem -0.5rem -1rem;
  padding: 0.5rem 1rem;
  border: none;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  background: inherit;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }
`;

export const modalBody = css`
  padding: 1rem;
`;
