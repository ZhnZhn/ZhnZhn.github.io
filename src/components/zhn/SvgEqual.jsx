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

const SvgEqual = React.createClass({
   render(){
     return (
       <span style={styles.rootSpan}>
         <svg viewBox="0 0 12 12" width="100%" height="100%"
              style={styles.svg}
              preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M 0,3 L 12,3"
                  strokeWidth="2"
                  stroke="#2F7ED8">
              </path>
              <path
                  d="M 0,7 L 12,7"
                  strokeWidth="2"
                  stroke="#2F7ED8">
              </path>
         </svg>
       </span>
     )
   }
});

export default SvgEqual
