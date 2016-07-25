import React from 'react';

const LinkToken = React.createClass({
  render(){
    const { isFirstBlank, color, href, children } = this.props
        , _firstChart = (isFirstBlank) ? ' ' : undefined;
    return (
      <a
        className="descr__quandl-link"
        style={{color: color}}
        target="_blank"
        href={href}
      >
         {_firstChart}
         {children}         
      </a>
    );
  }
});

export default LinkToken
