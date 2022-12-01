import useToggle from '../hooks/useToggle';
import useKeyEnter from '../hooks/useKeyEnter';
import useDnDHandlers from '../hooks/useDnDHandlers';

import { TRANSPARENT_COLOR } from '../styles/Color';
import Svg from './svg/Svg';

const CL_SHOW = 'show-popup'
, CL_NOT_SELECTED = 'not-selected zhn-oc'
, CL_OC_EXP = 'zhn-oc__exp'

, FILL_CLOSE_COLOR = TRANSPARENT_COLOR

, S_SVG = {
  display: 'inline-block',
  position: 'relative',
  top: 1,
  marginLeft: 8
}
, S_CAPTION = {
  paddingLeft: 4,
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
}
, S_BLOCK = { display: 'block' }
, S_NONE = { display: 'none' }

, PATH_OPEN = "M 2,14 L 14,14 14,2 2,14"
, PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

const _crStyleConf = ({
  isOpen,
  openColor,
  notSelectedStyle
}) => isOpen
  //_pathV, _fillV, _divStyle, _expClass, _notSelectedStyle
  ? [
     PATH_OPEN,
     openColor,
     S_BLOCK,
     `${CL_OC_EXP} ${CL_SHOW}`
  ] : [
     PATH_CLOSE,
     FILL_CLOSE_COLOR,
     S_NONE,
     CL_OC_EXP,
     notSelectedStyle
  ];

const OpenClose2 = (
  props
) => {
  const {
    isInitialOpen,
    style,
    ocStyle,
    notSelectedStyle,
    captionStyle,
    caption,
    openColor,
    /*
    isDraggable,
    option,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    */
    children
  } = props
  , [
    isOpen,
    toggleIsOpen
  ] = useToggle(isInitialOpen)
  , _hKeyDown = useKeyEnter(toggleIsOpen)
  , _dragOption = useDnDHandlers(props)
  , [
      _pathV,
      _fillV,
      _divStyle,
      _expClass,
      _notSelectedStyle
   ] = _crStyleConf({ isOpen, openColor, notSelectedStyle });
  return (
    <div style={style}>
      <div
         role="menuitem"
         tabIndex="0"
         className={CL_NOT_SELECTED}
         style={{...ocStyle, ..._notSelectedStyle}}
         onClick={toggleIsOpen}
         onKeyDown={_hKeyDown}
         {..._dragOption}
       >
         <Svg w="16" style={S_SVG}>
           <path
              d={_pathV} fill={_fillV}
              strokeWidth="1" stroke={openColor}
           />
         </Svg>
         <span style={{...S_CAPTION, ...captionStyle}} >
           {caption}
         </span>
      </div>
      <div
        aria-expanded={isOpen}
        className={_expClass}
        style={_divStyle}
      >
        {children}
      </div>
   </div>
  );
}

export default OpenClose2;
