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

export const CL_SHOW_POPUP = 'show-popup'
export const S_BLOCK = { display: 'block' }
export const S_INLINE = { display: 'inline-block' }
export const S_NONE = { display: 'none' }

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

export const crContainerCn = (
  className
) => crCn(className, 'c-bg')

export const crBsContainerCn = (
  className
) => crContainerCn(crCn('bs-cont', className))


export const crScrollYCn = (
  className
) => crCn('scroll-container-y', className)

export const crDialogCn = (
  className
) => crCn(className, 'c-bg el-b')

export const crElementCn = (
  className
) => crCn(className, 'el-c el-bg')
