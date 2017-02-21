'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LegendItem = require('./LegendItem');

var _LegendItem2 = _interopRequireDefault(_LegendItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Legend = function (_Component) {
  _inherits(Legend, _Component);

  function Legend() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Legend);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Legend.__proto__ || Object.getPrototypeOf(Legend)).call.apply(_ref, [this].concat(args))), _this), _this._renderLegend = function () {
      var legend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var onClickItem = arguments[1];

      return legend.map(function (item, index) {
        return _react2.default.createElement(_LegendItem2.default, { key: item.name, item: item, onClickItem: onClickItem });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Legend, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.legend === this.props.legend) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          legend = _props.legend,
          onClickItem = _props.onClickItem;

      return _react2.default.createElement(
        'div',
        null,
        this._renderLegend(legend, onClickItem)
      );
    }
  }]);

  return Legend;
}(_react.Component);

exports.default = Legend;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\Legend.js.map