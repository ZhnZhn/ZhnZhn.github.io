"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _ProgressLine = _interopRequireDefault(require("../zhn/ProgressLine"));

var C = {
  LOADING: '#2f7ed8',
  FAILED: '#ed5813'
};
var COMPLETE_TIMEOUT_MLS = 450;

var ProgressLoading = function ProgressLoading(_ref) {
  var store = _ref.store,
      ACTIONS = _ref.ACTIONS;

  var _useState = (0, _react.useState)({
    completed: 0,
    color: C.LOADING
  }),
      _useState$ = _useState[0],
      completed = _useState$.completed,
      color = _useState$.color,
      setState = _useState[1];

  (0, _useListen["default"])(store, function (actionType) {
    if (actionType === ACTIONS.LOADING) {
      setState({
        completed: 35,
        color: C.LOADING
      });
    } else if (actionType === ACTIONS.LOADING_COMPLETE) {
      setTimeout(function () {
        return setState({
          completed: 100,
          color: C.LOADING
        });
      }, COMPLETE_TIMEOUT_MLS);
    } else if (actionType === ACTIONS.LOADING_FAILED) {
      setState({
        completed: 100,
        color: C.FAILED
      });
    }
  }, 'listenLoadingProgress');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLine["default"], {
    height: 3,
    color: color,
    completed: completed
  });
};
/*
ProgressLoading.propTypes = {
  store: PropTypes.shape({
    listenLoadingProgress: PropTypes.func
  }),
  ACTIONS: PropTypes.arrayOf(PropTypes.string)
}
*/


var _default = /*#__PURE__*/(0, _react.memo)(ProgressLoading);

exports["default"] = _default;
//# sourceMappingURL=ProgressLoading.js.map