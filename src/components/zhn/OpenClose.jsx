//import PropTypes from 'prop-types'
import use from '../hooks/use';
import C from '../styles/Color';
import Svg from './svg/Svg';

const { useToggle, useKeyEnter } = use

const CL_ROOT = 'zhn-oc'
, CL_SHOW_POPUP = 'show-popup'
, CL_NOT_SELECTED = 'not-selected'
, CL_OC_EXP = 'zhn-oc__exp'

, FILL_CLOSE_COLOR = C.BLANK

, S_ROOT_DIV = { lineHeight: 2 }
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

const _crConf = ({ isOpen, openColor }) => isOpen
  ? {
      _pathV: PATH_OPEN,
      _fillV: openColor,
      _childCl: `${CL_OC_EXP} ${CL_SHOW_POPUP}`,
      _childStyle: S_BLOCK
    }
  : {
      _pathV: PATH_CLOSE,
      _fillV: FILL_CLOSE_COLOR,
      _childCl: CL_OC_EXP,
      _childStyle: S_NONE
    };

const OpenClose = ({
  isClose=true,
  role='button',
  style, rowStyle, ocStyle,
  caption, captionStyle,
  openColor,
  CompAfter, childStyle, children
}) => {
  const [isOpen, toggleIsOpen] = useToggle(!isClose)
  , _hKeyDown = useKeyEnter(toggleIsOpen)
  , {
     _pathV, _fillV,
     _childCl, _childStyle
   } = _crConf({ isOpen, openColor });
  return (
    <div style={{...S_ROOT_DIV, ...style}}>
      <div className={CL_NOT_SELECTED} style={rowStyle}>
        <div
          tabIndex="0"
          role={role}
          className={CL_ROOT}
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
  ocStyle: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  openColor: PropTypes.string,
  CompAfter: PropTypes.node,
  childStyle: PropTypes.object,
}
*/

export default OpenClose
