import React, { Component } from 'react';

import C from '../styles/Color';

const CL_SHOW = 'show-popup';

const DF = {
  FILL_OPEN: C.YELLOW,
  FILL_CLOSE: C.BLANK
};

const S = {
  ROOT: {
    lineHeight: 1.5
  },
  DIV_SVG : {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
  SVG: {
    display: 'inline-block'
  },
  CAPTION: {
    color: C.SIREN,
    paddingLeft: '4px',
    verticalAlign: 'top',    
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

const PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
const PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

class OpenClose2 extends Component {
   static defaultProps = {
     fillOpen: DF.FILL_OPEN,
     fillClose: DF.FILL_CLOSE
   }
   constructor(props){
     super();
     const { isClose } = props;
      this.state = {
        isOpen: isClose ? false : true
      }
   }

  _handleClickOpenClose = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  }

  render(){
    const {
            style, styleNotSelected, styleCaption, caption,
            fillOpen, fillClose,
            isDraggable, option, onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop,
            children
          } = this.props
        , { isOpen } = this.state
        , _dragOption = (isDraggable)
              ? {
                  draggable : true,
                  onDragStart : onDragStart.bind(null, option),
                  onDrop : onDrop.bind(null, option),
                  onDragEnter : onDragEnter,
                  onDragOver : onDragOver,
                  onDragLeave : onDragLeave
                }
              : undefined ;

    let _pathV, _fillV, _displayDivStyle, _classShow, _styleNotSelected;
    if (isOpen){
      _pathV = PATH_OPEN;
      _fillV = fillOpen;
      _displayDivStyle = 'block';
      _classShow = CL_SHOW;
      _styleNotSelected = null;

    } else {
      _pathV = PATH_CLOSE;
      _fillV = fillClose;
      _displayDivStyle = 'none';
      _classShow = null;
      _styleNotSelected = styleNotSelected;
    }

    return (
      <div style={{...S.ROOT, ...style}}>
        <div
           className="not-selected"
           style={_styleNotSelected}
           onClick={this._handleClickOpenClose}
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
       <div className={_classShow} style={{display: _displayDivStyle}}>
         {children}
       </div>
     </div>
    );
  }
}

export default OpenClose2;
