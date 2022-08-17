"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const FN_NOOP = () => {};

const useThrottleClick = function (timeout, onClick) {
  if (timeout === void 0) {
    timeout = 0;
  }

  if (onClick === void 0) {
    onClick = FN_NOOP;
  }

  const _refTimeStamp = (0, _uiApi.useRef)(null);

  return (0, _uiApi.useCallback)(event => {
    if (timeout === 0) {
      onClick(event);
      return;
    }

    const _timeStampPrev = _refTimeStamp.current,
          {
      timeStamp
    } = event;

    if (_timeStampPrev == null || timeStamp - _timeStampPrev > timeout) {
      onClick(event);
      _refTimeStamp.current = timeStamp;
    }
  }, [timeout, onClick]);
};

var _default = useThrottleClick;
exports.default = _default;
//# sourceMappingURL=useThrottleClick.js.map