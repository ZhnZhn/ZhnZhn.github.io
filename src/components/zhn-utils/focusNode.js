
const _isFn = fn => typeof fn === 'function';

const focusNode = n => {
  if (n && _isFn(n.focus)) {
    n.focus()
  }
};

export default focusNode
