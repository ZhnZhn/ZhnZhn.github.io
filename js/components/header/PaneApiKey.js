"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _safeFn = _interopRequireDefault(require("../../utils/safeFn"));

var _RowSecret = _interopRequireDefault(require("../dialogs/RowSecret"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _RowButtons = _interopRequireDefault(require("./RowButtons"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const MAX_KEY = 10;
const S_PANE = {
  paddingLeft: 4
},
      S_BT_SET = {
  marginLeft: 8,
  marginRight: 8
};
const CONF_ARR = [["Alpha", "alpha-vantage", "Alpha Vantage"], ["Twelve", "twelve", "Twelve Data"], ["BEA", "bea", "BEA", "36"], ["BLS", "bls", "BLS", "32"], ["EIA", "eia", "EIA", "32"], ["FMP", "fmp", "Financial Modeling Prep", "32"], ["IEX", "iex-cloud", "IEX Cloud", "35"], ["Intrinio", "intrinio", "Intrinio", "32"], ["Quandl", "quandl", "Quandl"]];

class PaneApiKey extends _react.Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    isSelected: PropTypes.bool,
    titleStyle: PropTypes.object,
    btStyle: PropTypes.object,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */
  constructor(props) {
    super(props);

    this._hSetAll = () => {
      let i = 1;

      for (; i < MAX_KEY; i++) {
        this['_setKey' + i](this['iComp' + i].getValue());
      }
    };

    this._hClearAll = () => {
      let i = 1;

      for (i; i < MAX_KEY; i++) {
        this['_setKey' + i]('');
        this['iComp' + i].clear();
      }
    };

    this._ref1 = n => this.iComp1 = n;

    this._ref2 = n => this.iComp2 = n;

    this._ref3 = n => this.iComp3 = n;

    this._ref4 = n => this.iComp4 = n;

    this._ref5 = n => this.iComp5 = n;

    this._ref6 = n => this.iComp6 = n;

    this._ref7 = n => this.iComp7 = n;

    this._ref8 = n => this.iComp8 = n;

    this._ref9 = n => this.iComp9 = n;

    const {
      data
    } = props;
    let _i2 = 1;

    for (; _i2 < MAX_KEY; _i2++) {
      this['_setKey' + _i2] = (0, _safeFn.default)(data, 'key' + _i2);
    }
  }

  render() {
    const {
      isShow,
      isSelected,
      isShowLabels,
      titleStyle,
      btStyle,
      onClose
    } = this.props;

    if (!(isShow && isSelected)) {
      return null;
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_PANE,
      children: [CONF_ARR.map((item, i) => {
        const _i = i + 1;

        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowSecret.default, {
          ref: this['_ref' + _i],
          isTitle: isShowLabels,
          titleStyle: titleStyle,
          title: item[0] + ":",
          name: item[1],
          placeholder: item[2] + " API Key",
          maxLength: item[3],
          onEnter: this['_setKey' + _i]
        }, item[0]);
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowButtons.default, {
        btStyle: btStyle,
        onClose: onClose,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
          style: btStyle,
          caption: "CLEAR ALL",
          onClick: this._hClearAll
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
          style: { ...btStyle,
            ...S_BT_SET
          },
          caption: "SET ALL",
          onClick: this._hSetAll
        })]
      })]
    });
  }

}

var _default = PaneApiKey;
exports.default = _default;
//# sourceMappingURL=PaneApiKey.js.map