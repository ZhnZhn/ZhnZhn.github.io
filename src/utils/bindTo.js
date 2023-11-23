
const FN_NOOP = () => {};

export const bindTo = (
  fn,
  ...args
) => (fn || FN_NOOP).bind(null, ...args)
