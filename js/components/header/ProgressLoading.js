'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProgressLine = require('../zhn/ProgressLine');

var _ProgressLine2 = _interopRequireDefault(_ProgressLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  LOADING: '#2F7ED8',
  FAILED: 'rgb(237, 88, 19)'
};

var ProgressLoading = function (_Component) {
  (0, _inherits3.default)(ProgressLoading, _Component);

  function ProgressLoading() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ProgressLoading);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ProgressLoading.__proto__ || Object.getPrototypeOf(ProgressLoading)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      completed: 0,
      color: C.LOADING
    }, _this._onStore = function (actionType) {
      var ACTIONS = _this.props.ACTIONS;

      if (actionType === ACTIONS.LOADING) {
        _this.setState({ completed: 35, color: C.LOADING });
      } else if (actionType === ACTIONS.LOADING_COMPLETE) {
        _this.setState({ completed: 100, color: C.LOADING });
      } else if (actionType === ACTIONS.LOADING_FAILED) {
        _this.setState({ completed: 100, color: C.FAILED });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ProgressLoading, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listenLoadingProgress(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          completed = _state.completed,
          color = _state.color;

      return _react2.default.createElement(_ProgressLine2.default, {
        height: 3,
        color: color,
        completed: completed
      });
    }
  }]);
  return ProgressLoading;
}(_react.Component);

exports.default = ProgressLoading;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\ProgressLoading.js.map