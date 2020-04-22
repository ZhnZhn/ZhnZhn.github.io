import React, { Component } from 'react';

import isKeyEnter from './isKeyEnter'
import C from '../styles/Color';

const CL = {
  SHOW: 'show-popup',
  NOT_SELECTED: 'not-selected zhn-oc'
};

const DF = {
  FILL_OPEN: C.YELLOW,
  FILL_CLOSE: C.BLANK
};

const S = {
  DIV_SVG : {
    display: 'inline-block',
    width: 16,
    height: 16,
    marginLeft: 8
  },
  SVG: {
    display: 'inline-block'
  },
  CAPTION: {
    color: C.TITLE,
    paddingLeft: 4,
    verticalAlign: 'top',
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

const _crStyleConf = ({ isOpen, fillOpen, fillClose, styleNotSelected }) => isOpen
  ? {
     _pathV: PATH.OPEN,
     _fillV: fillOpen,
     _divStyle: S.BLOCK,
     _classShow: CL.SHOW,
     _styleNotSelected: null
    }
  : {
    _pathV: PATH.CLOSE,
    _fillV: fillClose,
    _divStyle: S.NONE,
    _classShow: null,
    _styleNotSelected: styleNotSelected
  };

class OpenClose2 extends Component {
   static defaultProps = {
     fillOpen: DF.FILL_OPEN,
     fillClose: DF.FILL_CLOSE
   }

   constructor(props){
     super(props);
     const { isInitialOpen } = props;
      this.state = {
        isOpen: Boolean(isInitialOpen)
      }
   }

  _hClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  _hKeyDown = (event) => {
    if (isKeyEnter(event)){
      this._hClick()
    }
  }

  render(){
    const {
      style, styleItem, styleNotSelected, styleCaption, caption,
      fillOpen, fillClose,
      isDraggable, option, onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop,
      children
    } = this.props
    , { isOpen } = this.state
    , _dragOption = (isDraggable)
        ? {
            draggable: true,
            onDragStart: onDragStart.bind(null, option),
            onDrop: onDrop.bind(null, option),
            onDragEnter: onDragEnter,
            onDragOver: onDragOver,
            onDragLeave: onDragLeave
          }
        : undefined
     , {
        _pathV, _fillV,
        _divStyle, _classShow,
        _styleNotSelected
       } = _crStyleConf({ isOpen, fillOpen, fillClose , styleNotSelected })


    return (
      <div style={style}>
        <div
           role="menuitem"
           tabIndex="0"
           className={CL.NOT_SELECTED}
           style={{...styleItem, ..._styleNotSelected}}
           onClick={this._hClick}
           onKeyDown={this._hKeyDown}
           {..._dragOption}
         >
          <div style={S.DIV_SVG}>
             <svg
                viewBox="0 0 16 16" width="100%" height="100%"
                preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                style={S.SVG}
              >
               <path
                  d={_pathV} fill={_fillV}
                  strokeWidth="1" stroke={fillOpen}
               />
             </svg>
         </div>
         <span style={{...S.CAPTION, ...styleCaption}} >
            {caption}
         </span>
       </div>
       <div className={_classShow} style={_divStyle}>
         {children}
       </div>
     </div>
    );
  }
}

export default OpenClose2;
