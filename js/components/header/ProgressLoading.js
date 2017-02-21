'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ProgressLine = require('../zhn/ProgressLine');

var _ProgressLine2 = _interopRequireDefault(_ProgressLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Colors = {
  LOADING: '#2F7ED8',
  FAILED: 'rgb(237, 88, 19)'
};

var ProgressLoading = function (_Component) {
  _inherits(ProgressLoading, _Component);

  function ProgressLoading() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProgressLoading);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProgressLoading.__proto__ || Object.getPrototypeOf(ProgressLoading)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      completed: 0,
      color: Colors.LOADING
    }, _this._onStore = function (actionType, option) {
      if (actionType === _ChartActions.ChartActionTypes.LOAD_STOCK) {
        _this.setState({ completed: 35, color: Colors.LOADING });
      } else if (actionType === _ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED || actionType === _ChartActions.ChartActionTypes.LOAD_STOCK_ADDED) {
        _this.setState({ completed: 100, color: Colors.LOADING });
      } else if (actionType === _ChartActions.ChartActionTypes.LOAD_STOCK_FAILED) {
        _this.setState({ completed: 100, color: Colors.FAILED });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProgressLoading, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
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