"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _RouterNativeLink = _interopRequireDefault(require("../native-links/RouterNativeLink"));
var _InfoPart = _interopRequireDefault(require("../zhn/InfoPart"));
var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_DESCR = `info__descr ${_styleFn.CL_BLACK}`,
  S_ROOT = {
    position: 'relative',
    padding: '34px 20px 0 8px'
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
  S_TEXT = {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  S_DESCR_INFO = {
    lineHeight: 1.6
  },
  S_FONT_WEIGHT_BOLD = {
    fontWeight: 'bold'
  };
const InfoPartWithStyle = _ref => {
  let {
    c,
    t,
    s
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InfoPart.default, {
    style: s,
    caption: c,
    captionStyle: S_INFO_CAPTION,
    textCn: _styleFn.CL_BLACK,
    textStyle: S_TEXT,
    text: t
  });
};
const _renderNdlLink = linkId => {
  if (!linkId) return null;
  const Comp = _RouterNativeLink.default.NDL;
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
const _isShortDescr = descr => !descr || descr && descr.length < 200;
const PanelDataInfo = _ref2 => {
  let {
    isShow,
    info,
    zhInfo,
    onClickChart
  } = _ref2;
  const {
      name,
      toDate,
      fromDate,
      frequency,
      linkId,
      description,
      descr,
      descr2,
      href,
      href2
    } = info || {},
    {
      item,
      linkFn
    } = zhInfo || {},
    _style = isShow ? _styleFn.S_BLOCK : _styleFn.S_NONE;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT,
      ..._style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
      style: S_BT_CAPTION,
      caption: "Chart",
      onClick: onClickChart
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoPartWithStyle, {
      t: name
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoPartWithStyle, {
      c: "From Date",
      t: fromDate
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoPartWithStyle, {
      c: "To Date",
      t: toDate,
      s: S_TO_DATE_INFO
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoPartWithStyle, {
      c: "Frequency",
      t: frequency
    }), _renderNdlLink(linkId), (description || (0, _isTypeFn.isArr)(href)) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose.default, {
      isClose: !_isShortDescr(description),
      caption: "Description",
      children: [!!descr && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: S_FONT_WEIGHT_BOLD,
        children: descr
      }), !!descr2 && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: S_FONT_WEIGHT_BOLD,
        children: descr2
      }), (0, _isTypeFn.isArr)(href) && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
          href: href[0],
          children: href[1]
        })
      }), (0, _isTypeFn.isArr)(href2) && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
          href: href2[0],
          children: href2[1]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InfoPart.default, {
        style: S_DESCR_INFO,
        isHtml: true,
        text: description,
        textCn: CL_DESCR,
        textStyle: S_FONT_WEIGHT_BOLD
      })]
    }), _renderNativeLink(linkFn, item)]
  });
};
var _default = exports.default = PanelDataInfo;
//# sourceMappingURL=PanelDataInfo.js.map