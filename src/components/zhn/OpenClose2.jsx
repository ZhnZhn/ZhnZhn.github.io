import useToggle from '../hooks/useToggle';
import { useKeyEnter } from '../hooks/fUseKey';

import Svg from './svg/Svg';
import {
  CL_OPEN_CLOSE,
  CL_OPEN_CLOSE_EXP,
  CL_SHOW_POPUP,
  CL_NOT_SELECTED,
  S_SVG,
  S_CAPTION,
  S_BLOCK,
  S_NONE,
  FILL_CLOSE_COLOR,
  PATH_OPEN,
  PATH_CLOSE
} from './OpenCloseStyle'

const _crStyleConf = (
  isOpen,
  openColor,
  notSelectedStyle
) => isOpen
  //_pathV, _fillV, _divStyle, _expClass, _notSelectedStyle
  ? [
     PATH_OPEN,
     openColor,
     S_BLOCK,
     `${CL_OPEN_CLOSE_EXP} ${CL_SHOW_POPUP}`
  ] : [
     PATH_CLOSE,
     FILL_CLOSE_COLOR,
     S_NONE,
     CL_OPEN_CLOSE_EXP,
     notSelectedStyle
  ];

const OpenClose2 = ({
  isInitialOpen,
  style,
  ocStyle,
  notSelectedStyle,
  captionStyle,
  caption,
  openColor,
  dndHandlers,
  children
}) => {
  const [
    isOpen,
    toggleIsOpen
  ] = useToggle(isInitialOpen)
  , _hKeyDown = useKeyEnter(toggleIsOpen)
  , [
      _pathV,
      _fillV,
      _divStyle,
      _expClass,
      _notSelectedStyle
   ] = _crStyleConf(
      isOpen,
      openColor,
      notSelectedStyle
   );
   return (
    <div className={CL_NOT_SELECTED} style={style}>
      <div
         role="menuitem"
         tabIndex="0"
         className={CL_OPEN_CLOSE}
         style={{...ocStyle, ..._notSelectedStyle}}
         onClick={toggleIsOpen}
         onKeyDown={_hKeyDown}
         {...dndHandlers}
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
