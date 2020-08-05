import React from 'react';

import use from '../hooks/use'
import C from '../styles/Color'

const { useToggle, useKeyEnter } = use;

const CL = {
  SHOW: 'show-popup',
  NOT_SELECTED: 'not-selected zhn-oc'
};

const DF = {
  OPEN_COLOR: C.YELLOW,
  CLOSE_COLOR: C.BLANK
};

const S = {
  SVG: {
    display: 'inline-block',
    position: 'relative',
    top: 1,
    width: 16,
    height: 16,
    marginLeft: 8
  },
  CAPTION: {
    color: C.TITLE,
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

const PATH = {
  OPEN: "M 2,14 L 14,14 14,2 2,14",
  CLOSE: "M 2,2 L 14,8 2,14 2,2"
};

const _crStyleConf = ({ isOpen, openColor, closeColor, notSelectedStyle }) => isOpen
  ? {
     _pathV: PATH.OPEN,
     _fillV: openColor,
     _divStyle: S.BLOCK,
     _classShow: CL.SHOW,
     _notSelectedStyle: null
    }
  : {
    _pathV: PATH.CLOSE,
    _fillV: closeColor,
    _divStyle: S.NONE,
    _classShow: null,
    _notSelectedStyle: notSelectedStyle
  };

const OpenClose2 = ({
  isInitialOpen,
  style, ocStyle, notSelectedStyle,
  captionStyle, caption,
  openColor=DF.OPEN_COLOR,
  closeColor=DF.CLOSE_COLOR,
  isDraggable, option, onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop,
  children
}) => {
  const [isOpen, toggleIsOpen] = useToggle(isInitialOpen)
  , _hKeyDown = useKeyEnter(toggleIsOpen)
  , _dragOption = isDraggable
      ? {
          draggable: true,
          onDragStart: onDragStart.bind(null, option),
          onDrop: onDrop.bind(null, option),
          onDragEnter, onDragOver, onDragLeave
        }
      : void 0
   , {
      _pathV, _fillV,
      _divStyle, _classShow,
      _notSelectedStyle
    } = _crStyleConf({ isOpen, openColor, closeColor, notSelectedStyle });
  return (
    <div style={style}>
      <div
         role="menuitem"
         tabIndex="0"
         className={CL.NOT_SELECTED}
         style={{...ocStyle, ..._notSelectedStyle}}
         onClick={toggleIsOpen}
         onKeyDown={_hKeyDown}
         {..._dragOption}
       >
         <svg
            viewBox="0 0 16 16" width="100%" height="100%"
            preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
            style={S.SVG}
          >
           <path
              d={_pathV} fill={_fillV}
              strokeWidth="1" stroke={openColor}
           />
         </svg>
         <span style={{...S.CAPTION, ...captionStyle}} >
           {caption}
         </span>
      </div>
      <div        
        aria-expanded={isOpen}
        className={_classShow}
        style={_divStyle}
      >
        {children}
      </div>
   </div>
  );
}

export default OpenClose2;
