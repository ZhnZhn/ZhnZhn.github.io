"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _RouterNativeLink = _interopRequireDefault(require("../native-links/RouterNativeLink"));
var _useWasShown = _interopRequireDefault(require("../hooks/useWasShown"));
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
    ..._styleFn.S_FONT_WEIGHT_BOLD
  },
  S_TEXT = {
    textTransform: 'capitalize',
    ..._styleFn.S_FONT_WEIGHT_BOLD
  },
  S_DESCR_INFO = {
    lineHeight: 1.6
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
const BoldParagraph = _ref2 => {
  let {
    text
  } = _ref2;
  return text ? /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    style: _styleFn.S_FONT_WEIGHT_BOLD,
    children: text
  }) : null;
};
const InfoDescr = _ref3 => {
  let {
    descr
  } = _ref3;
  return !descr ? null : (0, _isTypeFn.isArr)(descr) ? descr.map(text => /*#__PURE__*/(0, _jsxRuntime.jsx)(BoldParagraph, {
    text: text
  }, text)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(BoldParagraph, {
    text: descr
  });
};
const InfoLink = _ref4 => {
  let {
    href
  } = _ref4;
  return (0, _isTypeFn.isArr)(href) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
      href: href[0],
      children: href[1]
    })
  }) : null;
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
const PanelDataInfo = props => {
  const _wasShown = (0, _useWasShown.default)(props.isShow),
    _info = props.info || {},
    _infoDescription = _info.description,
    _infoDescr = _info.descr,
    _infoHref = _info.href,
    _zhInfo = props.zhInfo || {},
    _style = props.isShow ? _styleFn.S_BLOCK : _styleFn.S_NONE;
  return _wasShown ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT,
      ..._style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonTab.default, {
      style: S_BT_CAPTION,
      caption: "Chart",
      onClick: props.onClickChart
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoPartWithStyle, {
      t: _info.name
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoPartWithStyle, {
      c: "From Date",
      t: _info.fromDate
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoPartWithStyle, {
      c: "To Date",
      t: _info.toDate,
      s: S_TO_DATE_INFO
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoPartWithStyle, {
      c: "Frequency",
      t: _info.frequency
    }), _renderNdlLink(_info.linkId), (_infoDescription || _infoDescr || (0, _isTypeFn.isArr)(_infoHref)) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose.default, {
      isClose: !_isShortDescr(_infoDescription || _infoDescr),
      caption: "Description",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(InfoDescr, {
        descr: _infoDescr
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoLink, {
        href: _infoHref
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InfoLink, {
        href: _info.href2
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InfoPart.default, {
        style: S_DESCR_INFO,
        isHtml: true,
        text: _infoDescription,
        textCn: CL_DESCR,
        textStyle: _styleFn.S_FONT_WEIGHT_BOLD
      })]
    }), _renderNativeLink(_zhInfo.linkFn, _zhInfo.item)]
  }) : null;
};
var _default = exports.default = PanelDataInfo;
//# sourceMappingURL=PanelDataInfo.js.map