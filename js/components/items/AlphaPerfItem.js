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

var _TableItem = require('./TableItem');

var _TableItem2 = _interopRequireDefault(_TableItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  TH_MORE: {
    textAlign: 'left',
    paddingLeft: '12px'
  }
};

var AlphaPerfItem = function (_Component) {
  (0, _inherits3.default)(AlphaPerfItem, _Component);

  function AlphaPerfItem() {
    (0, _classCallCheck3.default)(this, AlphaPerfItem);
    return (0, _possibleConstructorReturn3.default)(this, (AlphaPerfItem.__proto__ || Object.getPrototypeOf(AlphaPerfItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(AlphaPerfItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          onCloseItem = _props.onCloseItem;

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_TableItem2.default, {
          thMoreStyle: S.TH_MORE,
          config: config.m,
          onCloseItem: onCloseItem
        }),
        _react2.default.createElement(_TableItem2.default, {
          thMoreStyle: S.TH_MORE,
          config: config.y,
          onCloseItem: onCloseItem
        })
      );
    }
  }]);
  return AlphaPerfItem;
}(_react.Component);

exports.default = AlphaPerfItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\AlphaPerfItem.js.map