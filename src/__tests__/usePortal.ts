import { renderHook, act } from '@testing-library/react-hooks';

import createPortal from '../createPortal';
import usePortal, { defaultContainerId, initShow } from '..';

jest.mock('../createPortal', () => jest.fn());

describe('usePortal', () => {
  const e = { test: 'test' };

  it('should create Portal with default parameters correctly', () => {
    renderHook(() => usePortal());
    expect(createPortal).toBeCalledWith(
      defaultContainerId,
      initShow,
      expect.any(Function),
      expect.any(Function)
    );
  });

  it('should create Portal correctly', () => {
    const containerId = 'my-portal-root';
    const defaultShow = false;
    const clickOutsideToHide = false;
    const escToHide = false;
    renderHook(() =>
      usePortal({ containerId, defaultShow, clickOutsideToHide, escToHide })
    );
    expect(createPortal).toBeCalledWith(
      containerId,
      defaultShow,
      clickOutsideToHide,
      escToHide
    );
  });

  it('should disable internal show/hide function', () => {
    const params = [
      defaultContainerId,
      true,
      expect.any(Function),
      expect.any(Function)
    ];
    const { result } = renderHook(() => usePortal({ internalShowHide: false }));
    expect(createPortal).toBeCalledWith(...params);

    act(() => {
      result.current.hide();
    });
    expect(createPortal).toBeCalledWith(...params);
  });

  it('should return default isShow correctly', () => {
    let { result } = renderHook(() => usePortal());
    expect(result.current.isShow).toBeTruthy();

    result = renderHook(() => usePortal({ defaultShow: false })).result;
    expect(result.current.isShow).toBeFalsy();
  });

  it('should return isShow correctly', () => {
    const { result } = renderHook(() => usePortal());

    act(() => {
      result.current.hide();
    });
    expect(result.current.isShow).toBeFalsy();

    act(() => {
      result.current.show();
    });
    expect(result.current.isShow).toBeTruthy();

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isShow).toBeFalsy();
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isShow).toBeTruthy();
  });

  it('should trigger onShow correctly', () => {
    const onShow = jest.fn();
    const { result } = renderHook(() => usePortal({ onShow }));
    act(() => {
      result.current.show();
    });
    expect(onShow).not.toBeCalled();

    act(() => {
      result.current.hide();
    });
    act(() => {
      // @ts-ignore
      result.current.show(e);
    });
    expect(onShow).toBeCalledWith(e);

    act(() => {
      result.current.toggle();
    });
    act(() => {
      // @ts-ignore
      result.current.toggle(e);
    });
    expect(onShow).toBeCalledWith(e);
  });

  it('should trigger onHide correctly', () => {
    const onHide = jest.fn();
    const { result } = renderHook(() =>
      usePortal({ defaultShow: false, onHide })
    );
    act(() => {
      result.current.hide();
    });
    expect(onHide).not.toBeCalled();

    act(() => {
      result.current.show();
    });
    act(() => {
      // @ts-ignore
      result.current.hide(e);
    });
    expect(onHide).toBeCalledWith(e);

    act(() => {
      result.current.toggle();
    });
    act(() => {
      // @ts-ignore
      result.current.toggle(e);
    });
    expect(onHide).toBeCalledWith(e);
  });
});
