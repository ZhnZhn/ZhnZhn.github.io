"use strict";

exports.__esModule = true;
exports.getScreenCase = exports.getColorBlack = exports.crWithScrollCn = exports.crStyle3 = exports.crStyle2 = exports.crSliderTransformStyle = exports.crShowHide = exports.crScrollYCn = exports.crNotSelectedCn = exports.crItemCaptionCn = exports.crFs18Cn = exports.crFlexRowCn = exports.crElementCn = exports.crElementBgCn = exports.crDialogCn = exports.crContainerCn = exports.crColorStyle = exports.crCn = exports.crBtSvgCn = exports.crBtCircleHfCn = exports.crBtCircleCn = exports.crBtCircle2Cn = exports.crBsContainerCn = exports.crBoldCn = exports.crBold16Cn = exports.crAbsoluteTopLeftStyle = exports.S_OPEN_CLOSE_LEVEL_2 = exports.S_NONE = exports.S_INLINE = exports.S_FLEX = exports.S_BORDER_RADIUS_2 = exports.S_BLOCK = exports.CL_WIDTH_100_PERCENT = exports.CL_TOGGLE_ARROW = exports.CL_TEXT_ELLIPSIS = exports.CL_SHOW_POPUP = exports.CL_ROW__PANE_TOPIC = exports.CL_ROW_TYPE2_TOPIC = exports.CL_ROW_TOPIC = exports.CL_ROW_PANE_TOPIC = exports.CL_POPUP_MENU = exports.CL_OPEN_CLOSE_EXP = exports.CL_OPEN_CLOSE_BLACK = exports.CL_OPEN_CLOSE = exports.CL_NOT_SELECTED = exports.CL_HRZ_CONTAINER = exports.CL_CHB_BLACK = exports.CL_CHARTS_MENU_MORE = exports.CL_BLACK = void 0;
var _uiApi = require("./uiApi");
var _has = require("./has");
var _uiTheme = require("./styles/uiTheme");
exports.getColorBlack = _uiTheme.getColorBlack;
const getScreenCase = (wideScreenCase, narrowScreenCase) => _has.HAS_WIDE_SCREEN ? wideScreenCase : narrowScreenCase;
exports.getScreenCase = getScreenCase;
const _getCn = arrOrStr => (0, _uiApi.isArr)(arrOrStr) ? arrOrStr[0] ? arrOrStr[1] : '' : arrOrStr || '';
const crCn = (arrOrStr1, arrOrStr2) => {
  const _cl1 = _getCn(arrOrStr1),
    _cl2 = _getCn(arrOrStr2);
  return _cl1 ? _cl2 ? `${_cl1} ${_cl2}` : _cl1 : _cl2 || void 0;
};
exports.crCn = crCn;
const _fCrCn = className1 => className2 => crCn(className2, className1);
const CL_TOGGLE_ARROW = exports.CL_TOGGLE_ARROW = 'toggle-arrow';
const CL_SHOW_POPUP = exports.CL_SHOW_POPUP = "show-popup";
const CL_BLACK = exports.CL_BLACK = "black";
const CL_CHB_BLACK = exports.CL_CHB_BLACK = "chb-bl";
const CL_NOT_SELECTED = exports.CL_NOT_SELECTED = "not-selected";
const CL_TEXT_ELLIPSIS = exports.CL_TEXT_ELLIPSIS = "text-ellipsis";
const CL_WIDTH_100_PERCENT = exports.CL_WIDTH_100_PERCENT = "w-100";
const CL_BOX_SHADOW_5 = 'box-shadow-5';
const CL_POPUP_MENU = exports.CL_POPUP_MENU = `popup-menu ${CL_BOX_SHADOW_5}`;

//export const NBSP = "\u00A0"

const crFs18Cn = exports.crFs18Cn = _fCrCn("fs-18");
const crBold16Cn = exports.crBold16Cn = _fCrCn("bold-16");
const crWithScrollCn = exports.crWithScrollCn = _fCrCn("with-scroll");
const crNotSelectedCn = exports.crNotSelectedCn = _fCrCn(CL_NOT_SELECTED);
const _fCrCnNotSelected = className1 => className2 => crNotSelectedCn(`${className2} ${className1}`);
const _crMenuItemCn = _fCrCn("menuitem");
const _crNotSelectedBold16MenuItemCn = className => crNotSelectedCn(crBold16Cn(_crMenuItemCn(className)));
const CL_ROW_TOPIC = exports.CL_ROW_TOPIC = _crNotSelectedBold16MenuItemCn("row__topic");
const CL_ROW__PANE_TOPIC = exports.CL_ROW__PANE_TOPIC = _crNotSelectedBold16MenuItemCn("row__pane-topic");
const _crRowCn = _fCrCnNotSelected(CL_BLACK);
const CL_ROW_PANE_TOPIC = exports.CL_ROW_PANE_TOPIC = _crRowCn(CL_ROW__PANE_TOPIC);
const CL_ROW_TYPE2_TOPIC = exports.CL_ROW_TYPE2_TOPIC = _crRowCn(_crNotSelectedBold16MenuItemCn("row__type2-topic"));
const OPEN_CLOSE = "open-close";
const CL_OPEN_CLOSE = exports.CL_OPEN_CLOSE = `${OPEN_CLOSE} cfs-dark`;
const CL_OPEN_CLOSE_EXP = exports.CL_OPEN_CLOSE_EXP = `${OPEN_CLOSE}__exp`;
const CL_OPEN_CLOSE_BLACK = exports.CL_OPEN_CLOSE_BLACK = `${OPEN_CLOSE} cfs-black`;
const _fCrStyle = propName => value => ({
    [propName]: value
  }),
  _crDisplayStyle = _fCrStyle("display");
const S_BLOCK = exports.S_BLOCK = _crDisplayStyle("block");
const S_INLINE = exports.S_INLINE = _crDisplayStyle("inline-block");
const S_NONE = exports.S_NONE = _crDisplayStyle("none");
const S_FLEX = exports.S_FLEX = _crDisplayStyle("flex");
const crColorStyle = exports.crColorStyle = _fCrStyle("color");
const S_BORDER_RADIUS_2 = exports.S_BORDER_RADIUS_2 = {
  borderRadius: 2
};
const S_OPEN_CLOSE_LEVEL_2 = exports.S_OPEN_CLOSE_LEVEL_2 = {
  marginLeft: 8,
  paddingLeft: 8,
  borderLeft: `solid 2px var(--btf-c)`
};
const crAbsoluteTopLeftStyle = (top, left, isRight, isBottom) => ({
  position: 'absolute',
  [isBottom ? 'bottom' : 'top']: top,
  [isRight ? 'right' : 'left']: left
});
exports.crAbsoluteTopLeftStyle = crAbsoluteTopLeftStyle;
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
const crDialogCn = exports.crDialogCn = _fCrCn(`${CL_C_BG} ${CL_BOX_SHADOW_5}`);
const CL_CHARTS_MENU_MORE = exports.CL_CHARTS_MENU_MORE = "charts__menu-more";
const CL_EL_BG = "el-bg";
const CL_EL_C = "el-c";
const crElementCn = exports.crElementCn = _fCrCn(`${CL_EL_C} ${CL_EL_BG}`);
const crElementBgCn = exports.crElementBgCn = _fCrCn(CL_EL_BG);
const crItemCaptionCn = exports.crItemCaptionCn = _fCrCn(`${CL_C_BG} ${CL_EL_C} el-bb`);
const crBtCircleHfCn = exports.crBtCircleHfCn = _fCrCn("bt-circle-hf");
const crBtCircleCn = exports.crBtCircleCn = _fCrCnNotSelected("bt-circle");
const crBtCircle2Cn = cn => crCn(crBtCircleCn("bt-c2"), cn);
exports.crBtCircle2Cn = crBtCircle2Cn;
const crBoldCn = exports.crBoldCn = _fCrCn("bold");
const crBtSvgCn = token => `bt-svg-${token}`;
exports.crBtSvgCn = crBtSvgCn;
const crFlexRowCn = exports.crFlexRowCn = _fCrCn("flex-row");
const CL_HRZ_CONTAINER = exports.CL_HRZ_CONTAINER = crFlexRowCn("hrz-container");
const _crTransformTranslateX = x => ({
  transform: `matrix(1, 0, 0, 1, ${x}, 0)`
});
const crSliderTransformStyle = (pageWidth, pageCurrent) => _crTransformTranslateX(-1 * pageWidth * (pageCurrent - 1) + 0);
exports.crSliderTransformStyle = crSliderTransformStyle;
//# sourceMappingURL=styleFn.js.map