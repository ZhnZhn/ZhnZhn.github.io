import React from 'react';

const Token = React.createClass({
  render(){
    const {isFirstBalnk, color, children} = this.props;
    return (
      <span style={{color: color, fontWeight: 'bold'}}>
         {isFirstBalnk ? ' ' + children : children}        
      </span>
    );
  }
});

export default Token
