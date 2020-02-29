export default (cb: Function, delay = 100): void => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    cb();
  }, delay);
};
