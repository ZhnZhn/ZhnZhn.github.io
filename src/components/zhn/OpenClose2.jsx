import React from 'react';

const styles = {
  rootDiv: {
    backgroundColor: '#4D4D4D',
    lineHeight: 1.5
  },
  divSvg : {
    width: '16px',
    height: '16px',
    display: 'inline-block'
  },
  labelCaption: {
    paddingLeft: '4px',
    verticalAlign: 'top',
    color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  itemRow : {
    backgroundColor: '#404040'
  }
};

const pathOpen = "M 2,14 L 14,14 14,2 2,14";
const pathClose = "M 2,2 L 14,8 2,14 2,2";

const OpenClose2 = React.createClass({
   getInitialState(){
      const isOpen = (this.props.isClose) ? false : true
          , fillOpen = (this.props.fillOpen) ? this.props.fillOpen : 'yellow'
          , fillClose = (this.props.fillClose) ? this.props.fillClose : '#4D4D4D';

      return {
        isOpen: isOpen,
        fillOpen: fillOpen,
        fillClose: fillClose
      };
   },

  _handlerClickOpenClose(){
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  },


  render(){

    const {
            style, styleNotSelected, styleCaption, caption,
            isDraggable, option, onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop,
            children
          } = this.props
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
    if (this.state.isOpen){
      _pathV = pathOpen;
      _fillV = this.state.fillOpen;
      _displayDivStyle = 'block';
      _classShow = 'show-popup';
      _styleNotSelected = null;

    } else {
      _pathV = pathClose;
      _fillV = this.state.fillClose;
      _displayDivStyle = 'none';
      _classShow = null;
      _styleNotSelected = styleNotSelected;
    }


    return (
      <div style={Object.assign({}, styles.rootDiv, style)}>
        <div
           className="not-selected"
           style={_styleNotSelected}
           onClick={this._handlerClickOpenClose}
           {..._dragOption}
         >
          <div style={styles.divSvg}>
             <svg
                viewBox="0 0 16 16" width="100%" height="100%"
                preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                style={{display: 'inline-block'}}
              >
             <path
                d={_pathV}
                fill={_fillV}
                strokeWidth="1" stroke={this.state.fillOpen}
             >
             </path>
             </svg>
         </div>
         <span style={Object.assign({}, styles.labelCaption, styleCaption)} >
            {caption}
         </span>
       </div>
      <div className={_classShow} style={{display: _displayDivStyle}}>
        {children}
      </div>
     </div>
    )
  }
});

export default OpenClose2;
