import React from 'react';

const styles = {
  svg : {
    padding: '3px'
  }
};

const SvgClose = React.createClass({
   render(){
     const {style, onClose} = this.props;
     return (
       <div
          className="svg-close"
          onClick={onClose}
          style={style}
       >
         <svg viewBox="0 0 12 12" width="100%" height="100%"
              style={styles.svg}
              preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,0 L 12,12" strokeWidth="2" stroke="#ED5813"
                    strokeLinecap="round"
              >
              </path>
              <path d="M 12,0 L 0,12" strokeWidth="2" stroke="#ED5813"
                    strokeLinecap="round"
              >
              </path>
         </svg>
       </div>
     )
   }
});

export default SvgClose;
