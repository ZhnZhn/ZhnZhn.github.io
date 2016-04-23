import React from 'react';

const styles = {
  rootSpan : {
    display : 'inline-block',
    width: '14px',
    height: '14px',
    marginLeft: '5px'
  },
  svg : {
    paddingTop: '3px',
    paddingLeft: '2px',
    paddingRight: '2px'
  }
};

const SvgUp = React.createClass({
   render(){
     return (
       <span style={styles.rootSpan}>
         <svg viewBox="0 0 12 12" width="100%" height="100%"
              style={styles.svg}
              preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  //d="M 0,0 L 11,0 6,12, 0,0"
                  d="M 0,12 L 11,12 6,0 0,12"
                  strokeWidth="1"
                  stroke="green"
                  fill="green"
                  >
              </path>
         </svg>
       </span>
     )
   }
});

export default SvgUp
