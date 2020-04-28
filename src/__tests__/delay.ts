import delay from '../delay';

describe('delay', () => {
  jest.useFakeTimers();

  it('should trigger callback when time is up', () => {
    const cb = jest.fn();
    // @ts-ignore
    delay(cb);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalled();
  });

  it('should trigger callback according to a specific time', () => {
    const cb = jest.fn();
    const time = 500;
    // @ts-ignore
    delay(cb, time);
    jest.advanceTimersByTime(time - 1);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(cb).toHaveBeenCalled();
  });
});
