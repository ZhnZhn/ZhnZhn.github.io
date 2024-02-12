export { getColorBlack } from './styles/uiTheme';

const _isArr = Array.isArray;

const _getCn = (arrOrStr) => _isArr(arrOrStr)
  ? arrOrStr[0] ? arrOrStr[1] : ''
  : arrOrStr || '';

export const crCn = (
  arrOrStr1,
  arrOrStr2
) => {
  const _cl1 = _getCn(arrOrStr1)
  , _cl2 = _getCn(arrOrStr2);
  return _cl1
    ? _cl2 ? `${_cl1} ${_cl2}` : _cl1
    : _cl2 || void 0 ;
}

export const CL_SHOW_POPUP = "show-popup"
export const CL_BLACK = "black"
export const CL_CHB_BLACK = "chb-bl"
export const CL_NOT_SELECTED = "not-selected"
export const CL_TEXT_ELLIPSIS= "text-ellipsis"
export const CL_WIDTH_100_PERCENT = "w-100"

export const crCnNotSelected = className => crCn(
  className,
  CL_NOT_SELECTED
)

const _crRowCn = className => crCnNotSelected(`${className} ${CL_BLACK}`)
export const CL_ROW_PANE_TOPIC = _crRowCn("row__pane-topic")
export const CL_ROW_TYPE2_TOPIC = _crRowCn("row__type2-topic")
export const CL_OC_BLACK = "zhn-oc-black"

export const S_BLOCK = { display: "block" }
export const S_INLINE = { display: "inline-block" }
export const S_NONE = { display: "none" }

export const crShowHide = (
  is,
  className,
  withoutAnimation,
  animationClassName
) => is
  ? [
      crCn(
        className,
        [!withoutAnimation, animationClassName || CL_SHOW_POPUP]
      ),
      S_BLOCK
    ]
  : [
      className,
      S_NONE
    ]

export const crStyle2 = (
  style1,
  style2
) => style2
  ? {...style1, ...style2}
  : style1

export const crStyle3 = (
  style1,
  style2,
  style3
) => crStyle2(
  crStyle2(style1, style2),
  style3
)

const CL_C_BG = "c-bg"
export const crContainerCn = (
  className
) => crCn(className, CL_C_BG)

export const crBsContainerCn = (
  className
) => crContainerCn(crCn("bs-cont", className))


export const crScrollYCn = (
  className
) => crCn("scroll-container-y", className)

const CL_EL_B = "el-b";
export const crDialogCn = (
  className
) => crCn(className, `${CL_C_BG} ${CL_EL_B}`)

export const crElementBorderCn = (
  className
) => crCn(className, CL_EL_B)

const CL_EL_BG = "el-bg";
export const crElementCn = (
  className
) => crCn(className, `el-c ${CL_EL_BG}`)

export const crElementBgCn = (
  className
) => crCn(className, CL_EL_BG)

export const crBtCircleHfCn = (
  className
) => crCn(className, "bt-circle-hf")

export const crBtCircleCn = (
  className
) => crCnNotSelected(`bt-circle ${className}`)
