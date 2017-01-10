
export const isFunction = (fn) => {
  return (typeof fn === 'function')
}

const is = {
  function : isFunction
}

export default is
