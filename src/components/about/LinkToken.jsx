import React from 'react';

const LinkToken = React.createClass({
  render(){
    const {isFirstBalnk, color, href, children} = this.props;
    return (
      <a
        style={{color: color, fontWeight: 'bold', textDecoration : 'none'}}
        target="_blank"
        href={href}
      >
         {isFirstBalnk ? ' ' + children : children}
      </a>
    );
  }
});

export default LinkToken
