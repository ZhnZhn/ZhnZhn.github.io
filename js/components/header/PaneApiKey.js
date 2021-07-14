"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _safeFn = _interopRequireDefault(require("../../utils/safeFn"));

var _RowSecret = _interopRequireDefault(require("../dialogs/RowSecret"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _RowButtons = _interopRequireDefault(require("./RowButtons"));

//import PropTypes from 'prop-types'
var MAX_KEY = 10;
var S = {
  BT_SET: {
    marginLeft: 8,
    marginRight: 8
  }
};
var CONF_ARR = [["Alpha", "alpha-vantage", "Alpha Vantage"], ["Twelve", "twelve", "Twelve Data"], ["BEA", "bea", "BEA", "36"], ["BLS", "bls", "BLS", "32"], ["EIA", "eia", "EIA", "32"], ["FMP", "fmp", "Financial Modeling Prep", "32"], ["IEX", "iex-cloud", "IEX Cloud", "35"], ["Intrinio", "intrinio", "Intrinio", "32"], ["Quandl", "quandl", "Quandl"]];

var PaneApiKey = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(PaneApiKey, _Component);

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
  function PaneApiKey(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hSetAll = function () {
      var i = 1;

      for (; i < MAX_KEY; i++) {
        _this['_setKey' + i](_this['iComp' + i].getValue());
      }
    };

    _this._hClearAll = function () {
      var i = 1;

      for (i; i < MAX_KEY; i++) {
        _this['_setKey' + i]('');

        _this['iComp' + i].clear();
      }
    };

    _this._ref1 = function (n) {
      return _this.iComp1 = n;
    };

    _this._ref2 = function (n) {
      return _this.iComp2 = n;
    };

    _this._ref3 = function (n) {
      return _this.iComp3 = n;
    };

    _this._ref4 = function (n) {
      return _this.iComp4 = n;
    };

    _this._ref5 = function (n) {
      return _this.iComp5 = n;
    };

    _this._ref6 = function (n) {
      return _this.iComp6 = n;
    };

    _this._ref7 = function (n) {
      return _this.iComp7 = n;
    };

    _this._ref8 = function (n) {
      return _this.iComp8 = n;
    };

    _this._ref9 = function (n) {
      return _this.iComp9 = n;
    };

    var data = props.data;
    var _i2 = 1;

    for (; _i2 < MAX_KEY; _i2++) {
      _this['_setKey' + _i2] = (0, _safeFn["default"])(data, 'key' + _i2);
    }

    return _this;
  }

  var _proto = PaneApiKey.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        isShow = _this$props.isShow,
        isSelected = _this$props.isSelected,
        titleStyle = _this$props.titleStyle,
        btStyle = _this$props.btStyle,
        onClose = _this$props.onClose;

    if (!(isShow && isSelected)) {
      return null;
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [CONF_ARR.map(function (item, i) {
        var _i = i + 1;

        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowSecret["default"], {
          ref: _this2['_ref' + _i],
          titleStyle: titleStyle,
          title: item[0] + ":",
          name: item[1],
          placeholder: item[2] + " API Key",
          maxLength: item[3],
          onEnter: _this2['_setKey' + _i]
        }, item[0]);
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowButtons["default"], {
        btStyle: btStyle,
        onClose: onClose,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
          style: btStyle,
          caption: "CLEAR ALL",
          onClick: this._hClearAll
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
          style: (0, _extends2["default"])({}, btStyle, S.BT_SET),
          caption: "SET ALL",
          onClick: this._hSetAll
        })]
      })]
    });
  };

  return PaneApiKey;
}(_react.Component);

var _default = PaneApiKey;
exports["default"] = _default;
//# sourceMappingURL=PaneApiKey.js.map