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

const SvgDown = React.createClass({
   render(){
     return (
       <span style={styles.rootSpan}>
         <svg viewBox="0 0 12 12" width="100%" height="100%"
              style={styles.svg}
              preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M 0,0 L 11,0 6,12, 0,0"
                  strokeWidth="1"
                  stroke="#ED5813"
                  strokeLinejoin="miter"
                  fill="#ED5813"
              >
              </path>
         </svg>
       </span>
     )
   }
});

export default SvgDown
