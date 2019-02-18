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

var _ButtonTab = require('../zhn/ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _MenuTabItem = require('../zhn-moleculs/MenuTabItem');

var _MenuTabItem2 = _interopRequireDefault(_MenuTabItem);

var _ModalMenuIndicator = require('./ModalMenuIndicator');

var _ModalMenuIndicator2 = _interopRequireDefault(_ModalMenuIndicator);

var _ModalMenuFn = require('./ModalMenuFn');

var _ModalMenuFn2 = _interopRequireDefault(_ModalMenuFn);

var _ModalMenuMini = require('./ModalMenuMini');

var _ModalMenuMini2 = _interopRequireDefault(_ModalMenuMini);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  TAB_INDICATOR: {
    left: '10px'
  },
  PANE_INDICATOR: {
    width: '240px'
  },
  BT_LEGEND: {
    left: '115px'
  },
  TAB_MINI: {
    left: '350px'
  },
  TAB_FN: {
    left: '190px'
  },
  BT_ADD: {
    left: '250px'
  },
  BT_CONF: {
    left: '430px'
  }
};
//import PropTypes from "prop-types";

var INDICATOR_TAB_TYPES = ['area', 'spline', 'line'];
var _isIndicatorTab = function _isIndicatorTab(_ref, isWithoutIndicator) {
  var series = _ref.series;
  return !isWithoutIndicator && Array.isArray(series) && series[0] && INDICATOR_TAB_TYPES.indexOf(series[0].type) !== -1;
};

var ChartToolbar = function (_Component) {
  (0, _inherits3.default)(ChartToolbar, _Component);

  function ChartToolbar() {
    (0, _classCallCheck3.default)(this, ChartToolbar);
    return (0, _possibleConstructorReturn3.default)(this, (ChartToolbar.__proto__ || Object.getPrototypeOf(ChartToolbar)).apply(this, arguments));
  }

  (0, _createClass3.default)(ChartToolbar, [{
    key: 'shouldComponentUpdate',

    /*
    static propTypes = {
      style: PropTypes.object,
      config: PropTypes.object
    }
    */

    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          _props$config = _props.config,
          config = _props$config === undefined ? {} : _props$config,
          chartId = _props.chartId,
          onMiniChart = _props.onMiniChart,
          getChart = _props.getChart,
          onAddMfi = _props.onAddMfi,
          onRemoveMfi = _props.onRemoveMfi,
          onClickLegend = _props.onClickLegend,
          onClick2H = _props.onClick2H,
          onAddToWatch = _props.onAddToWatch,
          onCopy = _props.onCopy,
          onPasteTo = _props.onPasteTo,
          onClickInfo = _props.onClickInfo,
          _config$zhConfig = config.zhConfig,
          zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
          info = config.info,
          zhMiniConfigs = config.zhMiniConfigs,
          isWithoutIndicator = zhConfig.isWithoutIndicator,
          isWithLegend = zhConfig.isWithLegend,
          isWithoutAdd = zhConfig.isWithoutAdd;


      var _btTabIndicator = _isIndicatorTab(config, isWithoutIndicator) ? _react2.default.createElement(
        _MenuTabItem2.default,
        {
          style: S.TAB_INDICATOR,
          caption: 'Indicator'
        },
        _react2.default.createElement(_ModalMenuIndicator2.default, {
          chartId: chartId,
          config: config,
          getChart: getChart,
          onAddMfi: onAddMfi,
          onRemoveMfi: onRemoveMfi
        })
      ) : null;

      var _btLegend = isWithLegend ? _react2.default.createElement(_ButtonTab2.default, {
        style: S.BT_LEGEND,
        caption: 'Legend',
        onClick: onClickLegend
      }) : null;

      var _btAdd = !isWithoutAdd ? _react2.default.createElement(_ButtonTab2.default, {
        style: S.BT_ADD,
        caption: 'Add',
        onClick: onAddToWatch
      }) : null;

      var _btInfo = info ? _react2.default.createElement(_ButtonTab2.default, {
        caption: 'Info',
        onClick: onClickInfo
      }) : null;

      var _btTabMini = zhMiniConfigs && zhMiniConfigs.length ? _react2.default.createElement(
        _MenuTabItem2.default,
        {
          style: S.TAB_MINI,
          caption: 'Mini'
        },
        _react2.default.createElement(_ModalMenuMini2.default, {
          configs: zhMiniConfigs,
          onClickItem: onMiniChart
        })
      ) : null;

      return _react2.default.createElement(
        'div',
        { style: style },
        _btTabIndicator,
        _btLegend,
        _react2.default.createElement(
          _MenuTabItem2.default,
          {
            style: S.TAB_FN,
            caption: 'Fn'
          },
          _react2.default.createElement(_ModalMenuFn2.default, {
            onX2H: onClick2H,
            onCopy: onCopy,
            onPasteTo: onPasteTo
          })
        ),
        _btAdd,
        _btInfo,
        _btTabMini
      );
    }
  }]);
  return ChartToolbar;
}(_react.Component);

exports.default = ChartToolbar;
//# sourceMappingURL=ChartToolBar.js.map