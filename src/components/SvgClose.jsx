import React from 'react';

const styles = {
  svgDiv : {
    width: '12px',
    height: '12px',
    display: 'inline-block',
    float: 'right',
    marginRight: '10px',
  }
};

const SvgClose = React.createClass({
   render: function(){
     return (
       <div
          style={styles.svgDiv}
          onClick={this.props.onClose}
       >
         <svg viewBox="0 0 12 12" width="100%" height="100%"
              preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,0 L 12,12" strokeWidth="2" stroke="#ED5813"></path>
              <path d="M 12,0 L 0,12" strokeWidth="2" stroke="#ED5813"></path>
         </svg>
       </div>
     )
   }
});

export default SvgClose;
