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
export const S_NONE = { display: 'none' }

export const crShowHide = (
  is,
  className,
  withoutAnimation,
  animationClassName
) => is
  ? [
      crCn(className, [!withoutAnimation, animationClassName || CL_SHOW_POPUP]),
      S_BLOCK
    ]
  : [
      className,
      S_NONE
    ]
