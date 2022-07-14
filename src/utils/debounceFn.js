
const debounceFn = (
  fn,
  period
) => {
  let timeId = null;
  return function debounced(...args) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      fn(...args)
      timeId = null
    }, period)
        
    debounced.cancel = function() {
      clearTimeout(timeId)
    }
  }
};

export default debounceFn
