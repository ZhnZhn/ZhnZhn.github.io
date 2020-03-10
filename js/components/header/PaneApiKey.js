"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _safeFn = _interopRequireDefault(require("../../utils/safeFn"));

var _RowSecret = _interopRequireDefault(require("../dialogs/RowSecret"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _RowButtons = _interopRequireDefault(require("./RowButtons"));

//import PropTypes from 'prop-types'
var MAX_KEY = 9;
var S = {
  BT_SET: {
    marginLeft: 8,
    marginRight: 8
  }
};

var PaneApiKey =
/*#__PURE__*/
function (_Component) {
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

    var data = props.data;
    var _i = 1;

    for (; _i < MAX_KEY; _i++) {
      _this['_setKey' + _i] = (0, _safeFn["default"])(data, 'key' + _i);
    }

    return _this;
  }

  var _proto = PaneApiKey.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        isSelected = _this$props.isSelected,
        titleStyle = _this$props.titleStyle,
        btStyle = _this$props.btStyle,
        onClose = _this$props.onClose;

    if (!(isShow && isSelected)) {
      return null;
    }

    return _react["default"].createElement("div", null, _react["default"].createElement(_RowSecret["default"], {
      ref: this._ref1,
      titleStyle: titleStyle,
      title: "Alpha:",
      name: "alpha-vantage",
      placeholder: "Alpha Vantage API Key",
      onEnter: this._setKey1
    }), _react["default"].createElement(_RowSecret["default"], {
      ref: this._ref2,
      titleStyle: titleStyle,
      title: "Barchar:",
      name: "barchart",
      placeholder: "Barchar API Key",
      onEnter: this._setKey2
    }), _react["default"].createElement(_RowSecret["default"], {
      ref: this._ref3,
      titleStyle: titleStyle,
      title: "BEA:",
      name: "bea",
      placeholder: "BEA API Key",
      maxLength: "36",
      onEnter: this._setKey3
    }), _react["default"].createElement(_RowSecret["default"], {
      ref: this._ref4,
      titleStyle: titleStyle,
      title: "EIA:",
      name: "eia",
      placeholder: "EIA API Key",
      maxLength: "32",
      onEnter: this._setKey4
    }), _react["default"].createElement(_RowSecret["default"], {
      ref: this._ref5,
      titleStyle: titleStyle,
      title: "Intrinio:",
      name: "intrinio",
      placeholder: "Intrinio API Key",
      maxLength: "32",
      onEnter: this._setKey5
    }), _react["default"].createElement(_RowSecret["default"], {
      ref: this._ref6,
      titleStyle: titleStyle,
      title: "IEX:",
      name: "iex-cloud",
      placeholder: "IEX Cloud API Key",
      maxLength: "35",
      onEnter: this._setKey6
    }), _react["default"].createElement(_RowSecret["default"], {
      ref: this._ref7,
      titleStyle: titleStyle,
      title: "Quandl:",
      name: "quandl",
      placeholder: "Quandl API Key",
      onEnter: this._setKey7
    }), _react["default"].createElement(_RowSecret["default"], {
      ref: this._ref8,
      titleStyle: titleStyle,
      title: "WTD:",
      name: "wtd",
      placeholder: "World Trading Data API Key",
      maxLength: "60",
      onEnter: this._setKey8
    }), _react["default"].createElement(_RowButtons["default"], {
      btStyle: btStyle,
      onClose: onClose
    }, _react["default"].createElement(_FlatButton["default"], {
      rootStyle: btStyle,
      caption: "CLEAR ALL",
      onClick: this._hClearAll
    }), _react["default"].createElement(_FlatButton["default"], {
      rootStyle: (0, _extends2["default"])({}, btStyle, {}, S.BT_SET),
      caption: "SET ALL",
      onClick: this._hSetAll
    })));
  };

  return PaneApiKey;
}(_react.Component);

var _default = PaneApiKey;
exports["default"] = _default;
//# sourceMappingURL=PaneApiKey.js.map