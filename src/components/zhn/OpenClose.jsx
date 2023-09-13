//import PropTypes from 'prop-types'
import useToggle from '../hooks/useToggle';
import useKeyEnter from '../hooks/useKeyEnter';
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
} from './OpenCloseStyle';

const S_ROOT_DIV = { lineHeight: 2 };

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
      FILL_CLOSE_COLOR,
      CL_OPEN_CLOSE_EXP,
      S_NONE
    ];

const OpenClose = ({
  refItem,
  isClose=true,
  role='button',
  style,
  rowStyle,
  ocStyle,
  caption,
  captionStyle,
  openColor,
  CompAfter,
  childStyle,
  children
}) => {
  const [
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
          ref={refItem}
          tabIndex="0"
          role={role}
          className={CL_OPEN_CLOSE}
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
         <span style={{...S_CAPTION, ...captionStyle}} >
            {caption}
         </span>
       </div>
       {CompAfter}
    </div>
    <div
      aria-expanded={isOpen}
      className={_childCl}
      style={{...childStyle, ..._childStyle}}
    >
      {children}
    </div>
   </div>
  );
}

/*
OpenClose.propTypes = {
  isClose: PropTypes.bool,
  role: PropTypes.string
  style: PropTypes.object,
  rowStyle: PropTypes.object,
  ocStyle: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  openColor: PropTypes.string,
  CompAfter: PropTypes.node,
  childStyle: PropTypes.object,
}
*/

export default OpenClose
