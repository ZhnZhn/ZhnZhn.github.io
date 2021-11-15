"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _safeFn = _interopRequireDefault(require("../../utils/safeFn"));

var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));

var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _RowSecret = _interopRequireDefault(require("../dialogs/RowSecret"));

var _RowButtons = _interopRequireDefault(require("./RowButtons"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const MAX_KEY = 10;
const S_SCROLL_PANE = {
  overflowY: 'auto',
  height: 360,
  paddingRight: 10
},
      S_OC_CHILD = {
  paddingLeft: 4
},
      S_ROW_BTS = {
  margLeft: 0
},
      S_BT_SET = {
  margin: '0 2px'
};
const CONF_SM_ARR = [["Alpha", "alpha-vantage", "Alpha Vantage"], ["FMP", "fmp", "Financial Modeling Prep", "32"], ["IEX", "iex-cloud", "IEX Cloud", "35"], ["Intrinio", "intrinio", "Intrinio", "32"], ["Twelve", "twelve", "Twelve Data"]];
const CONF_EC_ARR = [["Quandl", "quandl", "Quandl"]];
const CONF_EC_USA_ARR = [["BEA", "bea", "BEA", "36"], ["BLS", "bls", "BLS", "32"], ["EIA", "eia", "EIA", "32"]];

const _crPwdItem = (item, index, {
  isShowLabels,
  titleStyle,
  i,
  comp
}) => {
  const _i = index + i;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowSecret.default, {
    ref: comp['_ref' + _i],
    isTitle: isShowLabels,
    titleStyle: titleStyle,
    title: item[0],
    name: item[1],
    placeholder: item[2] + " API Key",
    maxLength: item[3],
    onEnter: comp['_setKey' + _i]
  }, item[0]);
};

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
      for (let i = 1; i < MAX_KEY; i++) {
        this['_setKey' + i](this['iComp' + i].getValue());
      }
    };

    this._hClearAll = () => {
      for (let i = 1; i < MAX_KEY; i++) {
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

    for (let i = 1; i < MAX_KEY; i++) {
      this['_setKey' + i] = (0, _safeFn.default)(data, 'key' + i);
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

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ScrollPane.default, {
      style: S_SCROLL_PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
        caption: "Economics",
        childStyle: S_OC_CHILD,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
          items: CONF_EC_ARR,
          crItem: _crPwdItem,
          isShowLabels: isShowLabels,
          titleStyle: titleStyle,
          i: 1,
          comp: this
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
        caption: "Economics USA",
        childStyle: S_OC_CHILD,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
          items: CONF_EC_USA_ARR,
          crItem: _crPwdItem,
          isShowLabels: isShowLabels,
          titleStyle: titleStyle,
          i: 2,
          comp: this
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
        caption: "Stock Market",
        childStyle: S_OC_CHILD,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
          items: CONF_SM_ARR,
          crItem: _crPwdItem,
          isShowLabels: isShowLabels,
          titleStyle: titleStyle,
          i: 5,
          comp: this
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowButtons.default, {
        style: S_ROW_BTS,
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