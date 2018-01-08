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

var _MenuBrowserDynamic = require('../zhn/MenuBrowserDynamic2');

var _MenuBrowserDynamic2 = _interopRequireDefault(_MenuBrowserDynamic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourceBrowserDynamic2 = function (_Component) {
  (0, _inherits3.default)(SourceBrowserDynamic2, _Component);

  function SourceBrowserDynamic2() {
    (0, _classCallCheck3.default)(this, SourceBrowserDynamic2);
    return (0, _possibleConstructorReturn3.default)(this, (SourceBrowserDynamic2.__proto__ || Object.getPrototypeOf(SourceBrowserDynamic2)).apply(this, arguments));
  }

  (0, _createClass3.default)(SourceBrowserDynamic2, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_MenuBrowserDynamic2.default, this.props);
    }
  }]);
  return SourceBrowserDynamic2;
}(_react.Component);

exports.default = SourceBrowserDynamic2;
//# sourceMappingURL=SourceBrowserDynamic2.js.map