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

var _SubPanel = require('./SubPanel');

var _SubPanel2 = _interopRequireDefault(_SubPanel);

var _SubMenuItem = require('./SubMenuItem');

var _SubMenuItem2 = _interopRequireDefault(_SubMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelMini = function (_Component) {
  (0, _inherits3.default)(PanelMini, _Component);

  function PanelMini() {
    (0, _classCallCheck3.default)(this, PanelMini);
    return (0, _possibleConstructorReturn3.default)(this, (PanelMini.__proto__ || Object.getPrototypeOf(PanelMini)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelMini, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          config = _props.config,
          onClickVolume = _props.onClickVolume,
          onClickATH = _props.onClickATH,
          onClickHighLow = _props.onClickHighLow;


      var _btVolume = config.zhVolumeConfig ? _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'Volume',
        onClick: onClickVolume
      }) : null;

      var _btATH = config.zhATHConfig ? _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'ATH',
        onClick: onClickATH
      }) : null;

      var _btHL = config.zhHighLowConfig ? _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'Daily HighLow',
        onClick: onClickHighLow
      }) : null;

      return _react2.default.createElement(
        _SubPanel2.default,
        { style: rootStyle },
        _btVolume,
        _btATH,
        _btHL
      );
    }
  }]);
  return PanelMini;
}(_react.Component);

process.env.NODE_ENV !== "production" ? PanelMini.propTypes = {
  rootStyle: _react.PropTypes.object,
  config: _react.PropTypes.shape({
    zhVolumeConfig: _react.PropTypes.object,
    zhATHConfig: _react.PropTypes.object,
    zhHighLowConfig: _react.PropTypes.object
  }),
  onClickVolume: _react.PropTypes.func,
  onClickATH: _react.PropTypes.func,
  onClickHighLow: _react.PropTypes.func
} : void 0;
exports.default = PanelMini;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\PanelMini.js.map