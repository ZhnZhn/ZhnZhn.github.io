"use strict";

exports.__esModule = true;
exports.crStyle3 = exports.crStyle2 = exports.crShowHide = exports.crContainerCn = exports.crCn = exports.crBsContainerCn = exports.S_NONE = exports.S_INLINE = exports.S_BLOCK = exports.CL_SHOW_POPUP = void 0;
const _isArr = Array.isArray;
const _getCn = arrOrStr => _isArr(arrOrStr) ? arrOrStr[0] ? arrOrStr[1] : '' : arrOrStr || '';
const crCn = (arrOrStr1, arrOrStr2) => {
  const _cl1 = _getCn(arrOrStr1),
    _cl2 = _getCn(arrOrStr2);
  return _cl1 ? _cl2 ? _cl1 + " " + _cl2 : _cl1 : _cl2 || void 0;
};
exports.crCn = crCn;
const CL_SHOW_POPUP = 'show-popup';
exports.CL_SHOW_POPUP = CL_SHOW_POPUP;
const S_BLOCK = {
  display: 'block'
};
exports.S_BLOCK = S_BLOCK;
const S_INLINE = {
  display: 'inline-block'
};
exports.S_INLINE = S_INLINE;
const S_NONE = {
  display: 'none'
};
exports.S_NONE = S_NONE;
const crShowHide = (is, className, withoutAnimation, animationClassName) => is ? [crCn(className, [!withoutAnimation, animationClassName || CL_SHOW_POPUP]), S_BLOCK] : [className, S_NONE];
exports.crShowHide = crShowHide;
const crStyle2 = (style1, style2) => style2 ? {
  ...style1,
  ...style2
} : style1;
exports.crStyle2 = crStyle2;
const crStyle3 = (style1, style2, style3) => crStyle2(crStyle2(style1, style2), style3);
exports.crStyle3 = crStyle3;
const crContainerCn = className => crCn(className, 'c-bg');
exports.crContainerCn = crContainerCn;
const crBsContainerCn = className => crContainerCn(crCn('bs-cont', className));
exports.crBsContainerCn = crBsContainerCn;
//# sourceMappingURL=styleFn.js.map