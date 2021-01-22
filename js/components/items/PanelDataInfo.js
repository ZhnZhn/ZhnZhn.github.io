"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

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
    width: 90,
    paddingRight: 5,
    color: '#1b75bb',
    textAlign: 'right',
    fontWeight: 'bold'
  },
  INFO_TEXT: {
    color: 'black',
    fontWeight: 'bold',
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

var _renderQuandlLink = function _renderQuandlLink(dbCode, dsCode) {
  var Comp = _RouterNativeLink["default"]['QUANDL'];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    dbCode: dbCode,
    dsCode: dsCode
  });
};

var _renderNativeLink = function _renderNativeLink(linkFn, item) {
  var Comp = linkFn ? _RouterNativeLink["default"][linkFn] : void 0;
  return Comp != null ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    item: item
  }) : null;
};

var _isShortDescr = function _isShortDescr(descr) {
  return descr && descr.length < 200;
};

var PanelDataInfo = function PanelDataInfo(_ref) {
  var isShow = _ref.isShow,
      info = _ref.info,
      zhInfo = _ref.zhInfo,
      onClickChart = _ref.onClickChart;

  var _ref2 = info || {},
      name = _ref2.name,
      toDate = _ref2.toDate,
      fromDate = _ref2.fromDate,
      frequency = _ref2.frequency,
      database_code = _ref2.database_code,
      dataset_code = _ref2.dataset_code,
      description = _ref2.description,
      _ref3 = zhInfo || {},
      item = _ref3.item,
      linkFn = _ref3.linkFn,
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
    }), _renderQuandlLink(database_code, dataset_code), description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].OpenClose, {
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
    }), _renderNativeLink(linkFn, item)]
  });
};

var _default = PanelDataInfo;
exports["default"] = _default;
//# sourceMappingURL=PanelDataInfo.js.map