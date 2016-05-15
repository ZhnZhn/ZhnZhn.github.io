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
    cursor: 'pointer',
  },
  itemRow : {
    backgroundColor: '#404040'
  }
};

const pathOpen = "M 2,14 L 14,14 14,2 2,14";
const pathClose = "M 2,2 L 14,8 2,14 2,2";

const OpenClose2 = React.createClass({
   getInitialState: function(){
      const isOpen = (this.props.isClose) ? false : true
          , fillOpen = (this.props.fillOpen) ? this.props.fillOpen : 'yellow'
          , fillClose = (this.props.fillClose) ? this.props.fillClose : '#4D4D4D';

      return {
        isOpen: isOpen,
        fillOpen: fillOpen,
        fillClose: fillClose
      };
   },

  _handlerClickOpenClose: function(){
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  },


  render: function(){

    let pathV, fillV, displayDivStyle, classShow;
    if (this.state.isOpen){
      pathV = pathOpen;
      fillV = this.state.fillOpen;
      displayDivStyle = 'block';
      classShow = 'show-popup';

    } else {
      pathV = pathClose;
      fillV = this.state.fillClose;
      displayDivStyle = 'none';
      classShow = null;
    }


    return (
      <div style={Object.assign({}, styles.rootDiv, this.props.style)}>
        <div onClick={this._handlerClickOpenClose}>
          <div style={styles.divSvg}>
             <svg
                viewBox="0 0 16 16" width="100%" height="100%"
                preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                style={{display: 'inline-block'}}
              >
             <path
                d={pathV}
                fill={fillV}
                strokeWidth="1" stroke={this.state.fillOpen}
             >
             </path>
             </svg>
         </div>
         <span style={styles.labelCaption} >
            {this.props.caption}
         </span>
      </div>
      <div className={classShow} style={{display: displayDivStyle}}>
        {this.props.children}
      </div>
     </div>
    )
  }
});

export default OpenClose2;
