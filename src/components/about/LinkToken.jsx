import React from 'react';

const LinkToken = React.createClass({
  render(){
    const {isFirstBalnk, color, href, children} = this.props;
    return (
      <a
        className="descr__quandl-link"
        style={{color: color}}
        target="_blank"
        href={href}
      >
         {isFirstBalnk ? ' ' + children : children}
      </a>
    );
  }
});

export default LinkToken
