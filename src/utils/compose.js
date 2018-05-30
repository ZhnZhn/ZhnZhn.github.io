
/**
 * from redux compose
 *
 * @param {...Function} fns The functions to compose.
 * @returns {Function} A function obtained by composing
 * the argument functions from right to left
 *
 * For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 *
 */

const compose = (...fns) => {
  if (fns.length === 0) {
    return arg => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

export default compose
