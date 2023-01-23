
const pipe = (
  initialValue,
  ...fns
) => fns.reduce(
  (prevValue, fn) => fn(prevValue),
  initialValue
)

export default pipe
