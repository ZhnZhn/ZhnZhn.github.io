"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _RouterNativeLink = _interopRequireDefault(require("../native-links/RouterNativeLink"));

var _Comp = _interopRequireDefault(require("../Comp"));

var CL_DESCR = 'info__descr';
var C_DESCR_OPEN = '#1b2836';
var S = {
  ROOT_SHOW: {
    position: 'relative',
    display: 'block',
    paddingTop: 34,
    paddingRight: 20,
    paddingLeft: 8
  },
  ROOT_HIDE: {
    position: 'relative',
    display: 'none'
  },
  BT_CAPTION: {
    left: 286
  },
  TO_DATE_INFO: {
    marginTop: 4
  },
  INFO_CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    width: 90,
    paddingRight: 5,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  INFO_TEXT: {
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize'
  },
  DESCR_INFO: {
    lineHeight: 1.7
  },
  DESCR_TEXT: {
    color: 'gray',
    fontWeight: 'bold'
  }
};

var _isWithoutLink = function _isWithoutLink(item) {
  if (item === void 0) {
    item = {};
  }

  var _item = item,
      _item$id = _item.id,
      id = _item$id === void 0 ? '' : _item$id;
  return id.split('/')[0] === 'LSE' ? true : false;
};

var _isShortDescr = function _isShortDescr(descr) {
  return descr && descr.length < 200;
};

var PanelDataInfo = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(PanelDataInfo, _Component);

  function PanelDataInfo() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._renderQuandlLink = function (dbCode, dsCode) {
      if (!dbCode || !dsCode) {
        return null;
      } else {
        var Comp = _RouterNativeLink["default"]['QUANDL'];
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
          dbCode: dbCode,
          dsCode: dsCode
        });
      }
    };

    _this._renderNativeLink = function (linkFn, item) {
      if (_isWithoutLink(item)) {
        return null;
      }

      var Comp = _RouterNativeLink["default"][linkFn];
      return typeof Comp !== 'undefined' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
        item: item
      }) : null;
    };

    return _this;
  }

  var _proto = PanelDataInfo.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        _this$props$info = _this$props.info,
        info = _this$props$info === void 0 ? {} : _this$props$info,
        _this$props$zhInfo = _this$props.zhInfo,
        zhInfo = _this$props$zhInfo === void 0 ? {} : _this$props$zhInfo,
        onClickChart = _this$props.onClickChart,
        name = info.name,
        toDate = info.toDate,
        fromDate = info.fromDate,
        frequency = info.frequency,
        database_code = info.database_code,
        dataset_code = info.dataset_code,
        description = info.description,
        item = zhInfo.item,
        linkFn = zhInfo.linkFn,
        _style = isShow ? S.ROOT_SHOW : S.ROOT_HIDE;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: _style,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].ButtonTab, {
        style: S.BT_CAPTION,
        caption: "Chart",
        onClick: onClickChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].InfoPart, {
        text: name,
        styleText: S.INFO_TEXT
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].InfoPart, {
        caption: "From Date",
        styleCaption: S.INFO_CAPTION,
        text: fromDate,
        styleText: S.INFO_TEXT
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].InfoPart, {
        style: S.TO_DATE_INFO,
        caption: "To Date",
        styleCaption: S.INFO_CAPTION,
        text: toDate,
        styleText: S.INFO_TEXT
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].InfoPart, {
        caption: "Frequency",
        styleCaption: S.INFO_CAPTION,
        text: frequency,
        styleText: S.INFO_TEXT
      }), this._renderQuandlLink(database_code, dataset_code), description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].OpenClose, {
        isClose: !_isShortDescr(description),
        caption: "Description",
        openColor: C_DESCR_OPEN,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].InfoPart, {
          style: S.DESCR_INFO,
          isHtml: true,
          text: description,
          classText: CL_DESCR,
          styleText: S.DESCR_TEXT
        })
      }), this._renderNativeLink(linkFn, item)]
    });
  };

  return PanelDataInfo;
}(_react.Component);

var _default = PanelDataInfo;
exports["default"] = _default;
//# sourceMappingURL=PanelDataInfo.js.map