import { isArr } from './uiApi';
import { HAS_WIDE_SCREEN } from './has';

export { getColorBlack } from './styles/uiTheme';

export const getScreenCase = (
  wideScreenCase,
  narrowScreenCase
) => HAS_WIDE_SCREEN
  ? wideScreenCase
  : narrowScreenCase

const _getCn = (
  arrOrStr
) => isArr(arrOrStr)
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

const _fCrCn = (
  className1
) => (
  className2
) => crCn(className2, className1);

export const CL_TOGGLE_ARROW = 'toggle-arrow'

export const CL_SHOW_POPUP = "show-popup"
export const CL_BLACK = "black"
export const CL_CHB_BLACK = "chb-bl"
export const CL_NOT_SELECTED = "not-selected"
export const CL_TEXT_ELLIPSIS= "text-ellipsis"
export const CL_WIDTH_100_PERCENT = "w-100"

const CL_BOX_SHADOW_5 = 'box-shadow-5'
export const CL_POPUP_MENU = `popup-menu ${CL_BOX_SHADOW_5}`

//export const NBSP = "\u00A0"

export const crFs18Cn = _fCrCn("fs-18")
export const crBold16Cn = _fCrCn("bold-16")
export const crWithScrollCn = _fCrCn("with-scroll")
export const crNotSelectedCn = _fCrCn(CL_NOT_SELECTED)

const _fCrCnNotSelected = (
  className1
) => (
  className2
) => crNotSelectedCn(`${className2} ${className1}`);

const _crMenuItemCn = _fCrCn("menuitem");
const _crNotSelectedBold16MenuItemCn = className => crNotSelectedCn(
  crBold16Cn(_crMenuItemCn(className))
);
export const CL_ROW_TOPIC = _crNotSelectedBold16MenuItemCn("row__topic");

export const CL_ROW__PANE_TOPIC = _crNotSelectedBold16MenuItemCn("row__pane-topic")
const _crRowCn = _fCrCnNotSelected(CL_BLACK);
export const CL_ROW_PANE_TOPIC = _crRowCn(CL_ROW__PANE_TOPIC)

export const CL_ROW_TYPE2_TOPIC = _crRowCn(
  _crNotSelectedBold16MenuItemCn("row__type2-topic")
)

const OPEN_CLOSE = "open-close";
export const CL_OPEN_CLOSE = `${OPEN_CLOSE} cfs-dark`
export const CL_OPEN_CLOSE_EXP = `${OPEN_CLOSE}__exp`
export const CL_OPEN_CLOSE_BLACK = `${OPEN_CLOSE} cfs-black`

const _fCrStyle = propName => value => ({
  [propName]: value
})
, _crDisplayStyle = _fCrStyle("display")
export const S_BLOCK = _crDisplayStyle("block")
export const S_INLINE = _crDisplayStyle("inline-block")
export const S_NONE = _crDisplayStyle("none")
export const S_FLEX = _crDisplayStyle("flex")

export const crColorStyle = _fCrStyle("color")

export const S_BORDER_RADIUS_2 = { borderRadius: 2 }

export const S_OPEN_CLOSE_LEVEL_2 = {
  marginLeft: 8,
  paddingLeft: 8,
  borderLeft: `solid 2px var(--btf-c)`
}

export const crAbsoluteTopLeftStyle = (
  top,
  left,
  isRight,
  isBottom
) => ({
  position: 'absolute',
  [isBottom ? 'bottom' : 'top']: top,
  [isRight ? 'right': 'left']: left
})

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

const CL_C_BG = "c-bg";
export const crContainerCn = _fCrCn(CL_C_BG)

export const crBsContainerCn = (
  className
) => crContainerCn(crCn("bs-cont", className))

export const crScrollYCn = _fCrCn("scroll-container-y")

export const crDialogCn = _fCrCn(`${CL_C_BG} ${CL_BOX_SHADOW_5}`)
export const CL_CHARTS_MENU_MORE = "charts__menu-more"

const CL_EL_BG = "el-bg";
const CL_EL_C = "el-c";
export const crElementCn = _fCrCn(`${CL_EL_C} ${CL_EL_BG}`)
export const crElementBgCn = _fCrCn(CL_EL_BG)
export const crItemCaptionCn = _fCrCn(`${CL_C_BG} ${CL_EL_C} el-bb`)

export const crBtCircleHfCn = _fCrCn("bt-circle-hf")
export const crBtCircleCn = _fCrCnNotSelected("bt-circle")
export const crBtCircle2Cn = cn => crCn(crBtCircleCn("bt-c2"), cn)

export const crBoldCn = _fCrCn("bold")

export const crBtSvgCn = token => `bt-svg-${token}`

export const crFlexRowCn = _fCrCn("flex-row")
export const CL_HRZ_CONTAINER = crFlexRowCn("hrz-container")

export const crVisibilityHidden = (
  isVisible
) => isVisible
  ? void 0
  : { visibility: 'hidden' }

const _crTransformTranslateX = (x) => ({
  transform: `matrix(1, 0, 0, 1, ${x}, 0)`
});
export const crSliderTransformStyle = (
  pageWidth,
  pageCurrent
) => _crTransformTranslateX(-1*pageWidth*(pageCurrent - 1) + 0)
