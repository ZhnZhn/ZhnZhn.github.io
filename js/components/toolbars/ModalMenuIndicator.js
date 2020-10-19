"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _seriaFn = _interopRequireDefault(require("../../math/seriaFn"));

var _IndicatorBuilder = _interopRequireDefault(require("../../charts/IndicatorBuilder"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _RowType = _interopRequireDefault(require("./RowType1"));

var _RowPlusMinus = _interopRequireDefault(require("./RowPlusMinus"));

var _RowSma = _interopRequireDefault(require("./RowSma"));

var _RowMfi = _interopRequireDefault(require("./RowMfi"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu.Style"));

//import PropTypes from "prop-types";
var growthRate = _seriaFn["default"].growthRate,
    changesBetween = _seriaFn["default"].changesBetween,
    normalize = _seriaFn["default"].normalize;
var crMomAthConfig = _IndicatorBuilder["default"].crMomAthConfig;
var C_GROW = '#90ed7d';
var STYLE = {
  PANE: {
    width: 265,
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
  CH: ['_chvSeria', 'isChanges', C_GROW, changesBetween, true],
  NORM: ['_normSeria', 'isNormalize', C_GROW, normalize, false]
};
/*
const DEF_GROWTH_RATE = (
  <>Def: 100*(&Delta;y<sub>t1-t0</sub>/y<sub>t0</sub>)</>
);
*/

var NORM_CAPTION_EL = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: ["Normalize (100*y", /*#__PURE__*/(0, _jsxRuntime.jsx)("sub", {
    children: "t"
  }), "/y", /*#__PURE__*/(0, _jsxRuntime.jsx)("sub", {
    children: "0"
  }), ")"]
});

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _getSeriaIndex = function _getSeriaIndex(chart, _ref) {
  var s = _ref.s;

  var _index = _isNumber(s) ? s - 1 : 0;

  return (chart == null ? void 0 : chart.series.length) > _index ? _index : 0;
};

var ModalMenuIndicator = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ModalMenuIndicator, _Component);

  /*
  static propTypes = {
    rootStyle: PropTypes.object,
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
          config = crMomAthConfig(chart);

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
    _this._addChanges = _this._addSeriaBy.bind((0, _assertThisInitialized2["default"])(_this), FNS.CH);
    _this._removeChanges = _this._hideSeriaBy.bind((0, _assertThisInitialized2["default"])(_this), FNS.CH);
    _this._addNormalize = _this._addSeriaBy.bind((0, _assertThisInitialized2["default"])(_this), FNS.NORM, {});
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

      var seriaIndex = _getSeriaIndex(this._chart, seriaOptions);

      if (_isSeriaInst(_seria)) {
        _seria.setVisible(true);
      } else {
        var data = this._chart.series[seriaIndex].data,
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
        style = _this$props.style,
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
        isChanges = _this$state.isChanges,
        isNormalize = _this$state.isNormalize,
        isMomAth = _this$state.isMomAth;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup["default"], {
      style: (0, _extends2["default"])({}, _ModalMenu["default"].ROOT, style),
      isShow: isShow,
      onClose: onClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: STYLE.PANE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType["default"], {
          is: isChanges,
          caption: "Changes Between",
          onMinus: this._removeChanges,
          onPlus: this._addChanges
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType["default"], {
          is: isGrowthRate,
          caption: "Growth Rate" //Def={DEF_GROWTH_RATE}
          ,
          onMinus: this._removeGrowRate,
          onPlus: this._addGrowRate
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPlusMinus["default"], {
          is: isNormalize,
          caption: NORM_CAPTION_EL,
          onMinus: this._removeNormalize,
          onPlus: this._addNormalize
        }), !isWithoutSma && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowSma["default"], {
          config: config,
          getChart: getChart
        }), this._isMfi && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowMfi["default"], {
          getChart: getChart,
          onAddMfi: onAddMfi,
          onRemoveMfi: onRemoveMfi
        }), this._isMomAth && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPlusMinus["default"], {
          is: isMomAth,
          styleCaption: _ModalMenu["default"].ROW_MOM_ATH,
          caption: "MOM(1) & ATH",
          onPlus: this._handleAddMomAth,
          onMinus: this._handleRemoveMomAth
        })]
      })
    });
  };

  return ModalMenuIndicator;
}(_react.Component);

ModalMenuIndicator.defaultProps = {
  getChart: function getChart() {}
};
var _default = ModalMenuIndicator;
exports["default"] = _default;
//# sourceMappingURL=ModalMenuIndicator.js.map