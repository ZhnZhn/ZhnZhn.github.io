//import PropTypes from 'prop-types'
import use from '../hooks/use'
import C from '../styles/Color'

const { useToggle, useKeyEnter } = use

const CL = {
  ROOT: 'zhn-oc',
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected',
  OC_EXP: 'zhn-oc__exp'
};

const FILL_CLOSE_COLOR = C.BLANK

const S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  SVG: {
    display: 'inline-block',
    position: 'relative',
    top: 1,
    width: 16,
    height: 16,
    marginLeft: 8
  },
  CAPTION: {
    paddingLeft: 4,
    fontFamily: 'Roboto, Arial, Lato, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },

  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

const PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
const PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

const _crConf = ({ isOpen, openColor }) => isOpen
  ? {
      _pathV: PATH_OPEN,
      _fillV: openColor,
      _childCl: `${CL.OC_EXP} ${CL.SHOW_POPUP}`,
      _childStyle: S.BLOCK
    }
  : {
      _pathV: PATH_CLOSE,
      _fillV: FILL_CLOSE_COLOR,
      _childCl: CL.OC_EXP,
      _childStyle: S.NONE
    };

const OpenClose = ({
  isClose=true,
  role='button',
  style, ocStyle,
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
    <div style={{...S.ROOT_DIV, ...style}}>
      <div className={CL.NOT_SELECTED}>
        <div
          tabIndex="0"
          role={role}
          className={CL.ROOT}
          style={ocStyle}
          onClick={toggleIsOpen}
          onKeyDown={_hKeyDown}
        >
         <svg
            viewBox="0 0 16 16" width="100%" height="100%"
            preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
            style={S.SVG}
          >
           <path
              fill={_fillV}
              strokeWidth="1"
              stroke={openColor}
              d={_pathV}
           />
         </svg>
         <span style={{...S.CAPTION, ...captionStyle}} >
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
