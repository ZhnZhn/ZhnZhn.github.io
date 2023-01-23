import compose from './compose';

const flow = (
  ...fns
) => fns.length === 0
  ? arg => arg
  : fns.length === 1
     ? fns[0]
     : compose(...fns.slice().reverse());

export default flow
