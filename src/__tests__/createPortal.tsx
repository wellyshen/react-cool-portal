import React from 'react';
import { render } from '@testing-library/react';

import createPortal from '../createPortal';

describe('createPortal', () => {
  const defaultId = 'react-cool-portal';

  interface Args {
    containerId?: string;
    isShow?: boolean;
  }
  interface Return {
    clickOutsideCb: Function;
    escCb: Function;
    baseElement: any;
  }

  const renderHelper = ({
    containerId = defaultId,
    isShow = true
  }: Args = {}): Return => {
    const clickOutsideCb = jest.fn();
    const escCb = jest.fn();
    const Portal = createPortal(containerId, isShow, clickOutsideCb, escCb);
    const { baseElement } = render(
      <Portal>
        <div>Test</div>
      </Portal>
    );

    return { clickOutsideCb, escCb, baseElement };
  };

  it('should render correctly', () => {
    const { baseElement } = renderHelper();
    expect(baseElement).toMatchSnapshot();
  });

  it('should not render child', () => {
    const { baseElement } = renderHelper({ isShow: false });
    expect(baseElement).toMatchSnapshot();
  });
});
