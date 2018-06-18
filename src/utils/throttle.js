//undescore.js throttle

const _fnNow = Date.now || function() {
  return new Date().getTime();
};

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.

const throttle = function(func, wait, options={}) {
  //var timeout, context, args, result;
  let timeout, context, args, result;
  //var previous = 0;
  let previous = 0;
  //if (!options) options = {};

  //var later = function() {
  const later = function() {
    previous = options.leading === false
       ? 0 : _fnNow();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  //var throttled = function() {
  const throttled = function(...inArgs) {
    //var now = _fnNow();
    const now = _fnNow();
    if (!previous && options.leading === false) previous = now;
    //var remaining = wait - (now - previous);
    const remaining = wait - (now - previous);
    context = this;
    //args = arguments;
    args = inArgs;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};

export default throttle
