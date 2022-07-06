"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _seriaFn = require("../../math/seriaFn");

var _IndicatorBuilder = require("../../charts/IndicatorBuilder");

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _RowType = _interopRequireDefault(require("./RowType1"));

var _RowPlusMinus = _interopRequireDefault(require("./RowPlusMinus"));

var _RowSma = _interopRequireDefault(require("./RowSma"));

var _RowMfi = _interopRequireDefault(require("./RowMfi"));

var _ModalMenu = require("./ModalMenu.Style");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const C_GROW = '#90ed7d',
      MOM_ATH = 'MOM_ATH',
      S_PANE = {
  width: 265,
  margin: 8
};

const _isFn = fn => typeof fn === 'function';

const _isSeriaInst = s => s && _isFn(s.setVisible);

const FNS = {
  GR: ['ROC', 'isGrowthRate', C_GROW, _seriaFn.growthRate, true],
  CH: ['DIFF', 'isChanges', C_GROW, _seriaFn.changesBetween, true],
  NORM: ['NORM', 'isNormalize', C_GROW, _seriaFn.normalize, false]
};
/*
const DEF_GROWTH_RATE = (
  <>Def: 100*(&Delta;y<sub>t1-t0</sub>/y<sub>t0</sub>)</>
);
*/

const NORM_CAPTION_EL = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: ["Normalize (100*y", /*#__PURE__*/(0, _jsxRuntime.jsx)("sub", {
    children: "t"
  }), "/y", /*#__PURE__*/(0, _jsxRuntime.jsx)("sub", {
    children: "0"
  }), ")"]
});

const _isNumber = n => typeof n === 'number';

const _getSeriaIndex = (chart, _ref) => {
  let {
    s
  } = _ref;

  const _index = _isNumber(s) ? s - 1 : 0;

  return (chart == null ? void 0 : chart.series.length) > _index ? _index : 0;
};

const _crName = (prefixStr, nOrObj) => {
  const _suffix = _isNumber(nOrObj) ? "(" + nOrObj + ")" : '';

  return "" + prefixStr + _suffix;
};

class ModalMenuIndicator extends _react.Component {
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    config: PropTypes.object,
    getChart: PropTypes.func,
    onAddMfi: PropTypes.func,
    onRemoveMfi: PropTypes.func,
  }
  */
  constructor(props) {
    super(props);

    this._handleAddMomAth = () => {
      const chart = this.props.getChart(),
            config = (0, _IndicatorBuilder.crMomAthConfig)(chart);

      if (config) {
        this.props.onAddMfi(config, MOM_ATH);
        this.setState({
          isMomAth: true
        });
      }
    };

    this._handleRemoveMomAth = () => {
      this.props.onRemoveMfi(MOM_ATH);
      this.setState({
        isMomAth: false
      });
    };

    const {
      config: _config
    } = props;
    this._isMfi = !!_config.zhIsMfi;
    this._isMomAth = !!_config.zhIsMomAth;
    this._addGrowRate = this._addSeriaBy.bind(this, FNS.GR);
    this._removeGrowRate = this._hideSeriaBy.bind(this, FNS.GR);
    this._addChanges = this._addSeriaBy.bind(this, FNS.CH);
    this._removeChanges = this._hideSeriaBy.bind(this, FNS.CH);
    this._addNormalize = this._addSeriaBy.bind(this, FNS.NORM, {});
    this._removeNormalize = this._hideSeriaBy.bind(this, FNS.NORM);
    this.state = {
      isGrowthRate: false,
      isNormalize: false,
      isMomAth: false
    };
  }

  _addSeriaBy(confArr, seriaOptions, fnOptions) {
    const seriaPropName = confArr[0],
          statePropName = confArr[1],
          color = confArr[2],
          fn = confArr[3],
          name = _crName(seriaPropName, fnOptions);

    const _seria = this[seriaPropName];

    if (!this._chart) {
      this._chart = this.props.getChart();
    }

    if (this._chart) {
      const seriaIndex = _getSeriaIndex(this._chart, seriaOptions);

      if (_isSeriaInst(_seria)) {
        _seria.setVisible(true);
      } else {
        const data = this._chart.series[seriaIndex].data,
              seriaData = fn(data, fnOptions);
        this[seriaPropName] = this._chart.zhAddSeriaToYAxis({
          data: seriaData,
          color: seriaOptions.color || color,
          name
        }, seriaOptions);
      }

      this.setState({
        [statePropName]: true
      });
    }
  }

  _hideSeriaBy(confArr) {
    const seriaPropName = confArr[0],
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

      this.setState({
        [statePropName]: false
      });
    }
  }

  render() {
    const {
      isShow,
      style,
      config,
      getChart,
      onClose,
      onAddMfi,
      onRemoveMfi
    } = this.props,
          {
      zhConfig = {}
    } = config,
          {
      isWithoutSma
    } = zhConfig,
          {
      isGrowthRate,
      isChanges,
      isNormalize,
      isMomAth
    } = this.state;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
      style: { ..._ModalMenu.S_MODAL_MENU,
        ...style
      },
      isShow: isShow,
      onClose: onClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_PANE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType.default, {
          is: isChanges,
          caption: "Changes Between",
          onMinus: this._removeChanges,
          onPlus: this._addChanges
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType.default, {
          is: isGrowthRate,
          caption: "Growth Rate" //Def={DEF_GROWTH_RATE}
          ,
          onMinus: this._removeGrowRate,
          onPlus: this._addGrowRate
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPlusMinus.default, {
          is: isNormalize,
          caption: NORM_CAPTION_EL,
          onMinus: this._removeNormalize,
          onPlus: this._addNormalize
        }), !isWithoutSma && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowSma.default, {
          config: config,
          getChart: getChart
        }), this._isMfi && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowMfi.default, {
          getChart: getChart,
          onAddMfi: onAddMfi,
          onRemoveMfi: onRemoveMfi
        }), this._isMomAth && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPlusMinus.default, {
          is: isMomAth,
          caption: "MOM(1) & ATH",
          onPlus: this._handleAddMomAth,
          onMinus: this._handleRemoveMomAth
        })]
      })
    });
  }

}

ModalMenuIndicator.defaultProps = {
  getChart: () => {}
};
var _default = ModalMenuIndicator;
exports.default = _default;
//# sourceMappingURL=ModalMenuIndicator.js.map