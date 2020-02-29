export default (cb: () => void, delay = 100): void => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    cb();
  }, delay);
};
