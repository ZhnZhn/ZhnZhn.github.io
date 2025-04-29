import { useId } from '../uiApi';
import { crAriaExpandedProps } from '../a11yFn';

import {
  CL_SHOW_POPUP,
  CL_NOT_SELECTED,
  S_BLOCK,
  S_NONE,
  CL_OPEN_CLOSE,
  CL_OPEN_CLOSE_EXP
} from '../styleFn';

import { useToggle } from '../hooks/useToggle';
import { useKeyEnter } from '../hooks/fUseKey';

import {
  FILL_NONE,
  Svg
} from './svg/Svg';

const S_ROOT_DIV = { lineHeight: 2 }
, S_SVG = {
  display: 'inline-block',
  position: 'relative',
  top: 1
}
, S_CAPTION = {
  paddingLeft: 4,
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
}

, PATH_OPEN = "M 2,14 L 14,14 14,2 2,14"
, PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

//_pathV, _fillV, _childCl, _childStyle
const _crConf = (
  isOpen,
  openColor
) => isOpen
  ? [
      PATH_OPEN,
      openColor,
      `${CL_OPEN_CLOSE_EXP} ${CL_SHOW_POPUP}`,
      S_BLOCK
    ]
  : [
      PATH_CLOSE,
      FILL_NONE,
      CL_OPEN_CLOSE_EXP,
      S_NONE
    ];

const OpenClose = ({
  refItem,
  isClose=true,
  role='button',
  labelId,
  className,
  style,
  rowStyle,
  ocStyle,
  caption,
  captionStyle,
  openColor,
  CompAfter,
  childStyle,
  dndHandlers,
  children
}) => {
  const _childrenWrapperId = useId()
  , [
    isOpen,
    toggleIsOpen
  ] = useToggle(!isClose)
  , _hKeyDown = useKeyEnter(toggleIsOpen)
  , [
     _pathV,
     _fillV,
     _childCl,
     _childStyle
  ] = _crConf(isOpen, openColor);
  return (
    <div style={{...S_ROOT_DIV, ...style}}>
      <div className={CL_NOT_SELECTED} style={rowStyle}>
        <div
          {...dndHandlers}
          {...crAriaExpandedProps(isOpen, _childrenWrapperId)}
          role={role}
          tabIndex="0"
          ref={refItem}
          className={className || CL_OPEN_CLOSE}
          style={ocStyle}
          onClick={toggleIsOpen}
          onKeyDown={_hKeyDown}
        >
         <Svg w="16" style={S_SVG}>
           <path
              fill={_fillV}
              strokeWidth="1"
              stroke={openColor}
              d={_pathV}
           />
         </Svg>
         <span
           id={labelId}
           style={{...S_CAPTION, ...captionStyle}}
         >
            {caption}
         </span>
       </div>
       {CompAfter}
    </div>
    <div
      id={_childrenWrapperId}
      className={_childCl}
      style={{...childStyle, ..._childStyle}}
    >
      {children}
    </div>
   </div>
  );
}

export default OpenClose
