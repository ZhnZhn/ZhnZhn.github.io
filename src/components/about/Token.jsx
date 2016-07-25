import React from 'react';

const Token = React.createClass({
  render(){
    const {isFirstBlank, color, children} = this.props
        , _firstChart = (isFirstBlank) ? ' ' : undefined
    return (
      <span style={{color: color, fontWeight: 'bold'}}>
         {_firstChart}
         {children}
      </span>
    );
  }
});

export default Token
