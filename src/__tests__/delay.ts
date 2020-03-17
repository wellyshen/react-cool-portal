import delay from '../delay';

describe('delay', () => {
  jest.useFakeTimers();

  it('should trigger callback when time is up', () => {
    const cb = jest.fn();
    // @ts-ignore
    delay(cb);
    expect(cb).not.toBeCalled();
    jest.advanceTimersByTime(100);
    expect(cb).toBeCalled();
  });

  it('should trigger callback according to a specific time', () => {
    const cb = jest.fn();
    const time = 500;
    // @ts-ignore
    delay(cb, time);
    jest.advanceTimersByTime(time - 1);
    expect(cb).not.toBeCalled();
    jest.advanceTimersByTime(time);
    expect(cb).toBeCalled();
  });
});
