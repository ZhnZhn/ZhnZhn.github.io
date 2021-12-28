"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var FN_NOOP = function FN_NOOP() {};

var useThrottleClick = function useThrottleClick(timeout, onClick) {
  if (timeout === void 0) {
    timeout = 0;
  }

  if (onClick === void 0) {
    onClick = FN_NOOP;
  }

  var _refTimeStamp = (0, _react.useRef)(null);

  return (0, _react.useCallback)(function (event) {
    if (timeout === 0) {
      onClick(event);
      return;
    }

    var _timeStampPrev = _refTimeStamp.current,
        timeStamp = event.timeStamp;

    if (_timeStampPrev == null || timeStamp - _timeStampPrev > timeout) {
      onClick(event);
      _refTimeStamp.current = timeStamp;
    }
  }, [timeout, onClick]);
};

var _default = useThrottleClick;
exports.default = _default;
//# sourceMappingURL=useThrottleClick.js.map