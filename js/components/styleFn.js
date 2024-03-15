"use strict";

exports.__esModule = true;
exports.getColorBlack = exports.crStyle3 = exports.crStyle2 = exports.crStepStyle = exports.crShowHide = exports.crScrollYCn = exports.crElementCn = exports.crElementBorderCn = exports.crElementBgCn = exports.crDialogCn = exports.crContainerCn = exports.crCnNotSelected = exports.crCn = exports.crBtSvgCn = exports.crBtCircleHfCn = exports.crBtCircleCn = exports.crBsContainerCn = exports.crBoldCn = exports.S_OPEN_CLOSE_LEVEL_2 = exports.S_NONE = exports.S_INLINE = exports.S_BLOCK = exports.CL_WIDTH_100_PERCENT = exports.CL_TEXT_ELLIPSIS = exports.CL_SHOW_POPUP = exports.CL_ROW_TYPE2_TOPIC = exports.CL_ROW_PANE_TOPIC = exports.CL_OPEN_CLOSE_EXP = exports.CL_OPEN_CLOSE_BLACK = exports.CL_OPEN_CLOSE = exports.CL_NOT_SELECTED = exports.CL_CHB_BLACK = exports.CL_BLACK = void 0;
var _uiApi = require("./uiApi");
var _uiTheme = require("./styles/uiTheme");
exports.getColorBlack = _uiTheme.getColorBlack;
const _getCn = arrOrStr => (0, _uiApi.isArr)(arrOrStr) ? arrOrStr[0] ? arrOrStr[1] : '' : arrOrStr || '';
const crCn = (arrOrStr1, arrOrStr2) => {
  const _cl1 = _getCn(arrOrStr1),
    _cl2 = _getCn(arrOrStr2);
  return _cl1 ? _cl2 ? _cl1 + " " + _cl2 : _cl1 : _cl2 || void 0;
};
exports.crCn = crCn;
const _fCrCn = className1 => className2 => crCn(className2, className1);
const CL_SHOW_POPUP = exports.CL_SHOW_POPUP = "show-popup";
const CL_BLACK = exports.CL_BLACK = "black";
const CL_CHB_BLACK = exports.CL_CHB_BLACK = "chb-bl";
const CL_NOT_SELECTED = exports.CL_NOT_SELECTED = "not-selected";
const CL_TEXT_ELLIPSIS = exports.CL_TEXT_ELLIPSIS = "text-ellipsis";
const CL_WIDTH_100_PERCENT = exports.CL_WIDTH_100_PERCENT = "w-100";
const crCnNotSelected = exports.crCnNotSelected = _fCrCn(CL_NOT_SELECTED);
const _fCrCnNotSelected = className1 => className2 => crCnNotSelected(className2 + " " + className1);
const _crRowCn = _fCrCnNotSelected(CL_BLACK);
const CL_ROW_PANE_TOPIC = exports.CL_ROW_PANE_TOPIC = _crRowCn("row__pane-topic");
const CL_ROW_TYPE2_TOPIC = exports.CL_ROW_TYPE2_TOPIC = _crRowCn("row__type2-topic");
const OPEN_CLOSE = "open-close";
const CL_OPEN_CLOSE = exports.CL_OPEN_CLOSE = OPEN_CLOSE + " cfs-dark";
const CL_OPEN_CLOSE_EXP = exports.CL_OPEN_CLOSE_EXP = OPEN_CLOSE + "__exp";
const CL_OPEN_CLOSE_BLACK = exports.CL_OPEN_CLOSE_BLACK = OPEN_CLOSE + " cfs-black";
const S_BLOCK = exports.S_BLOCK = {
  display: "block"
};
const S_INLINE = exports.S_INLINE = {
  display: "inline-block"
};
const S_NONE = exports.S_NONE = {
  display: "none"
};
const S_OPEN_CLOSE_LEVEL_2 = exports.S_OPEN_CLOSE_LEVEL_2 = {
  marginLeft: 8,
  paddingLeft: 8,
  borderLeft: "solid 2px var(--btf-c)"
};
const crStepStyle = function (color, size) {
  if (size === void 0) {
    size = 26;
  }
  return {
    ...S_INLINE,
    color,
    width: size,
    height: size,
    textAlign: "center",
    border: "solid 2px " + color,
    borderRadius: "50%"
  };
};
exports.crStepStyle = crStepStyle;
const crShowHide = (is, className, withoutAnimation, animationClassName) => is ? [crCn(className, [!withoutAnimation, animationClassName || CL_SHOW_POPUP]), S_BLOCK] : [className, S_NONE];
exports.crShowHide = crShowHide;
const crStyle2 = (style1, style2) => style2 ? {
  ...style1,
  ...style2
} : style1;
exports.crStyle2 = crStyle2;
const crStyle3 = (style1, style2, style3) => crStyle2(crStyle2(style1, style2), style3);
exports.crStyle3 = crStyle3;
const CL_C_BG = "c-bg";
const crContainerCn = exports.crContainerCn = _fCrCn(CL_C_BG);
const crBsContainerCn = className => crContainerCn(crCn("bs-cont", className));
exports.crBsContainerCn = crBsContainerCn;
const crScrollYCn = exports.crScrollYCn = _fCrCn("scroll-container-y");
const CL_EL_B = "el-b";
const crDialogCn = exports.crDialogCn = _fCrCn(CL_C_BG + " " + CL_EL_B);
const crElementBorderCn = exports.crElementBorderCn = _fCrCn(CL_EL_B);
const CL_EL_BG = "el-bg";
const crElementCn = exports.crElementCn = _fCrCn("el-c " + CL_EL_BG);
const crElementBgCn = exports.crElementBgCn = _fCrCn(CL_EL_BG);
const crBtCircleHfCn = exports.crBtCircleHfCn = _fCrCn("bt-circle-hf");
const crBtCircleCn = exports.crBtCircleCn = _fCrCnNotSelected("bt-circle");
const crBoldCn = exports.crBoldCn = _fCrCn("bold");
const crBtSvgCn = token => "bt-svg-" + token;
exports.crBtSvgCn = crBtSvgCn;
//# sourceMappingURL=styleFn.js.map