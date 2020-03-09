"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ProgressLine = _interopRequireDefault(require("../zhn/ProgressLine"));

var C = {
  LOADING: '#2f7ed8',
  FAILED: '#ed5813'
};
var COMPLETE_TIMEOUT_MLS = 450;

var ProgressLoading =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ProgressLoading, _Component);

  function ProgressLoading() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      completed: 0,
      color: C.LOADING
    };

    _this._onStore = function (actionType) {
      var ACTIONS = _this.props.ACTIONS;

      if (actionType === ACTIONS.LOADING) {
        _this.setState({
          completed: 35,
          color: C.LOADING
        });
      } else if (actionType === ACTIONS.LOADING_COMPLETE) {
        setTimeout(function () {
          return _this.setState({
            completed: 100,
            color: C.LOADING
          });
        }, COMPLETE_TIMEOUT_MLS);
      } else if (actionType === ACTIONS.LOADING_FAILED) {
        _this.setState({
          completed: 100,
          color: C.FAILED
        });
      }
    };

    return _this;
  }

  var _proto = ProgressLoading.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listenLoadingProgress(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.state.completed === nextState.completed) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$state = this.state,
        completed = _this$state.completed,
        color = _this$state.color;
    return _react["default"].createElement(_ProgressLine["default"], {
      height: 3,
      color: color,
      completed: completed
    });
  };

  return ProgressLoading;
}(_react.Component);

var _default = ProgressLoading;
exports["default"] = _default;
//# sourceMappingURL=ProgressLoading.js.map