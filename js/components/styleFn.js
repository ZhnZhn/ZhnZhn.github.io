"use strict";

exports.__esModule = true;
exports.getColorBlack = exports.crStyle3 = exports.crStyle2 = exports.crShowHide = exports.crScrollYCn = exports.crElementCn = exports.crElementBorderCn = exports.crElementBgCn = exports.crDialogCn = exports.crContainerCn = exports.crCn = exports.crBtCircleHfCn = exports.crBtCircleCn = exports.crBsContainerCn = exports.S_NONE = exports.S_INLINE = exports.S_BLOCK = exports.CL_WIDTH_100_PERCENT = exports.CL_TEXT_ELLIPSIS = exports.CL_SHOW_POPUP = exports.CL_ROW_TYPE2_TOPIC = exports.CL_ROW_PANE_TOPIC = exports.CL_OC_BLACK = exports.CL_NOT_SELECTED = exports.CL_CHB_BLACK = exports.CL_BLACK = void 0;
var _uiTheme = require("./styles/uiTheme");
exports.getColorBlack = _uiTheme.getColorBlack;
const _isArr = Array.isArray;
const _getCn = arrOrStr => _isArr(arrOrStr) ? arrOrStr[0] ? arrOrStr[1] : '' : arrOrStr || '';
const crCn = (arrOrStr1, arrOrStr2) => {
  const _cl1 = _getCn(arrOrStr1),
    _cl2 = _getCn(arrOrStr2);
  return _cl1 ? _cl2 ? `${_cl1} ${_cl2}` : _cl1 : _cl2 || void 0;
};
exports.crCn = crCn;
const CL_SHOW_POPUP = exports.CL_SHOW_POPUP = "show-popup";
const CL_BLACK = exports.CL_BLACK = "black";
const CL_CHB_BLACK = exports.CL_CHB_BLACK = "chb-bl";
const CL_NOT_SELECTED = exports.CL_NOT_SELECTED = "not-selected";
const CL_TEXT_ELLIPSIS = exports.CL_TEXT_ELLIPSIS = "text-ellipsis";
const CL_WIDTH_100_PERCENT = exports.CL_WIDTH_100_PERCENT = "w-100";
const _crRowCn = className => `${className} ${CL_BLACK} ${CL_NOT_SELECTED}`;
const CL_ROW_PANE_TOPIC = exports.CL_ROW_PANE_TOPIC = _crRowCn("row__pane-topic");
const CL_ROW_TYPE2_TOPIC = exports.CL_ROW_TYPE2_TOPIC = _crRowCn("row__type2-topic");
const CL_OC_BLACK = exports.CL_OC_BLACK = "zhn-oc-black";
const S_BLOCK = exports.S_BLOCK = {
  display: "block"
};
const S_INLINE = exports.S_INLINE = {
  display: "inline-block"
};
const S_NONE = exports.S_NONE = {
  display: "none"
};
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
const crContainerCn = className => crCn(className, CL_C_BG);
exports.crContainerCn = crContainerCn;
const crBsContainerCn = className => crContainerCn(crCn("bs-cont", className));
exports.crBsContainerCn = crBsContainerCn;
const crScrollYCn = className => crCn("scroll-container-y", className);
exports.crScrollYCn = crScrollYCn;
const CL_EL_B = "el-b";
const crDialogCn = className => crCn(className, `${CL_C_BG} ${CL_EL_B}`);
exports.crDialogCn = crDialogCn;
const crElementBorderCn = className => crCn(className, CL_EL_B);
exports.crElementBorderCn = crElementBorderCn;
const CL_EL_BG = "el-bg";
const crElementCn = className => crCn(className, `el-c ${CL_EL_BG}`);
exports.crElementCn = crElementCn;
const crElementBgCn = className => crCn(className, CL_EL_BG);
exports.crElementBgCn = crElementBgCn;
const crBtCircleHfCn = className => crCn(className, "bt-circle-hf");
exports.crBtCircleHfCn = crBtCircleHfCn;
const crBtCircleCn = className => `bt-circle ${className} not-selected`;
exports.crBtCircleCn = crBtCircleCn;
//# sourceMappingURL=styleFn.js.map