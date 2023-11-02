"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _RouterNativeLink = _interopRequireDefault(require("../native-links/RouterNativeLink"));
var _Comp = _interopRequireDefault(require("../Comp"));
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_DESCR = 'info__descr',
  S_ROOT = {
    position: 'relative',
    padding: '34px 20px 0 8px'
  },
  S_SHOW = {
    display: 'block'
  },
  S_HIDE = {
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
  _crTextStyle = () => ({
    ..._styleFn.S_COLOR_BLACK,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }),
  S_DESCR_INFO = {
    lineHeight: 1.7
  },
  S_DESCR_TEXT = {
    color: 'grey',
    fontWeight: 'bold'
  };
const _renderNdlLink = linkId => {
  if (!linkId) return null;
  const Comp = _RouterNativeLink.default['NDL'];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    linkId: linkId
  });
};
const _renderNativeLink = (linkFn, item) => {
  const Comp = linkFn ? _RouterNativeLink.default[linkFn] : void 0;
  return Comp != null ? /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    item: item
  }) : null;
};
const _isShortDescr = descr => descr && descr.length < 200;
const PanelDataInfo = _ref => {
  let {
    isShow,
    info,
    zhInfo,
    onClickChart
  } = _ref;
  const {
      name,
      toDate,
      fromDate,
      frequency,
      linkId,
      description
    } = info || {},
    {
      item,
      linkFn
    } = zhInfo || {},
    _style = isShow ? S_SHOW : S_HIDE,
    _textStyle = _crTextStyle();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT,
      ..._style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ButtonTab, {
      style: S_BT_CAPTION,
      caption: "Chart",
      onClick: onClickChart
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
      text: name,
      textStyle: _textStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
      caption: "From Date",
      captionStyle: S_INFO_CAPTION,
      text: fromDate,
      textStyle: _textStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
      style: S_TO_DATE_INFO,
      caption: "To Date",
      captionStyle: S_INFO_CAPTION,
      text: toDate,
      textStyle: _textStyle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.InfoPart, {
      caption: "Frequency",
      captionStyle: S_INFO_CAPTION,
      text: frequency,
      textStyle: _textStyle
    }), _renderNdlLink(linkId), description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.OpenClose, {
      isClose: !_isShortDescr(description),
      caption: "Description"
      //openColor={C_DESCR_OPEN}
      ,
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
var _default = exports.default = PanelDataInfo;
//# sourceMappingURL=PanelDataInfo.js.map