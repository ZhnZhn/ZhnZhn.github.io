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

var _ButtonParentTab = require('../zhn-moleculs/ButtonParentTab');

var _ButtonParentTab2 = _interopRequireDefault(_ButtonParentTab);

var _ButtonTab = require('../zhn/ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _PanelIndicator = require('./PanelIndicator');

var _PanelIndicator2 = _interopRequireDefault(_PanelIndicator);

var _PanelMini = require('./PanelMini');

var _PanelMini2 = _interopRequireDefault(_PanelMini);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartToolbar = function (_Component) {
  (0, _inherits3.default)(ChartToolbar, _Component);

  function ChartToolbar() {
    (0, _classCallCheck3.default)(this, ChartToolbar);
    return (0, _possibleConstructorReturn3.default)(this, (ChartToolbar.__proto__ || Object.getPrototypeOf(ChartToolbar)).apply(this, arguments));
  }

  (0, _createClass3.default)(ChartToolbar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          config = _props.config,
          onAddSma = _props.onAddSma,
          onRemoveSeries = _props.onRemoveSeries,
          onAddMfi = _props.onAddMfi,
          onRemoveMfi = _props.onRemoveMfi,
          onClickLegend = _props.onClickLegend,
          onClick2H = _props.onClick2H,
          onAddToWatch = _props.onAddToWatch,
          onClickInfo = _props.onClickInfo,
          onClickVolume = _props.onClickVolume,
          onClickATH = _props.onClickATH,
          onClickHighLow = _props.onClickHighLow;

      var _btIndicator = !config.zhConfig.isWithoutIndicator ? _react2.default.createElement(
        _ButtonParentTab2.default,
        {
          caption: 'Indicator',
          style: { left: '10px' }
        },
        _react2.default.createElement(_PanelIndicator2.default, {
          onAddSma: onAddSma,
          onRemoveSma: onRemoveSeries,
          isMfi: config.zhIsMfi,
          onAddMfi: onAddMfi,
          onRemoveMfi: onRemoveMfi
        })
      ) : undefined;

      var _btLegend = config.zhConfig.isWithLegend ? _react2.default.createElement(_ButtonTab2.default, {
        style: { left: '115px' },
        caption: 'Legend',
        onClick: onClickLegend
      }) : undefined;

      var _bt2HChart = _react2.default.createElement(_ButtonTab2.default, {
        style: { left: '190px' },
        caption: 'x2H',
        onClick: onClick2H
      });

      var _btAdd = !config.zhConfig.isWithoutAdd ? _react2.default.createElement(_ButtonTab2.default, {
        style: { left: '240px' },
        caption: 'Add',
        isShow: false,
        onClick: onAddToWatch
      }) : null;

      var _btInfo = config.info ? _react2.default.createElement(_ButtonTab2.default, {
        caption: 'Info',
        onClick: onClickInfo
      }) : null;

      var zhVolumeConfig = config.zhVolumeConfig,
          zhATHConfig = config.zhATHConfig,
          zhHighLowConfig = config.zhHighLowConfig;

      var _btMini = zhVolumeConfig || zhATHConfig || zhHighLowConfig ? _react2.default.createElement(
        _ButtonParentTab2.default,
        {
          style: { left: '350px' },
          caption: 'Mini'
        },
        _react2.default.createElement(_PanelMini2.default, {
          config: config,
          onClickVolume: onClickVolume,
          onClickATH: onClickATH,
          onClickHighLow: onClickHighLow
        })
      ) : null;

      /*
       const _btConf = (
         <ButtonTab
           style={{left: '450px'}}
           caption={'Conf'}
           onClick={onClickConfig}
         />
       )
      */

      return _react2.default.createElement(
        'div',
        { style: style },
        _btIndicator,
        _btLegend,
        _bt2HChart,
        _btAdd,
        _btInfo,
        _btMini
      );
    }
  }]);
  return ChartToolbar;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ChartToolbar.propTypes = {
  style: _react.PropTypes.object,
  config: _react.PropTypes.object
} : void 0;
exports.default = ChartToolbar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\ChartToolBar.js.map