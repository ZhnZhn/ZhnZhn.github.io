
export const isFn = (fn) => {
  return (typeof fn === 'function')
}

const is = {
  fn : isFn
}

export default is
