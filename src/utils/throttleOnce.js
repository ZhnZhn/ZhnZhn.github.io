import throttle from './throttle'

const DF_WAIT = 800;
const throttleOnce = (fn, wait=DF_WAIT) => throttle(fn, wait, { trailing: false });

export default throttleOnce
