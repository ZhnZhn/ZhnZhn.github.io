'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _seriaFn = require('../../math/seriaFn');

var _seriaFn2 = _interopRequireDefault(_seriaFn);

var _IndicatorBuilder = require('../../charts/IndicatorBuilder');

var _IndicatorBuilder2 = _interopRequireDefault(_IndicatorBuilder);

var _ModalPopup = require('../zhn-moleculs/ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

var _RowGrowthRate = require('./RowGrowthRate');

var _RowGrowthRate2 = _interopRequireDefault(_RowGrowthRate);

var _RowPlusMinus = require('./RowPlusMinus');

var _RowPlusMinus2 = _interopRequireDefault(_RowPlusMinus);

var _RowSma = require('./RowSma');

var _RowSma2 = _interopRequireDefault(_RowSma);

var _RowMfi = require('./RowMfi');

var _RowMfi2 = _interopRequireDefault(_RowMfi);

var _ModalMenu = require('./ModalMenu.Style');

var _ModalMenu2 = _interopRequireDefault(_ModalMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var growthRate = _seriaFn2.default.growthRate,
    normalize = _seriaFn2.default.normalize;
var crMomAthConfig = _IndicatorBuilder2.default.crMomAthConfig;


var C_GROW = '#90ed7d';

var STYLE = {
  PANE: {
    width: 230,
    margin: 8
  },
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 48,
    fontWeight: 'bold'
  },
  ROW_MOM_ATH: {
    paddingRight: 10
  },
  ROW: {
    paddingTop: 5
  },
  N2: {
    width: 48
  }
};

var MOM_ATH = 'MOM_ATH';

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isSeriaInst = function _isSeriaInst(s) {
  return s && _isFn(s.setVisible);
};

var FNS = {
  GR: ['_grSeria', 'isGrowthRate', C_GROW, growthRate, true],
  NORM: ['_normSeria', 'isNormalize', C_GROW, normalize, false]
};

var NORM_CAPTION_EL = _react2.default.createElement(
  _react.Fragment,
  null,
  'Normalize (100*y',
  _react2.default.createElement(
    'sub',
    null,
    't'
  ),
  '/y',
  _react2.default.createElement(
    'sub',
    null,
    '0'
  ),
  ')'
);

var ModalMenuIndicator = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ModalMenuIndicator, _Component);

  function ModalMenuIndicator(props) {
    (0, _classCallCheck3.default)(this, ModalMenuIndicator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalMenuIndicator.__proto__ || Object.getPrototypeOf(ModalMenuIndicator)).call(this, props));

    _initialiseProps.call(_this);

    var config = props.config;

    _this._isMfi = !!config.zhIsMfi;
    _this._isMomAth = !!config.zhIsMomAth;

    _this._addGrowRate = _this._addSeriaBy.bind(_this, FNS.GR);
    _this._removeGrowRate = _this._hideSeriaBy.bind(_this, FNS.GR);

    _this._addNormalize = _this._addSeriaBy.bind(_this, FNS.NORM, {}, undefined);
    _this._removeNormalize = _this._hideSeriaBy.bind(_this, FNS.NORM);

    _this.state = {
      isGrowthRate: false,
      isNormalize: false,
      isMomAth: false
    };
    return _this;
  }
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    chartId: PropTypes.string,
    config: PropTypes.object,
    getChart: PropTypes.func,
    onAddMfi: PropTypes.func,
    onRemoveMfi: PropTypes.func,
  }
  */

  (0, _createClass3.default)(ModalMenuIndicator, [{
    key: '_addSeriaBy',
    value: function _addSeriaBy(confArr, seriaOptions, fnOptions) {
      var seriaPropName = confArr[0],
          statePropName = confArr[1],
          color = confArr[2],
          fn = confArr[3];

      var _seria = this[seriaPropName];
      if (!this._chart) {
        this._chart = this.props.getChart();
      }
      if (this._chart) {
        if (_isSeriaInst(_seria)) {
          _seria.setVisible(true);
        } else {
          var data = this._chart.series[0].data,
              seriaData = fn(data, fnOptions);
          this[seriaPropName] = this._chart.zhAddSeriaToYAxis({
            data: seriaData,
            color: seriaOptions.color || color,
            index: -1
          }, seriaOptions);
        }
        this.setState((0, _defineProperty3.default)({}, statePropName, true));
      }
    }
  }, {
    key: '_hideSeriaBy',
    value: function _hideSeriaBy(confArr) {
      var seriaPropName = confArr[0],
          statePropName = confArr[1],
          isRemove = confArr[4],
          _seria = this[seriaPropName];
      if (_isSeriaInst(_seria)) {
        if (isRemove) {
          _seria.yAxis.remove();
          this[seriaPropName] = null;
        } else {
          _seria.setVisible(false);
        }
        this.setState((0, _defineProperty3.default)({}, statePropName, false));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          config = _props.config,
          getChart = _props.getChart,
          onClose = _props.onClose,
          onAddMfi = _props.onAddMfi,
          onRemoveMfi = _props.onRemoveMfi,
          _config$zhConfig = config.zhConfig,
          zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
          isWithoutSma = zhConfig.isWithoutSma,
          _state = this.state,
          isGrowthRate = _state.isGrowthRate,
          isNormalize = _state.isNormalize,
          isMomAth = _state.isMomAth;

      return _react2.default.createElement(
        _ModalPopup2.default,
        {
          style: _ModalMenu2.default.ROOT,
          isShow: isShow,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: STYLE.PANE },
          _react2.default.createElement(_RowGrowthRate2.default, {
            is: isGrowthRate,
            onMinus: this._removeGrowRate,
            onPlus: this._addGrowRate
          }),
          _react2.default.createElement(_RowPlusMinus2.default, {
            is: isNormalize,
            caption: NORM_CAPTION_EL,
            onMinus: this._removeNormalize,
            onPlus: this._addNormalize
          }),
          !isWithoutSma && _react2.default.createElement(_RowSma2.default, {
            config: config,
            getChart: getChart
          }),
          this._isMfi && _react2.default.createElement(_RowMfi2.default, {
            getChart: getChart,
            onAddMfi: onAddMfi,
            onRemoveMfi: onRemoveMfi
          }),
          this._isMomAth && _react2.default.createElement(_RowPlusMinus2.default, {
            is: isMomAth,
            styleCaption: _ModalMenu2.default.ROW_MOM_ATH,
            caption: 'MOM(1) & ATH',
            onPlus: this._handleAddMomAth,
            onMinus: this._handleRemoveMomAth
          })
        )
      );
    }
  }]);
  return ModalMenuIndicator;
}(_react.Component), _class.defaultProps = {
  getChart: function getChart() {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleAddMomAth = function () {
    var chart = _this2.props.getChart(),
        config = crMomAthConfig(chart, _this2.props.chartId);
    if (config) {
      _this2.props.onAddMfi(config, MOM_ATH);
      _this2.setState({ isMomAth: true });
    }
  };

  this._handleRemoveMomAth = function () {
    _this2.props.onRemoveMfi(MOM_ATH);
    _this2.setState({ isMomAth: false });
  };
}, _temp);
exports.default = ModalMenuIndicator;
//# sourceMappingURL=ModalMenuIndicator.js.map