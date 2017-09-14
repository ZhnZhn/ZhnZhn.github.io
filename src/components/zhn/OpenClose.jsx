import React, { Component } from 'react';

const styles = {
  rootDiv: {
    lineHeight: 2,
    backgroundColor: '#4D4D4D'
  },
  rootSvg: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
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

class OpenClose extends Component {
   constructor(props){
     super();
     const isOpen = (props.isClose) ? false : true;
     this.state = {
       isOpen: isOpen,
       pathOpen: "M 2,14 L 14,14 14,2 2,14",
       fillOpen: "yellow",
       pathClose: "M 2,2 L 14,8 2,14 2,2",
       fillClose: "#4D4D4D"
     }
   }

  _handleClickOpenClose = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  }

  render(){
    const { caption, rootStyle, children } = this.props
        , {
            isOpen,
            pathOpen, fillOpen,
            pathClose, fillClose
          } = this.state;
    let pathV, fillV, displayDivStyle, classShow;
    if (isOpen){
      pathV = pathOpen;
      fillV = fillOpen;
      displayDivStyle = 'block';
      classShow = 'show-popup';
    } else {
      pathV = pathClose;
      fillV = fillClose;
      displayDivStyle = 'none';
      classShow = null;
    }

    return (
      <div style={{...styles.rootDiv, ...rootStyle}}>
        <div className="not-selected" onClick={this._handleClickOpenClose}>
          <div style={styles.rootSvg}>
             <svg
                viewBox="0 0 16 16" width="100%" height="100%"
                preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                style={{display: 'inline-block'}}
              >
             <path
                d={pathV}
                fill={fillV}
                strokeWidth="1" stroke="yellow"
             >
             </path>
             </svg>
         </div>
         <span style={styles.labelCaption} >
            {caption}
         </span>
      </div>
      <div className={classShow} style={{display: displayDivStyle}}>
        {children}
      </div>
     </div>
    );
   }
}

export default OpenClose
