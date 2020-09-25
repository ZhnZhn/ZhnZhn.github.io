"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useForceUpdate = _interopRequireDefault(require("../hooks/useForceUpdate"));

var CL = "progress-line",
    TM_PERIOD = 800,
    T = {
  WIDTH: 'width 350ms linear',
  OPACITY: 'opacity 250ms linear'
};

var _crStyle = function _crStyle(backgroundColor, opacity, width, transition) {
  return {
    backgroundColor: backgroundColor,
    width: width,
    opacity: opacity,
    transition: transition
  };
};

var _getCurrent = function _getCurrent(ref) {
  return ref.current;
};

var ProgressLine = function ProgressLine(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#2f7ed8' : _ref$color,
      completed = _ref.completed;

  var forceUpdate = (0, _useForceUpdate["default"])()[1],
      _refWasCompleted = (0, _react.useRef)(false),
      _refIdCompleted = (0, _react.useRef)(null),
      _refWasOpacied = (0, _react.useRef)(false),
      _refIdOpacied = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    if (_getCurrent(_refWasCompleted)) {
      _refIdCompleted.current = setTimeout(forceUpdate, TM_PERIOD);
    } else if (_getCurrent(_refWasOpacied)) {
      _refIdOpacied.current = setTimeout(forceUpdate, TM_PERIOD);
    }
  });
  (0, _react.useEffect)(function () {
    return function () {
      clearTimeout(_getCurrent(_refIdCompleted));
      clearTimeout(_getCurrent(_refIdOpacied));
    };
  }, []);

  var _style;

  if (_getCurrent(_refWasOpacied)) {
    _style = _crStyle(color, 1, 0);
    _refWasOpacied.current = false;
  } else if (_getCurrent(_refWasCompleted)) {
    _style = _crStyle(color, 0, '100%', T.OPACITY);
    _refWasCompleted.current = false;
    _refWasOpacied.current = true;
  } else {
    if (completed < 0) {
      completed = 0;
    } else if (completed >= 100) {
      completed = 100;
      _refWasCompleted.current = true;
    }

    _style = _crStyle(color, 1, completed + '%', T.WIDTH);
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: CL,
    style: _style
  });
};
/*
ProgressLine.propTypes = {
  color: PropTypes.string,
  completed: PropTypes.number
}
*/


var _default = ProgressLine;
exports["default"] = _default;
//# sourceMappingURL=ProgressLine.js.map