"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _seriaFn = _interopRequireDefault(require("../../math/seriaFn"));

var _IndicatorBuilder = _interopRequireDefault(require("../../charts/IndicatorBuilder"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _RowGrowthRate = _interopRequireDefault(require("./RowGrowthRate"));

var _RowPlusMinus = _interopRequireDefault(require("./RowPlusMinus"));

var _RowSma = _interopRequireDefault(require("./RowSma"));

var _RowMfi = _interopRequireDefault(require("./RowMfi"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu.Style"));

//import PropTypes from "prop-types";
var growthRate = _seriaFn["default"].growthRate,
    normalize = _seriaFn["default"].normalize;
var crMomAthConfig = _IndicatorBuilder["default"].crMomAthConfig;
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

var NORM_CAPTION_EL = _react["default"].createElement(_react.Fragment, null, "Normalize (100*y", _react["default"].createElement("sub", null, "t"), "/y", _react["default"].createElement("sub", null, "0"), ")");

var ModalMenuIndicator =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ModalMenuIndicator, _Component);

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
  function ModalMenuIndicator(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleAddMomAth = function () {
      var chart = _this.props.getChart(),
          config = crMomAthConfig(chart, _this.props.chartId);

      if (config) {
        _this.props.onAddMfi(config, MOM_ATH);

        _this.setState({
          isMomAth: true
        });
      }
    };

    _this._handleRemoveMomAth = function () {
      _this.props.onRemoveMfi(MOM_ATH);

      _this.setState({
        isMomAth: false
      });
    };

    var _config = props.config;
    _this._isMfi = !!_config.zhIsMfi;
    _this._isMomAth = !!_config.zhIsMomAth;
    _this._addGrowRate = _this._addSeriaBy.bind((0, _assertThisInitialized2["default"])(_this), FNS.GR);
    _this._removeGrowRate = _this._hideSeriaBy.bind((0, _assertThisInitialized2["default"])(_this), FNS.GR);
    _this._addNormalize = _this._addSeriaBy.bind((0, _assertThisInitialized2["default"])(_this), FNS.NORM, {}, undefined);
    _this._removeNormalize = _this._hideSeriaBy.bind((0, _assertThisInitialized2["default"])(_this), FNS.NORM);
    _this.state = {
      isGrowthRate: false,
      isNormalize: false,
      isMomAth: false
    };
    return _this;
  }

  var _proto = ModalMenuIndicator.prototype;

  _proto._addSeriaBy = function _addSeriaBy(confArr, seriaOptions, fnOptions) {
    var seriaPropName = confArr[0],
        statePropName = confArr[1],
        color = confArr[2],
        fn = confArr[3];
    var _seria = this[seriaPropName];

    if (!this._chart) {
      this._chart = this.props.getChart();
    }

    if (this._chart) {
      var _this$setState;

      if (_isSeriaInst(_seria)) {
        _seria.setVisible(true);
      } else {
        var data = this._chart.series[0].data,
            seriaData = fn(data, fnOptions);
        this[seriaPropName] = this._chart.zhAddSeriaToYAxis({
          data: seriaData,
          color: seriaOptions.color || color,
          yIndex: -1
        }, seriaOptions);
      }

      this.setState((_this$setState = {}, _this$setState[statePropName] = true, _this$setState));
    }
  };

  _proto._hideSeriaBy = function _hideSeriaBy(confArr) {
    var seriaPropName = confArr[0],
        statePropName = confArr[1],
        isRemove = confArr[4],
        _seria = this[seriaPropName];

    if (_isSeriaInst(_seria)) {
      var _this$setState2;

      if (isRemove) {
        _seria.yAxis.remove();

        this[seriaPropName] = null;
      } else {
        _seria.setVisible(false);
      }

      this.setState((_this$setState2 = {}, _this$setState2[statePropName] = false, _this$setState2));
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        config = _this$props.config,
        getChart = _this$props.getChart,
        onClose = _this$props.onClose,
        onAddMfi = _this$props.onAddMfi,
        onRemoveMfi = _this$props.onRemoveMfi,
        _config$zhConfig = config.zhConfig,
        zhConfig = _config$zhConfig === void 0 ? {} : _config$zhConfig,
        isWithoutSma = zhConfig.isWithoutSma,
        _this$state = this.state,
        isGrowthRate = _this$state.isGrowthRate,
        isNormalize = _this$state.isNormalize,
        isMomAth = _this$state.isMomAth;
    return _react["default"].createElement(_ModalPopup["default"], {
      style: _ModalMenu["default"].ROOT,
      isShow: isShow,
      onClose: onClose
    }, _react["default"].createElement("div", {
      style: STYLE.PANE
    }, _react["default"].createElement(_RowGrowthRate["default"], {
      is: isGrowthRate,
      onMinus: this._removeGrowRate,
      onPlus: this._addGrowRate
    }), _react["default"].createElement(_RowPlusMinus["default"], {
      is: isNormalize,
      caption: NORM_CAPTION_EL,
      onMinus: this._removeNormalize,
      onPlus: this._addNormalize
    }), !isWithoutSma && _react["default"].createElement(_RowSma["default"], {
      config: config,
      getChart: getChart
    }), this._isMfi && _react["default"].createElement(_RowMfi["default"], {
      getChart: getChart,
      onAddMfi: onAddMfi,
      onRemoveMfi: onRemoveMfi
    }), this._isMomAth && _react["default"].createElement(_RowPlusMinus["default"], {
      is: isMomAth,
      styleCaption: _ModalMenu["default"].ROW_MOM_ATH,
      caption: "MOM(1) & ATH",
      onPlus: this._handleAddMomAth,
      onMinus: this._handleRemoveMomAth
    })));
  };

  return ModalMenuIndicator;
}(_react.Component);

ModalMenuIndicator.defaultProps = {
  getChart: function getChart() {}
};
var _default = ModalMenuIndicator;
exports["default"] = _default;
//# sourceMappingURL=ModalMenuIndicator.js.map