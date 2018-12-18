
export const isFn = fn => typeof fn === 'function';

export const isKeyEscape = evt => evt.keyCode === 27
 || evt.key === 'Escape';

export const focusNode = n => {
  if (n && isFn(n.focus)) {
    n.focus()
  }
};

const utils = {
  isFn,
  isKeyEscape,
  focusNode
};

export default utils
