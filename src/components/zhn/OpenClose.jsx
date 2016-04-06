import React from 'react';


const styles = {
  rootDiv: {
    backgroundColor: '#4D4D4D',
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

const OpenClose = React.createClass({
   getInitialState: function(){
      return {
        isOpen: true,
        pathOpen: "M 2,14 L 14,14 14,2 2,14",
        fillOpen: "yellow",
        pathClose: "M 2,2 L 14,8 2,14 2,2",
        fillClose: "#4D4D4D"
      };
   },

  _handlerClickOpenClose: function(){
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  },


  render: function(){

    let pathV, fillV, displayDivStyle, classShow;
    if (this.state.isOpen){
      pathV = this.state.pathOpen;
      fillV = this.state.fillOpen;
      displayDivStyle = 'block';
      classShow = 'show-popup';

    } else {
      pathV = this.state.pathClose;
      fillV = this.state.fillClose;
      displayDivStyle = 'none';
      classShow = null;
    }

    return (
      <div style={styles.rootDiv}>
        <div onClick={this._handlerClickOpenClose}>
          <div style={{width: '16px', height: '16px', display: 'inline-block'}}>
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

export default OpenClose;
