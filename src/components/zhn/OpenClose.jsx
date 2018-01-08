import React, { Component } from 'react';

const CL = {
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

const DF = {
  OPEN_COLOR: "yellow",
  CLOSE_COLOR: "#4D4D4D"
};

const S = {
  ROOT_DIV: {
    lineHeight: 2,
    backgroundColor: '#4D4D4D'
  },
  ROOT_SVG: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
  LABEL_CAPTION: {
    paddingLeft: '4px',
    verticalAlign: 'top',
    color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },

  INLINE_BLOCK: {
    display: 'inline-block'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

class OpenClose extends Component {
   constructor(props){
     super();
     const {
             isClose,
             openColor=DF.OPEN_COLOR,
             closeColor=DF.CLOSE_COLOR
           } = props
          , isOpen = isClose ? false : true;
     this.state = {
       isOpen: isOpen,
       openColor: openColor,
       closeColor: closeColor,
       pathOpen: "M 2,14 L 14,14 14,2 2,14",
       pathClose: "M 2,2 L 14,8 2,14 2,2",
     }
   }

  _handleClick = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  }

  render(){
    const {
            rootStyle, caption,
            CompAfter, childStyle, children
          } = this.props
        , {
            isOpen,
            pathOpen, pathClose,
            openColor, closeColor
          } = this.state;
    let _pathV, _fillV,
       _rootChildStyle, _rootChildCl;
    if (isOpen){
      _pathV = pathOpen
      _fillV = openColor
      _rootChildStyle = S.BLOCK
      _rootChildCl = CL.SHOW_POPUP
    } else {
      _pathV = pathClose
      _fillV = closeColor
      _rootChildStyle = S.NONE
      _rootChildCl = null;
    }

    return (
      <div style={{...S.ROOT_DIV, ...rootStyle}}>
        <div className={CL.NOT_SELECTED}>
          <div
            style={S.INLINE_BLOCK}
            onClick={this._handleClick}
          >
            <div style={S.ROOT_SVG}>
               <svg
                  viewBox="0 0 16 16" width="100%" height="100%"
                  preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                  style={S.INLINE_BLOCK}
                >
                 <path
                    d={_pathV}
                    fill={_fillV}
                    strokeWidth="1"
                    stroke={openColor}
                 />                 
               </svg>
           </div>
           <span style={S.LABEL_CAPTION} >
              {caption}
           </span>
         </div>
         {CompAfter}
      </div>
      <div
        className={_rootChildCl}
        style={{ ...childStyle, ..._rootChildStyle}}
      >
        {children}
      </div>
     </div>
    );
   }
}

export default OpenClose
