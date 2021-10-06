"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _RouterNativeLink = _interopRequireDefault(require("../native-links/RouterNativeLink"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_DESCR = 'info__descr',
      C_DESCR_OPEN = '#1b2836',
      S_ROOT_SHOW = {
  position: 'relative',
  display: 'block',
  padding: '34px 20px 0 8px'
},
      S_ROOT_HIDE = {
  position: 'relative',
  display: 'none'
},
      S_BT_CAPTION = {
  left: 286
},
      S_TO_DATE_INFO = {
  marginTop: 4
},
      S_INFO_CAPTION = {
  display: 'inline-block',
  width: 90,
  paddingRight: 5,
  color: '#1b75bb',
  textAlign: 'right',
  fontWeight: 'bold'
},
      S_INFO_TEXT = {
  color: 'black',
  fontWeight: 'bold',
  textTransform: 'capitalize'
},
      S_DESCR_INFO = {
  lineHeight: 1.7
},
      S_DESCR_TEXT = {
  color: 'gray',
  fontWeight: 'bold'
};

const _renderQuandlLink = (dbCode, dsCode) => {
  const Comp = _RouterNativeLink.default['QUANDL'];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    dbCode: dbCode,
    dsCode: dsCode
  });
};

const _renderNativeLink = (linkFn, item) => {
  const Comp = linkFn ? _RouterNativeLink.default[linkFn] : void 0;
  return Comp != null ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    item: item
  }) : null;
};

const _isShortDescr = descr => descr && descr.length < 200;

const PanelDataInfo = ({
  isShow,
  info,
  zhInfo,
  onClickChart
}) => {
  const {
    name,
    toDate,
    fromDate,
    frequency,
    database_code,
    dataset_code,
    description
  } = info || {},
        {
    item,
    linkFn
  } = zhInfo || {},
        _style = isShow ? S_ROOT_SHOW : S_ROOT_HIDE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ButtonTab, {
      style: S_BT_CAPTION,
      caption: "Chart",
      onClick: onClickChart
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
      text: name,
      styleText: S_INFO_TEXT
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
      caption: "From Date",
      captionStyle: S_INFO_CAPTION,
      text: fromDate,
      textStyle: S_INFO_TEXT
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
      style: S_TO_DATE_INFO,
      caption: "To Date",
      captionStyle: S_INFO_CAPTION,
      text: toDate,
      textStyle: S_INFO_TEXT
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
      caption: "Frequency",
      captionStyle: S_INFO_CAPTION,
      text: frequency,
      textStyle: S_INFO_TEXT
    }), _renderQuandlLink(database_code, dataset_code), description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.OpenClose, {
      isClose: !_isShortDescr(description),
      caption: "Description",
      openColor: C_DESCR_OPEN,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
        style: S_DESCR_INFO,
        isHtml: true,
        text: description,
        textCn: CL_DESCR,
        textStyle: S_DESCR_TEXT
      })
    }), _renderNativeLink(linkFn, item)]
  });
};

var _default = PanelDataInfo;
exports.default = _default;
//# sourceMappingURL=PanelDataInfo.js.map