export default (arg: boolean | string[]) =>
  Array.isArray(arg)
    ? arg.every(
        (className) =>
          !Array.from(document.getElementsByClassName(className)).length
      )
    : arg;
