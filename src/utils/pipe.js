import compose from './compose'

const pipe = (...fns) => {
  if (fns.length === 0) {
    return arg => arg;
  }
  if (fns.length === 1){
    return fns[0];
  }
  return compose(...fns.slice().reverse());
}

export default pipe
