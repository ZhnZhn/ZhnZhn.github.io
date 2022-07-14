
const DF_PERIOD = 800;

const _getNowTime = Date.now
 || (() => new Date.getTime());

const throttleFn = (
  fn,
  period=DF_PERIOD
) => {
   let prevTime = 0;
   return function throttled (...args) {
     const nowTime = _getNowTime();
     if (nowTime - prevTime > period) {
       prevTime = nowTime
       return fn(...args);
     }
   }
}

export default throttleFn
