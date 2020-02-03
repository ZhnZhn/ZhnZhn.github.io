
const zhIsAnimation = function() {
  return ((this.userOptions || {}).zhConfig || {}).withoutAnimation
    ? false
    : true;
};

export default zhIsAnimation
